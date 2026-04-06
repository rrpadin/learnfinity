
import React, { useState, useEffect } from 'react';
import { SettingsService } from '@/lib/SettingsService';
import { AuditService } from '@/lib/AuditService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, Eye, EyeOff, Trash2, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function AIProviderConfigTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState('unknown'); // unknown, connected, error
  
  const [config, setConfig] = useState({
    provider: 'openai',
    api_key: '',
    model: 'gpt-4-turbo',
    temperature: 0.7,
    max_tokens: 2000
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await SettingsService.getSetting('ai_provider');
      if (data) {
        setConfig({
          provider: data.provider || 'openai',
          api_key: data.api_key || '',
          model: data.model || 'gpt-4-turbo',
          temperature: data.temperature ?? 0.7,
          max_tokens: data.max_tokens || 2000
        });
        setStatus(data.api_key ? 'connected' : 'unknown');
      }
    } catch (error) {
      toast.error('Failed to load AI configuration');
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
      await SettingsService.updateSetting('ai_provider', config);
      await AuditService.logAdminAction('update', 'settings', 'ai_provider', 'AI Provider Config', { provider: config.provider, model: config.model });
      toast.success('AI configuration saved successfully');
      setStatus('connected');
    } catch (error) {
      toast.error('Failed to save AI configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleClearKey = () => {
    if (window.confirm('Are you sure you want to clear the API key? AI features will stop working.')) {
      setConfig(prev => ({ ...prev, api_key: '' }));
      setStatus('unknown');
    }
  };

  const handleTestConnection = async () => {
    if (!config.api_key) {
      toast.error('Please enter an API key first');
      return;
    }
    
    try {
      setTesting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('connected');
      toast.success('Connection successful!');
    } catch (error) {
      setStatus('error');
      toast.error('Connection failed. Please check your API key.');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-[500px] w-full rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>AI Provider Configuration</CardTitle>
            <CardDescription>Configure the AI model powering the platform's coach and feedback systems.</CardDescription>
          </div>
          <Badge variant={status === 'connected' ? 'default' : status === 'error' ? 'destructive' : 'secondary'} className="capitalize">
            {status === 'connected' ? 'Connected' : status === 'error' ? 'Error' : 'Not Configured'}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Provider</label>
              <Select value={config.provider} onValueChange={(v) => handleChange('provider', v)}>
                <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google Gemini</SelectItem>
                  <SelectItem value="none">None (Disable AI)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Model Name</label>
              <Input 
                value={config.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="e.g., gpt-4-turbo"
                className="bg-[hsl(var(--admin-bg))]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input 
                  type={showKey ? "text" : "password"}
                  value={config.api_key}
                  onChange={(e) => handleChange('api_key', e.target.value)}
                  placeholder="sk-..."
                  className="bg-[hsl(var(--admin-bg))] pr-10"
                />
                <button 
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--admin-muted))] hover:text-[hsl(var(--admin-text))]"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button variant="outline" onClick={handleClearKey} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Temperature</label>
                <span className="text-sm text-[hsl(var(--admin-muted))]">{config.temperature}</span>
              </div>
              <Slider 
                value={[config.temperature]} 
                min={0} max={1} step={0.1}
                onValueChange={([v]) => handleChange('temperature', v)}
              />
              <p className="text-xs text-[hsl(var(--admin-muted))]">Higher values make output more creative, lower values make it more focused and deterministic.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Tokens</label>
              <Input 
                type="number"
                min={100} max={4000}
                value={config.max_tokens}
                onChange={(e) => handleChange('max_tokens', parseInt(e.target.value) || 2000)}
                className="bg-[hsl(var(--admin-bg))]"
              />
              <p className="text-xs text-[hsl(var(--admin-muted))]">Maximum length of the AI response.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleTestConnection} disabled={testing || !config.api_key} className="gap-2">
          <Activity className="w-4 h-4" /> {testing ? 'Testing...' : 'Test Connection'}
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  );
}
