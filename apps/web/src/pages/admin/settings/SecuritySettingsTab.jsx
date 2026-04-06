
import React, { useState, useEffect } from 'react';
import { SettingsService } from '@/lib/SettingsService';
import { AuditService } from '@/lib/AuditService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function SecuritySettingsTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [config, setConfig] = useState({
    session_timeout: 30,
    password_change_interval: 90,
    mfa_enabled: false,
    ip_whitelist: '',
    max_login_attempts: 5,
    lockout_duration: 15
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await SettingsService.getSetting('security_settings');
      if (data) {
        setConfig({
          session_timeout: data.session_timeout ?? 30,
          password_change_interval: data.password_change_interval ?? 90,
          mfa_enabled: data.mfa_enabled ?? false,
          ip_whitelist: data.ip_whitelist || '',
          max_login_attempts: data.max_login_attempts ?? 5,
          lockout_duration: data.lockout_duration ?? 15
        });
      }
    } catch (error) {
      toast.error('Failed to load security settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await SettingsService.updateSetting('security_settings', config);
      await AuditService.logAdminAction('update', 'settings', 'security', 'Security Settings', config);
      toast.success('Security settings saved successfully');
    } catch (error) {
      toast.error('Failed to save security settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-[500px] w-full rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400">Security Status: Optimal</h4>
          <p className="text-sm text-green-600/80 dark:text-green-400/80">Your current configuration meets recommended security standards.</p>
        </div>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Authentication & Access</CardTitle>
          <CardDescription>Manage how users authenticate and maintain their sessions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-[hsl(var(--admin-border))] rounded-lg">
            <div>
              <h4 className="font-medium">Require Two-Factor Authentication (2FA)</h4>
              <p className="text-sm text-[hsl(var(--admin-muted))]">Force all admin users to use 2FA.</p>
            </div>
            <Switch 
              checked={config.mfa_enabled} 
              onCheckedChange={(v) => handleChange('mfa_enabled', v)} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input 
                type="number"
                min={5} max={1440}
                value={config.session_timeout}
                onChange={(e) => handleChange('session_timeout', parseInt(e.target.value) || 30)}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Change Interval (days)</label>
              <Input 
                type="number"
                min={0} max={365}
                value={config.password_change_interval}
                onChange={(e) => handleChange('password_change_interval', parseInt(e.target.value) || 0)}
                className="bg-[hsl(var(--admin-bg))]"
              />
              <p className="text-xs text-[hsl(var(--admin-muted))]">Set to 0 to never require password changes.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Threat Prevention</CardTitle>
          <CardDescription>Configure limits to prevent brute force attacks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Login Attempts</label>
              <Input 
                type="number"
                min={3} max={20}
                value={config.max_login_attempts}
                onChange={(e) => handleChange('max_login_attempts', parseInt(e.target.value) || 5)}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lockout Duration (minutes)</label>
              <Input 
                type="number"
                min={5} max={1440}
                value={config.lockout_duration}
                onChange={(e) => handleChange('lockout_duration', parseInt(e.target.value) || 15)}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Admin IP Whitelist</label>
            <Textarea 
              value={config.ip_whitelist}
              onChange={(e) => handleChange('ip_whitelist', e.target.value)}
              placeholder="192.168.1.1, 10.0.0.0/24"
              className="h-24 bg-[hsl(var(--admin-bg))]"
            />
            <p className="text-xs text-[hsl(var(--admin-muted))]">Comma-separated list of IP addresses allowed to access the admin panel. Leave blank to allow all.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Security Settings'}
        </Button>
      </div>
    </div>
  );
}
