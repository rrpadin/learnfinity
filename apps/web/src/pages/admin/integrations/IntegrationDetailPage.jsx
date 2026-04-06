
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Save, Unplug, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { IntegrationService } from '@/lib/IntegrationService.js';
import { IntegrationStatusBadge } from '@/components/admin/integrations/IntegrationStatusBadge.jsx';
import { IntegrationCategoryBadge } from '@/components/admin/integrations/IntegrationCategoryBadge.jsx';

export default function IntegrationDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('orgId');
  const navigate = useNavigate();

  const [integration, setIntegration] = useState(null);
  const [orgIntegration, setOrgIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [isActive, setIsActive] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [syncFrequency, setSyncFrequency] = useState('manual');
  const [customConfig, setCustomConfig] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const intData = await IntegrationService.getIntegration(id);
        setIntegration(intData);

        if (orgId) {
          const orgInts = await IntegrationService.getOrganizationIntegrations(orgId, { page: 1, perPage: 100 });
          const match = orgInts.items.find(item => item.integration_id === id);
          if (match) {
            setOrgIntegration(match);
            setIsActive(match.is_active);
            setApiKey(match.api_key || '');
            setApiSecret(match.api_secret || '');
            setSyncFrequency(match.sync_frequency || 'manual');
            setCustomConfig(match.configuration ? JSON.stringify(match.configuration, null, 2) : '');
          }
        }
      } catch (error) {
        console.error("Failed to fetch integration details", error);
        toast.error("Failed to load integration details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, orgId]);

  const handleSave = async () => {
    if (!orgId || !orgIntegration) return;
    setSaving(true);
    try {
      let parsedConfig = {};
      if (customConfig) {
        try {
          parsedConfig = JSON.parse(customConfig);
        } catch (e) {
          toast.error("Invalid JSON in custom configuration");
          setSaving(false);
          return;
        }
      }

      await IntegrationService.updateIntegrationConfig(orgId, id, {
        is_active: isActive,
        api_key: apiKey,
        api_secret: apiSecret,
        sync_frequency: syncFrequency,
        configuration: parsedConfig
      });
      
      toast.success("Configuration saved successfully");
    } catch (error) {
      toast.error("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!orgId) return;
    const promise = IntegrationService.testIntegrationConnection(orgId, id);
    toast.promise(promise, {
      loading: 'Testing connection...',
      success: 'Connection successful!',
      error: 'Connection failed. Please check your credentials.'
    });
  };

  const handleDisconnect = async () => {
    if (!orgId || !window.confirm("Are you sure you want to disconnect this integration?")) return;
    try {
      await IntegrationService.disconnectIntegration(orgId, id);
      toast.success("Integration disconnected");
      navigate(`/admin/organizations/${orgId}`);
    } catch (error) {
      toast.error("Failed to disconnect integration");
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><Skeleton className="h-96 w-full rounded-xl" /></div>;
  }

  if (!integration) {
    return <div className="container mx-auto px-4 py-8 text-center">Integration not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>{`${integration.name} Configuration - Admin | Learnfinity`}</title>
      </Helmet>

      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        {orgId ? (
          <Link to={`/admin/organizations/${orgId}`} className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Organization
          </Link>
        ) : (
          <Link to="/admin/integrations" className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Integrations
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-card border flex items-center justify-center">
            {integration.icon_url ? (
              <img src={integration.icon_url} alt="" className="w-10 h-10 object-contain" />
            ) : (
              <Activity className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{integration.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <IntegrationCategoryBadge category={integration.category} />
              <IntegrationStatusBadge status={integration.status} />
            </div>
          </div>
        </div>
        
        {orgIntegration && (
          <div className="flex items-center gap-3 bg-card border px-4 py-2 rounded-lg">
            <Label htmlFor="active-toggle" className="font-medium">Integration Active</Label>
            <Switch id="active-toggle" checked={isActive} onCheckedChange={setIsActive} />
          </div>
        )}
      </div>

      {!orgIntegration && orgId ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2">Integration Not Connected</h3>
            <p className="text-muted-foreground mb-6">Connect this integration to configure its settings.</p>
            <Button onClick={() => navigate(`/admin/organizations/${orgId}`)}>Go to Organization Settings</Button>
          </CardContent>
        </Card>
      ) : orgIntegration ? (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Connection Settings</CardTitle>
              <CardDescription>Configure API credentials and sync preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    placeholder="Enter API Key"
                  />
                </div>
                <div className="space-y-2">
                  <Label>API Secret</Label>
                  <Input 
                    type="password" 
                    value={apiSecret} 
                    onChange={(e) => setApiSecret(e.target.value)} 
                    placeholder="Enter API Secret"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Webhook URL (Read-only)</Label>
                <Input 
                  readOnly 
                  value={orgIntegration.webhook_url || ''} 
                  className="bg-muted font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Use this URL in {integration.name} to send events to Learnfinity.</p>
              </div>

              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Custom Configuration (JSON)</Label>
                <Textarea 
                  value={customConfig} 
                  onChange={(e) => setCustomConfig(e.target.value)} 
                  className="font-mono text-sm min-h-[150px]"
                  placeholder='{"field_mapping": {}}'
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="destructive" onClick={handleDisconnect} className="w-full sm:w-auto gap-2">
              <Unplug className="w-4 h-4" /> Disconnect Integration
            </Button>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" onClick={handleTestConnection} className="flex-1 sm:flex-none">
                Test Connection
              </Button>
              <Button onClick={handleSave} disabled={saving} className="flex-1 sm:flex-none gap-2">
                <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Configuration'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Select an organization to configure this integration.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
