
import pb from '@/lib/pocketbaseClient';

export const SettingsService = {
  async getSetting(key) {
    try {
      const records = await pb.collection('settings').getFullList({
        filter: `key="${key}"`,
        $autoCancel: false
      });
      return records.length > 0 ? records[0].value : null;
    } catch (error) {
      console.error(`Error fetching setting ${key}:`, error);
      throw error;
    }
  },

  async getAllSettings() {
    try {
      const records = await pb.collection('settings').getFullList({
        $autoCancel: false
      });
      const settingsMap = {};
      records.forEach(record => {
        settingsMap[record.key] = record.value;
      });
      return settingsMap;
    } catch (error) {
      console.error('Error fetching all settings:', error);
      throw error;
    }
  },

  async updateSetting(key, value) {
    try {
      const records = await pb.collection('settings').getFullList({
        filter: `key="${key}"`,
        $autoCancel: false
      });

      if (records.length > 0) {
        return await pb.collection('settings').update(records[0].id, { value }, { $autoCancel: false });
      } else {
        return await pb.collection('settings').create({ key, value }, { $autoCancel: false });
      }
    } catch (error) {
      console.error(`Error updating setting ${key}:`, error);
      throw error;
    }
  },

  async resetSettings() {
    // In a real app, this might restore from a hardcoded default config
    console.warn('Reset settings not fully implemented - requires default config map');
    return true;
  },

  validateSetting(key, value) {
    if (!key) return false;
    if (value === undefined || value === null) return false;
    return true;
  }
};
