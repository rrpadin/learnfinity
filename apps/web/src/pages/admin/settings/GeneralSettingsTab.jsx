
import React, { useState, useEffect } from 'react';
import { SettingsService } from '@/lib/SettingsService';
import { AuditService } from '@/lib/AuditService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, RotateCcw, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function GeneralSettingsTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    platform_name: '',
    platform_description: '',
    support_email: '',
    support_phone: '',
    website_url: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const [name, desc, email, phone, url] = await Promise.all([
        SettingsService.getSetting('platform_name'),
        SettingsService.getSetting('platform_description'),
        SettingsService.getSetting('support_email'),
        SettingsService.getSetting('support_phone'),
        SettingsService.getSetting('website_url')
      ]);

      setFormData({
        platform_name: name || 'Learnfinity',
        platform_description: desc || '',
        support_email: email || '',
        support_phone: phone || '',
        website_url: url || ''
      });
    } catch (error) {
      toast.error('Failed to load general settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await Promise.all([
        SettingsService.updateSetting('platform_name', formData.platform_name),
        SettingsService.updateSetting('platform_description', formData.platform_description),
        SettingsService.updateSetting('support_email', formData.support_email),
        SettingsService.updateSetting('support_phone', formData.support_phone),
        SettingsService.updateSetting('website_url', formData.website_url)
      ]);
      
      await AuditService.logAdminAction('update', 'settings', 'general', 'General Settings', formData);
      toast.success('General settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default values? Unsaved changes will be lost.')) {
      loadSettings();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Platform Identity</CardTitle>
          <CardDescription>Basic information about your learning platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Name</label>
              <Input 
                name="platform_name"
                value={formData.platform_name}
                onChange={handleChange}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website URL</label>
              <Input 
                name="website_url"
                type="url"
                value={formData.website_url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Platform Description</label>
            <Textarea 
              name="platform_description"
              value={formData.platform_description}
              onChange={handleChange}
              maxLength={500}
              className="h-24 bg-[hsl(var(--admin-bg))]"
            />
            <div className="text-xs text-right text-[hsl(var(--admin-muted))]">
              {formData.platform_description.length}/500
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Where users can reach out for help.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input 
                name="support_email"
                type="email"
                value={formData.support_email}
                onChange={handleChange}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Phone</label>
              <Input 
                name="support_phone"
                type="tel"
                value={formData.support_phone}
                onChange={handleChange}
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Upload your logo and favicon.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-[hsl(var(--admin-bg))] border border-dashed border-[hsl(var(--admin-border))] flex items-center justify-center">
              <span className="text-xs text-[hsl(var(--admin-muted))]">Logo</span>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" /> Upload Logo
              </Button>
              <p className="text-xs text-[hsl(var(--admin-muted))]">Recommended: 512x512px PNG or SVG</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleReset} disabled={saving} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Reset
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
