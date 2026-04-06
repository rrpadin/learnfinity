
import pb from '@/lib/pocketbaseClient.js';

export const IntegrationService = {
  async getIntegrations(filters = {}, pagination = { page: 1, perPage: 50 }) {
    try {
      let filterString = [];
      
      if (filters.category && filters.category !== 'all') {
        filterString.push(`category = "${filters.category}"`);
      }
      if (filters.status && filters.status !== 'all') {
        filterString.push(`status = "${filters.status}"`);
      }
      if (filters.search) {
        filterString.push(`(name ~ "${filters.search}" || description ~ "${filters.search}")`);
      }

      const options = {
        sort: 'name',
        $autoCancel: false
      };

      if (filterString.length > 0) {
        options.filter = filterString.join(' && ');
      }

      return await pb.collection('integrations').getList(
        pagination.page,
        pagination.perPage,
        options
      );
    } catch (error) {
      console.error('Error fetching integrations:', error);
      throw error;
    }
  },

  async getIntegration(integrationId) {
    try {
      return await pb.collection('integrations').getOne(integrationId, { $autoCancel: false });
    } catch (error) {
      console.error('Error fetching integration:', error);
      throw error;
    }
  },

  async getOrganizationIntegrations(organizationId, pagination = { page: 1, perPage: 20 }) {
    try {
      return await pb.collection('organization_integrations').getList(
        pagination.page,
        pagination.perPage,
        {
          filter: `organization_id = "${organizationId}"`,
          expand: 'integration_id',
          sort: '-created',
          $autoCancel: false
        }
      );
    } catch (error) {
      console.error('Error fetching organization integrations:', error);
      throw error;
    }
  },

  async connectIntegration(organizationId, integrationId, config = {}) {
    try {
      return await pb.collection('organization_integrations').create({
        organization_id: organizationId,
        integration_id: integrationId,
        is_active: true,
        sync_frequency: config.sync_frequency || 'manual',
        api_key: config.api_key || '',
        api_secret: config.api_secret || '',
        configuration: config.configuration || {},
        webhook_url: `https://api.learnfinity.com/webhooks/${organizationId}/${integrationId}`
      }, { $autoCancel: false });
    } catch (error) {
      console.error('Error connecting integration:', error);
      throw error;
    }
  },

  async disconnectIntegration(organizationId, integrationId) {
    try {
      const records = await pb.collection('organization_integrations').getFullList({
        filter: `organization_id = "${organizationId}" && integration_id = "${integrationId}"`,
        $autoCancel: false
      });

      if (records.length > 0) {
        await pb.collection('organization_integrations').delete(records[0].id, { $autoCancel: false });
      }
      return true;
    } catch (error) {
      console.error('Error disconnecting integration:', error);
      throw error;
    }
  },

  async updateIntegrationConfig(organizationId, integrationId, config) {
    try {
      const records = await pb.collection('organization_integrations').getFullList({
        filter: `organization_id = "${organizationId}" && integration_id = "${integrationId}"`,
        $autoCancel: false
      });

      if (records.length > 0) {
        return await pb.collection('organization_integrations').update(records[0].id, config, { $autoCancel: false });
      }
      throw new Error("Integration connection not found");
    } catch (error) {
      console.error('Error updating integration config:', error);
      throw error;
    }
  },

  async testIntegrationConnection(organizationId, integrationId) {
    // Placeholder for actual connection testing
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: "Connection successful" }), 1500);
    });
  }
};
