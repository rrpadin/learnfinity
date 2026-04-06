
import pb from '@/lib/pocketbaseClient.js';

export const AIManagementService = {
  async getOrganizationAIConfig(organizationId) {
    try {
      const records = await pb.collection('organization_ai_config').getFullList({
        filter: `organization_id = "${organizationId}"`,
        $autoCancel: false
      });
      
      if (records.length > 0) {
        return records[0];
      }

      // Create default config if it doesn't exist
      return await pb.collection('organization_ai_config').create({
        organization_id: organizationId,
        ai_enabled: false,
        ai_model: 'GPT-4',
        training_status: 'not_started',
        training_data_count: 0
      }, { $autoCancel: false });
    } catch (error) {
      console.error('Error fetching AI config:', error);
      throw error;
    }
  },

  async enableAI(organizationId) {
    try {
      const config = await this.getOrganizationAIConfig(organizationId);
      return await pb.collection('organization_ai_config').update(config.id, {
        ai_enabled: true
      }, { $autoCancel: false });
    } catch (error) {
      console.error('Error enabling AI:', error);
      throw error;
    }
  },

  async disableAI(organizationId) {
    try {
      const config = await this.getOrganizationAIConfig(organizationId);
      return await pb.collection('organization_ai_config').update(config.id, {
        ai_enabled: false
      }, { $autoCancel: false });
    } catch (error) {
      console.error('Error disabling AI:', error);
      throw error;
    }
  },

  async trainAI(organizationId) {
    try {
      const config = await this.getOrganizationAIConfig(organizationId);
      
      // Create history record (in_progress)
      const history = await pb.collection('ai_training_history').create({
        organization_id: organizationId,
        status: 'in_progress',
        data_points_used: 0,
        training_duration: 0,
        notes: 'Training started...'
      }, { $autoCancel: false });

      // Update config to in_progress
      await pb.collection('organization_ai_config').update(config.id, {
        training_status: 'in_progress'
      }, { $autoCancel: false });

      // Simulate delay (3-5 seconds)
      const delay = Math.floor(Math.random() * 2000) + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Calculate mock data points
      const dataPoints = Math.floor(Math.random() * 500) + 100;
      const duration = Math.floor(delay / 1000);

      // Update history to completed
      await pb.collection('ai_training_history').update(history.id, {
        status: 'completed',
        data_points_used: dataPoints,
        training_duration: duration,
        notes: 'Training completed successfully.'
      }, { $autoCancel: false });

      // Update config to completed
      await pb.collection('organization_ai_config').update(config.id, {
        training_status: 'completed',
        last_training_date: new Date().toISOString(),
        training_data_count: (config.training_data_count || 0) + dataPoints
      }, { $autoCancel: false });

      return true;
    } catch (error) {
      console.error('Error training AI:', error);
      
      // Attempt to mark as failed if something goes wrong
      try {
        const config = await this.getOrganizationAIConfig(organizationId);
        await pb.collection('organization_ai_config').update(config.id, {
          training_status: 'failed'
        }, { $autoCancel: false });
      } catch (e) {
        // Ignore secondary error
      }
      
      throw error;
    }
  },

  async getAITrainingHistory(organizationId, page = 1, limit = 10) {
    try {
      return await pb.collection('ai_training_history').getList(page, limit, {
        filter: `organization_id = "${organizationId}"`,
        sort: '-created',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching training history:', error);
      throw error;
    }
  },

  async getTrainingHistoryEntry(trainingHistoryId) {
    try {
      return await pb.collection('ai_training_history').getOne(trainingHistoryId, {
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching training history entry:', error);
      throw error;
    }
  },

  async getOrganizationStatsForTraining(organizationId) {
    try {
      const [users, programs, goals, needs] = await Promise.all([
        pb.collection('organization_users').getList(1, 1, { filter: `organization_id = "${organizationId}"`, $autoCancel: false }),
        pb.collection('organization_programs').getList(1, 1, { filter: `organization_id = "${organizationId}"`, $autoCancel: false }),
        pb.collection('organizational_goals').getList(1, 1, { filter: `organization_id = "${organizationId}"`, $autoCancel: false }),
        pb.collection('l_and_d_needs').getList(1, 1, { filter: `organization_id = "${organizationId}"`, $autoCancel: false })
      ]);

      return {
        usersCount: users.totalItems,
        programsCount: programs.totalItems,
        goalsCount: goals.totalItems,
        needsCount: needs.totalItems
      };
    } catch (error) {
      console.error('Error fetching org stats:', error);
      return { usersCount: 0, programsCount: 0, goalsCount: 0, needsCount: 0 };
    }
  }
};
