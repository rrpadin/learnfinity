
import pb from '@/lib/pocketbaseClient.js';

export const OrganizationProgramService = {
  async assignProgramsToOrganization(organizationId, programIds, status = 'active') {
    try {
      const promises = programIds.map(programId => 
        pb.collection('organization_programs').create({
          organization_id: organizationId,
          program_id: programId,
          status: status
        }, { $autoCancel: false })
      );
      
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('Error assigning programs to organization:', error);
      throw error;
    }
  },

  async removeProgramFromOrganization(organizationId, programId) {
    try {
      // First find the specific organization_program record
      const records = await pb.collection('organization_programs').getFullList({
        filter: `organization_id = "${organizationId}" && program_id = "${programId}"`,
        $autoCancel: false
      });

      if (records.length > 0) {
        await pb.collection('organization_programs').delete(records[0].id, { $autoCancel: false });
      }
      return true;
    } catch (error) {
      console.error('Error removing program from organization:', error);
      throw error;
    }
  },

  async getOrganizationPrograms(organizationId, filters = {}, pagination = { page: 1, perPage: 20 }) {
    try {
      let filterString = [`organization_id = "${organizationId}"`];
      
      if (filters.status && filters.status !== 'all') {
        filterString.push(`status = "${filters.status}"`);
      }
      
      if (filters.search) {
        filterString.push(`program_id.title ~ "${filters.search}"`);
      }

      const options = {
        sort: filters.sort || '-created',
        expand: 'program_id',
        filter: filterString.join(' && '),
        $autoCancel: false
      };

      const result = await pb.collection('organization_programs').getList(
        pagination.page,
        pagination.perPage,
        options
      );
      
      return result;
    } catch (error) {
      console.error('Error fetching organization programs:', error);
      throw error;
    }
  },

  async updateProgramAssignmentStatus(organizationId, programId, status) {
    try {
      const records = await pb.collection('organization_programs').getFullList({
        filter: `organization_id = "${organizationId}" && program_id = "${programId}"`,
        $autoCancel: false
      });

      if (records.length > 0) {
        const record = await pb.collection('organization_programs').update(records[0].id, {
          status: status
        }, { $autoCancel: false });
        return record;
      }
      throw new Error("Program assignment not found");
    } catch (error) {
      console.error('Error updating program assignment status:', error);
      throw error;
    }
  },

  async getAvailablePrograms(organizationId) {
    try {
      // Fetch all currently assigned programs
      const assigned = await pb.collection('organization_programs').getFullList({
        filter: `organization_id = "${organizationId}"`,
        $autoCancel: false
      });
      
      const assignedProgramIds = assigned.map(record => record.program_id);
      
      // Fetch all active programs
      const allPrograms = await pb.collection('programs').getFullList({
        filter: 'status = "active"',
        sort: 'title',
        $autoCancel: false
      });
      
      // Filter out already assigned programs
      return allPrograms.filter(p => !assignedProgramIds.includes(p.id));
    } catch (error) {
      console.error('Error fetching available programs:', error);
      throw error;
    }
  }
};
