
import pb from '@/lib/pocketbaseClient';
import Papa from 'papaparse';

export const AuditService = {
  async logAdminAction(action, resourceType, resourceId, resourceName, changes = {}, ipAddress = '') {
    try {
      if (!pb.authStore.isValid || !pb.authStore.model?.is_admin) {
        console.warn('Cannot log admin action: User is not an admin');
        return null;
      }

      const logEntry = {
        admin_id: pb.authStore.model.id,
        admin_email: pb.authStore.model.email,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        resource_name: resourceName,
        changes,
        ip_address: ipAddress,
        status: 'success'
      };

      return await pb.collection('admin_logs').create(logEntry, { $autoCancel: false });
    } catch (error) {
      console.error('Error logging admin action:', error);
      // Don't throw, we don't want audit logging failures to break the main app flow
      return null;
    }
  },

  async getAdminLogs(page = 1, perPage = 50, filters = '') {
    try {
      return await pb.collection('admin_logs').getList(page, perPage, {
        sort: '-created',
        filter: filters,
        expand: 'admin_id',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching admin logs:', error);
      throw error;
    }
  },

  async getLogDetails(logId) {
    try {
      return await pb.collection('admin_logs').getOne(logId, {
        expand: 'admin_id',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching log details:', error);
      throw error;
    }
  },

  async exportLogsAsCSV(filters = '') {
    try {
      const logs = await pb.collection('admin_logs').getFullList({
        sort: '-created',
        filter: filters,
        expand: 'admin_id',
        $autoCancel: false
      });

      const data = logs.map(log => ({
        ID: log.id,
        Timestamp: new Date(log.created).toLocaleString(),
        AdminEmail: log.admin_email || log.expand?.admin_id?.email || 'Unknown',
        Action: log.action,
        ResourceType: log.resource_type,
        ResourceName: log.resource_name,
        Status: log.status,
        IPAddress: log.ip_address
      }));

      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Admin_Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting logs:', error);
      throw error;
    }
  },

  async clearOldLogs(daysOld = 90) {
    try {
      const date = new Date();
      date.setDate(date.getDate() - daysOld);
      const dateStr = date.toISOString().replace('T', ' ');

      const oldLogs = await pb.collection('admin_logs').getFullList({
        filter: `created < "${dateStr}"`,
        $autoCancel: false
      });

      let deletedCount = 0;
      for (const log of oldLogs) {
        await pb.collection('admin_logs').delete(log.id, { $autoCancel: false });
        deletedCount++;
      }

      return deletedCount;
    } catch (error) {
      console.error('Error clearing old logs:', error);
      throw error;
    }
  }
};
