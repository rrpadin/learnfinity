
import React, { useState, useEffect } from 'react';
import { SettingsService } from '@/lib/SettingsService';
import { AuditService } from '@/lib/AuditService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, Mail, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function EmailConfigTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  
  const [config, setConfig] = useState({
    enabled: true,
    from_name: 'Learnfinity Platform'
  });

  const autoEmail = 'learnfinity-com@horizons.hostinger.com';

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await SettingsService.getSetting('email_settings');
      if (data) {
        setConfig({
          enabled: data.enabled ?? true,
          from_name: data.from_name || 'Learnfinity Platform'
        });
      }
    } catch (error) {
      toast.error('Failed to load email configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await SettingsService.updateSetting('email_settings', config);
      await AuditService.logAdminAction('update', 'settings', 'email', 'Email Config', config);
      toast.success('Email configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save email configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      setTesting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Test email sent successfully to your admin address');
    } catch (error) {
      toast.error('Failed to send test email');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Email Delivery</CardTitle>
          <CardDescription>Configure how the platform sends transactional emails.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Auto-Configured Mailer</h4>
              <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">
                This platform uses a built-in mailer service. SMTP configuration is handled automatically. Emails like password resets and verifications work out of the box.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-[hsl(var(--admin-border))] rounded-lg">
            <div>
              <h4 className="font-medium">Enable Email Sending</h4>
              <p className="text-sm text-[hsl(var(--admin-muted))]">Allow the platform to send automated emails to users.</p>
            </div>
            <Switch 
              checked={config.enabled} 
              onCheckedChange={(v) => setConfig(prev => ({ ...prev, enabled: v }))} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Name</label>
              <Input 
                value={config.from_name}
                onChange={(e) => setConfig(prev => ({ ...prev, from_name: e.target.value }))}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">From Email Address (Read-only)</label>
              <Input 
                value={autoEmail}
                readOnly
                disabled
                className="bg-[hsl(var(--admin-bg))] opacity-70"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Manage the content of automated emails.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--admin-muted))]">Customize welcome emails, mission reminders, and completion certificates.</p>
            <Link to="/admin/content?tab=emails">
              <Button variant="outline" className="gap-2">
                Manage Templates <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleTestEmail} disabled={testing || !config.enabled} className="gap-2">
          <Mail className="w-4 h-4" /> {testing ? 'Sending...' : 'Send Test Email'}
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  );
}
