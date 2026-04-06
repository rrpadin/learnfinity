
import pb from '@/lib/pocketbaseClient.js';

export const WorkflowService = {
  async createWorkflow(organizationId, workflowData) {
    try {
      return await pb.collection('workflows').create({
        organization_id: organizationId,
        ...workflowData
      }, { $autoCancel: false });
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  },

  async getWorkflow(workflowId) {
    try {
      return await pb.collection('workflows').getOne(workflowId, { $autoCancel: false });
    } catch (error) {
      console.error('Error fetching workflow:', error);
      throw error;
    }
  },

  async updateWorkflow(workflowId, updates) {
    try {
      return await pb.collection('workflows').update(workflowId, updates, { $autoCancel: false });
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw error;
    }
  },

  async deleteWorkflow(workflowId) {
    try {
      await pb.collection('workflows').delete(workflowId, { $autoCancel: false });
      return true;
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw error;
    }
  },

  async getOrganizationWorkflows(organizationId, filters = {}, pagination = { page: 1, perPage: 20 }) {
    try {
      let filterString = [`organization_id = "${organizationId}"`];
      
      if (filters.trigger_type && filters.trigger_type !== 'all') {
        filterString.push(`trigger_type = "${filters.trigger_type}"`);
      }
      if (filters.status && filters.status !== 'all') {
        filterString.push(`is_active = ${filters.status === 'active'}`);
      }
      if (filters.search) {
        filterString.push(`name ~ "${filters.search}"`);
      }

      return await pb.collection('workflows').getList(
        pagination.page,
        pagination.perPage,
        {
          filter: filterString.join(' && '),
          sort: filters.sort || '-created',
          $autoCancel: false
        }
      );
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw error;
    }
  },

  async activateWorkflow(workflowId) {
    return this.updateWorkflow(workflowId, { is_active: true });
  },

  async deactivateWorkflow(workflowId) {
    return this.updateWorkflow(workflowId, { is_active: false });
  },

  async executeWorkflow(workflowId, organizationId) {
    try {
      const workflow = await this.getWorkflow(workflowId);
      
      // Create execution record
      const execution = await pb.collection('workflow_executions').create({
        workflow_id: workflowId,
        organization_id: organizationId,
        status: 'completed',
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
        execution_logs: { message: "Manual execution triggered successfully." }
      }, { $autoCancel: false });

      // Update workflow stats
      await this.updateWorkflow(workflowId, {
        execution_count: (workflow.execution_count || 0) + 1,
        last_execution_date: new Date().toISOString()
      });

      return execution;
    } catch (error) {
      console.error('Error executing workflow:', error);
      throw error;
    }
  },

  async getWorkflowExecutionHistory(workflowId, pagination = { page: 1, perPage: 20 }) {
    try {
      return await pb.collection('workflow_executions').getList(
        pagination.page,
        pagination.perPage,
        {
          filter: `workflow_id = "${workflowId}"`,
          sort: '-started_at',
          $autoCancel: false
        }
      );
    } catch (error) {
      console.error('Error fetching execution history:', error);
      throw error;
    }
  },

  async duplicateWorkflow(workflowId) {
    try {
      const original = await this.getWorkflow(workflowId);
      const duplicateData = {
        organization_id: original.organization_id,
        name: `${original.name} (Copy)`,
        description: original.description,
        trigger_type: original.trigger_type,
        trigger_config: original.trigger_config,
        actions: original.actions,
        is_active: false,
        execution_count: 0
      };
      return await pb.collection('workflows').create(duplicateData, { $autoCancel: false });
    } catch (error) {
      console.error('Error duplicating workflow:', error);
      throw error;
    }
  }
};
