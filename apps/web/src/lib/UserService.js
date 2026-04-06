
import pb from '@/lib/pocketbaseClient.js';
import Papa from 'papaparse';

export const UserService = {
  async createUser(organizationId, userData) {
    try {
      const payload = {
        ...userData,
        organization_id: organizationId,
        passwordConfirm: userData.password,
        emailVisibility: true,
        name: `${userData.first_name} ${userData.last_name}`.trim()
      };
      return await pb.collection('users').create(payload, { $autoCancel: false });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(userId, updates) {
    try {
      const payload = { ...updates };
      if (updates.first_name || updates.last_name) {
        // If we are updating names, we might need to fetch the current user to construct the full name properly
        // For simplicity, if both are provided, update name.
        if (updates.first_name && updates.last_name) {
          payload.name = `${updates.first_name} ${updates.last_name}`.trim();
        }
      }
      if (updates.password) {
        payload.passwordConfirm = updates.password;
      }
      return await pb.collection('users').update(userId, payload, { $autoCancel: false });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      await pb.collection('users').delete(userId, { $autoCancel: false });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async getOrganizationUsers(organizationId, filters = {}, pagination = { page: 1, perPage: 20 }) {
    try {
      let filterString = [`organization_id = "${organizationId}"`];
      
      if (filters.role && filters.role !== 'all') {
        filterString.push(`role = "${filters.role}"`);
      }
      if (filters.status && filters.status !== 'all') {
        filterString.push(`status = "${filters.status}"`);
      }
      if (filters.department && filters.department !== 'all') {
        filterString.push(`department = "${filters.department}"`);
      }
      if (filters.search) {
        filterString.push(`(first_name ~ "${filters.search}" || last_name ~ "${filters.search}" || email ~ "${filters.search}" || job_title ~ "${filters.search}")`);
      }

      return await pb.collection('users').getList(
        pagination.page,
        pagination.perPage,
        {
          filter: filterString.join(' && '),
          sort: filters.sort || 'first_name',
          $autoCancel: false
        }
      );
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  },

  validateCSVData(csvData) {
    const results = {
      valid: [],
      invalid: [],
      total: csvData.length
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRoles = ['admin', 'manager', 'employee', 'learner'];
    const validStatuses = ['active', 'inactive', 'pending'];
    const validEmploymentTypes = ['full_time', 'part_time', 'contract', 'temporary'];

    csvData.forEach((row, index) => {
      const errors = [];
      
      if (!row.first_name?.trim()) errors.push("First name is required");
      if (!row.last_name?.trim()) errors.push("Last name is required");
      
      if (!row.email?.trim()) {
        errors.push("Email is required");
      } else if (!emailRegex.test(row.email)) {
        errors.push("Invalid email format");
      }

      if (!row.password || row.password.length < 8) {
        errors.push("Password must be at least 8 characters");
      }

      if (row.role && !validRoles.includes(row.role.toLowerCase())) {
        errors.push(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
      }

      if (row.status && !validStatuses.includes(row.status.toLowerCase())) {
        errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      if (row.employment_type && !validEmploymentTypes.includes(row.employment_type.toLowerCase())) {
        errors.push(`Invalid employment type. Must be one of: ${validEmploymentTypes.join(', ')}`);
      }

      const processedRow = {
        ...row,
        _originalIndex: index + 1,
        role: row.role?.toLowerCase() || 'learner',
        status: row.status?.toLowerCase() || 'active',
        employment_type: row.employment_type?.toLowerCase() || 'full_time'
      };

      if (errors.length > 0) {
        results.invalid.push({ row: processedRow, errors });
      } else {
        results.valid.push(processedRow);
      }
    });

    return results;
  },

  async bulkImportUsers(organizationId, validUsers, fileName) {
    try {
      // Create job record
      const job = await pb.collection('bulk_import_jobs').create({
        organization_id: organizationId,
        import_type: 'users',
        file_name: fileName,
        total_records: validUsers.length,
        status: 'processing'
      }, { $autoCancel: false });

      let successCount = 0;
      let failCount = 0;
      const errorLog = [];

      // Process sequentially to avoid overwhelming the server
      for (const user of validUsers) {
        try {
          await this.createUser(organizationId, {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            phone: user.phone || '',
            job_title: user.job_title || '',
            department: user.department || '',
            role: user.role,
            status: user.status,
            employment_type: user.employment_type,
            location: user.location || ''
          });
          successCount++;
        } catch (err) {
          failCount++;
          errorLog.push({
            email: user.email,
            error: err.message || 'Failed to create user'
          });
        }
        
        // Artificial delay to simulate processing and not hit rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Update job record
      await pb.collection('bulk_import_jobs').update(job.id, {
        status: failCount === validUsers.length ? 'failed' : 'completed',
        successful_imports: successCount,
        failed_imports: failCount,
        error_log: errorLog,
        completed_date: new Date().toISOString()
      }, { $autoCancel: false });

      return { successCount, failCount, errorLog };
    } catch (error) {
      console.error('Error in bulk import:', error);
      throw error;
    }
  },

  downloadCSVTemplate() {
    const headers = [
      'first_name', 'last_name', 'email', 'password', 'phone', 
      'job_title', 'department', 'role', 'employment_type', 
      'location', 'status'
    ];
    
    const sampleData = [
      ['Jane', 'Doe', 'jane.doe@example.com', 'SecurePass123!', '555-0100', 'Software Engineer', 'Engineering', 'employee', 'full_time', 'New York', 'active'],
      ['John', 'Smith', 'john.smith@example.com', 'SecurePass123!', '555-0101', 'Sales Manager', 'Sales', 'manager', 'full_time', 'London', 'active']
    ];

    const csv = Papa.unparse([headers, ...sampleData]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'learnfinity_users_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
