
import pb from '@/lib/pocketbaseClient.js';

export const OrganizationService = {
  async createOrganization(orgData) {
    try {
      const record = await pb.collection('organizations').create(orgData, { $autoCancel: false });
      return record;
    } catch (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
  },

  async getOrganization(orgId) {
    try {
      const record = await pb.collection('organizations').getOne(orgId, { $autoCancel: false });
      return record;
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  },

  async updateOrganization(orgId, updates) {
    try {
      const record = await pb.collection('organizations').update(orgId, updates, { $autoCancel: false });
      return record;
    } catch (error) {
      console.error('Error updating organization:', error);
      throw error;
    }
  },

  async deleteOrganization(orgId) {
    try {
      await pb.collection('organizations').delete(orgId, { $autoCancel: false });
      return true;
    } catch (error) {
      console.error('Error deleting organization:', error);
      throw error;
    }
  },

  async getAllOrganizations(filters = {}, pagination = { page: 1, perPage: 20 }) {
    try {
      let filterString = [];
      
      if (filters.search) {
        filterString.push(`(name ~ "${filters.search}" || primary_contact_name ~ "${filters.search}")`);
      }
      
      if (filters.status && filters.status !== 'all') {
        filterString.push(`status = "${filters.status}"`);
      }

      const options = {
        sort: filters.sort || '-created',
        $autoCancel: false
      };

      if (filterString.length > 0) {
        options.filter = filterString.join(' && ');
      }

      const result = await pb.collection('organizations').getList(
        pagination.page,
        pagination.perPage,
        options
      );
      
      return result;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  },

  async getOrganizationMetrics() {
    try {
      const [totalRes, activeRes] = await Promise.all([
        pb.collection('organizations').getList(1, 1, { $autoCancel: false }),
        pb.collection('organizations').getList(1, 1, { filter: 'status="active"', $autoCancel: false })
      ]);

      const allOrgs = await pb.collection('organizations').getFullList({ fields: 'current_user_count', $autoCancel: false });
      const totalUsers = allOrgs.reduce((sum, org) => sum + (org.current_user_count || 0), 0);

      return {
        totalOrganizations: totalRes.totalItems,
        activeOrganizations: activeRes.totalItems,
        totalUsers: totalUsers
      };
    } catch (error) {
      console.error('Error fetching organization metrics:', error);
      throw error;
    }
  },

  // --- New Functions for Task 1 ---

  async getOrganizationWithUsers(orgId) {
    try {
      const org = await this.getOrganization(orgId);
      return org;
    } catch (error) {
      console.error('Error fetching organization with users:', error);
      throw error;
    }
  },

  async getOrganizationUsers(orgId, filters = {}, pagination = { page: 1, perPage: 20 }) {
    try {
      let filterString = [`organization_id = "${orgId}"`];
      
      if (filters.role && filters.role !== 'all') {
        filterString.push(`role = "${filters.role}"`);
      }
      if (filters.status && filters.status !== 'all') {
        filterString.push(`status = "${filters.status}"`);
      }
      // Note: Searching by user name/email requires expanding the relation or a custom endpoint.
      // For simplicity in this frontend-only environment, we'll fetch and filter client-side if search is present,
      // or rely on PocketBase's limited relation filtering if supported.
      // PocketBase supports relation filtering like: user_id.name ~ "search"
      if (filters.search) {
        filterString.push(`(user_id.name ~ "${filters.search}" || user_id.email ~ "${filters.search}")`);
      }

      const options = {
        sort: filters.sort || '-created',
        expand: 'user_id',
        filter: filterString.join(' && '),
        $autoCancel: false
      };

      const result = await pb.collection('organization_users').getList(
        pagination.page,
        pagination.perPage,
        options
      );
      
      return result;
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  },

  async getAvailableUsers(orgId) {
    try {
      // Fetch all users currently in the org
      const orgUsers = await pb.collection('organization_users').getFullList({
        filter: `organization_id = "${orgId}"`,
        $autoCancel: false
      });
      
      const existingUserIds = orgUsers.map(ou => ou.user_id);
      
      // Fetch all users
      const allUsers = await pb.collection('users').getFullList({
        sort: 'name',
        $autoCancel: false
      });
      
      // Filter out existing users
      return allUsers.filter(u => !existingUserIds.includes(u.id));
    } catch (error) {
      console.error('Error fetching available users:', error);
      throw error;
    }
  },

  async addUsersToOrganization(orgId, userIds, role = 'user') {
    try {
      const promises = userIds.map(userId => 
        pb.collection('organization_users').create({
          organization_id: orgId,
          user_id: userId,
          role: role,
          status: 'active'
        }, { $autoCancel: false })
      );
      
      await Promise.all(promises);
      
      // Update org user count
      const org = await this.getOrganization(orgId);
      await this.updateOrganization(orgId, {
        current_user_count: (org.current_user_count || 0) + userIds.length
      });
      
      return true;
    } catch (error) {
      console.error('Error adding users to organization:', error);
      throw error;
    }
  },

  async removeUserFromOrganization(orgId, orgUserId) {
    try {
      await pb.collection('organization_users').delete(orgUserId, { $autoCancel: false });
      
      // Update org user count
      const org = await this.getOrganization(orgId);
      await this.updateOrganization(orgId, {
        current_user_count: Math.max(0, (org.current_user_count || 1) - 1)
      });
      
      return true;
    } catch (error) {
      console.error('Error removing user from organization:', error);
      throw error;
    }
  },

  async updateUserRole(orgId, orgUserId, newRole) {
    try {
      // Validation: Prevent removing last org_admin
      if (newRole !== 'org_admin') {
        const admins = await pb.collection('organization_users').getFullList({
          filter: `organization_id = "${orgId}" && role = "org_admin"`,
          $autoCancel: false
        });
        
        if (admins.length <= 1 && admins.some(a => a.id === orgUserId)) {
          throw new Error("Cannot change role: Organization must have at least one admin.");
        }
      }

      const record = await pb.collection('organization_users').update(orgUserId, {
        role: newRole
      }, { $autoCancel: false });
      
      return record;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }
};
