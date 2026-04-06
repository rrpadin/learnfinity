
import pb from '@/lib/pocketbaseClient.js';

export const GoalService = {
  async createGoal(organizationId, goalData) {
    try {
      const record = await pb.collection('organizational_goals').create({
        ...goalData,
        organization_id: organizationId,
        created_by: pb.authStore.model?.id
      }, { $autoCancel: false });
      return record;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  },

  async getGoal(goalId) {
    try {
      const record = await pb.collection('organizational_goals').getOne(goalId, { $autoCancel: false });
      return record;
    } catch (error) {
      console.error('Error fetching goal:', error);
      throw error;
    }
  },

  async updateGoal(goalId, updates) {
    try {
      const record = await pb.collection('organizational_goals').update(goalId, updates, { $autoCancel: false });
      return record;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },

  async deleteGoal(goalId) {
    try {
      await pb.collection('organizational_goals').delete(goalId, { $autoCancel: false });
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  },

  async getOrganizationGoals(organizationId, filters = {}, pagination = { page: 1, perPage: 20 }) {
    try {
      let filterString = [`organization_id = "${organizationId}"`];
      
      if (filters.search) {
        filterString.push(`(title ~ "${filters.search}" || description ~ "${filters.search}")`);
      }
      if (filters.type && filters.type !== 'all') {
        filterString.push(`goal_type = "${filters.type}"`);
      }
      if (filters.priority && filters.priority !== 'all') {
        filterString.push(`priority = "${filters.priority}"`);
      }
      if (filters.status && filters.status !== 'all') {
        filterString.push(`status = "${filters.status}"`);
      }

      const options = {
        sort: filters.sort || '-created',
        filter: filterString.join(' && '),
        $autoCancel: false
      };

      const result = await pb.collection('organizational_goals').getList(
        pagination.page,
        pagination.perPage,
        options
      );
      
      return result;
    } catch (error) {
      console.error('Error fetching organization goals:', error);
      throw error;
    }
  },

  async seedSampleGoals(organizationId) {
    const sampleGoals = [
      {
        title: 'Improve Customer Satisfaction',
        description: 'Increase NPS score by 15% over the next quarter through better support training.',
        goal_type: 'strategic',
        priority: 'high',
        status: 'active',
        target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Implement New CRM System',
        description: 'Roll out the new Salesforce implementation to the entire sales team.',
        goal_type: 'operational',
        priority: 'high',
        status: 'active',
        target_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Team Leadership Training',
        description: 'Ensure all mid-level managers complete the advanced leadership program.',
        goal_type: 'learning',
        priority: 'medium',
        status: 'active',
        target_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Reduce Operational Costs',
        description: 'Identify and eliminate redundant software subscriptions across departments.',
        goal_type: 'operational',
        priority: 'medium',
        status: 'completed',
        target_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    for (const goal of sampleGoals) {
      await this.createGoal(organizationId, goal);
    }
  }
};
