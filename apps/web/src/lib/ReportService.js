
import pb from '@/lib/pocketbaseClient';
import Papa from 'papaparse';

export const ReportService = {
  async generateUserReport(filters = {}, format = 'csv') {
    try {
      const users = await pb.collection('users').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      
      const data = users.map(u => ({
        ID: u.id,
        Name: u.name || 'N/A',
        Email: u.email,
        Role: u.role,
        Joined: new Date(u.created).toLocaleDateString(),
        Streak: u.streak_count || 0,
        TotalTimeSpent: u.total_time_spent || 0
      }));

      return this.formatReportData(data, format, 'User_Report');
    } catch (error) {
      console.error('Error generating user report:', error);
      throw error;
    }
  },

  async generateProgramReport(filters = {}, format = 'csv') {
    try {
      const programs = await pb.collection('programs').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      
      const data = programs.map(p => ({
        ID: p.id,
        Title: p.title,
        Category: p.category || 'Uncategorized',
        Status: p.status,
        Enrollments: p.enrollment_count || 0,
        DurationDays: p.duration_days,
        Created: new Date(p.created).toLocaleDateString()
      }));

      return this.formatReportData(data, format, 'Program_Report');
    } catch (error) {
      console.error('Error generating program report:', error);
      throw error;
    }
  },

  async generateAnalyticsReport(filters = {}, format = 'csv') {
    try {
      const events = await pb.collection('analytics_events').getFullList({
        sort: '-timestamp',
        $autoCancel: false
      });
      
      const data = events.map(e => ({
        EventID: e.id,
        Type: e.event_type,
        UserID: e.user_id,
        Timestamp: new Date(e.timestamp).toLocaleString(),
        Data: JSON.stringify(e.event_data || {})
      }));

      return this.formatReportData(data, format, 'Analytics_Report');
    } catch (error) {
      console.error('Error generating analytics report:', error);
      throw error;
    }
  },

  async generateEngagementReport(filters = {}, format = 'csv') {
    // Simplified engagement report based on user missions
    try {
      const missions = await pb.collection('user_missions').getFullList({
        expand: 'user_id,mission_id',
        sort: '-created',
        $autoCancel: false
      });
      
      const data = missions.map(m => ({
        ID: m.id,
        User: m.expand?.user_id?.email || m.user_id,
        Mission: m.expand?.mission_id?.title || m.mission_id,
        Status: m.status,
        Score: m.feedback_score || 0,
        TimeSpent: m.time_spent || 0,
        CompletedAt: m.completed_at ? new Date(m.completed_at).toLocaleString() : 'N/A'
      }));

      return this.formatReportData(data, format, 'Engagement_Report');
    } catch (error) {
      console.error('Error generating engagement report:', error);
      throw error;
    }
  },

  async generateCustomReport(metrics, filters, format = 'csv') {
    console.warn('Custom report generation requires specific metric mapping');
    return this.generateUserReport(filters, format);
  },

  formatReportData(data, format, filenamePrefix) {
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${filenamePrefix}_${dateStr}`;

    if (format === 'csv') {
      const csv = Papa.unparse(data);
      this.downloadReport(csv, `${filename}.csv`, 'text/csv');
      return csv;
    } else if (format === 'json') {
      const json = JSON.stringify(data, null, 2);
      this.downloadReport(json, `${filename}.json`, 'application/json');
      return json;
    } else {
      throw new Error(`Unsupported format: ${format}`);
    }
  },

  downloadReport(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
