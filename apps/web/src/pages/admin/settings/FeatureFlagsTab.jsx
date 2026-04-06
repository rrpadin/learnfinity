
import React, { useState, useEffect } from 'react';
import { SettingsService } from '@/lib/SettingsService';
import { AuditService } from '@/lib/AuditService';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function FeatureFlagsTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [flags, setFlags] = useState({
    ai_coach: true,
    analytics: true,
    signups: true,
    enrollment: true,
    outputs: true,
    streaks: true
  });

  useEffect(() => {
    loadFlags();
  }, []);

  const loadFlags = async () => {
    try {
      setLoading(true);
      const data = await SettingsService.getSetting('feature_flags');
      if (data) {
        setFlags(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      toast.error('Failed to load feature flags');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key, value) => {
    setFlags(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await SettingsService.updateSetting('feature_flags', flags);
      await AuditService.logAdminAction('update', 'settings', 'feature_flags', 'Feature Flags', flags);
      toast.success('Feature flags saved successfully');
    } catch (error) {
      toast.error('Failed to save feature flags');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-[500px] w-full rounded-xl" />;
  }

  const features = [
    { id: 'ai_coach', title: 'Enable AI Coach', desc: 'Allow users to interact with the AI coach during missions.' },
    { id: 'analytics', title: 'Enable Analytics Tracking', desc: 'Track user events and generate platform analytics.' },
    { id: 'signups', title: 'Enable User Signups', desc: 'Allow new users to register for the platform.' },
    { id: 'enrollment', title: 'Enable Program Enrollment', desc: 'Allow users to enroll in new programs.' },
    { id: 'outputs', title: 'Enable Mission Outputs', desc: 'Allow users to submit text outputs for missions.' },
    { id: 'streaks', title: 'Enable User Streaks', desc: 'Track and display daily login streaks for users.' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>Toggle core platform features on or off globally.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 border border-[hsl(var(--admin-border))] rounded-lg hover:bg-[hsl(var(--admin-hover))] transition-colors">
              <div>
                <h4 className="font-medium text-[hsl(var(--admin-text))]">{feature.title}</h4>
                <p className="text-sm text-[hsl(var(--admin-muted))]">{feature.desc}</p>
              </div>
              <Switch 
                checked={flags[feature.id]} 
                onCheckedChange={(v) => handleToggle(feature.id, v)} 
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
