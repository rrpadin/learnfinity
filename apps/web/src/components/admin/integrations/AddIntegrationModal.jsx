
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { IntegrationService } from '@/lib/IntegrationService.js';

export function AddIntegrationModal({ isOpen, onClose, onSuccess, orgId }) {
  const [availableIntegrations, setAvailableIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [syncFrequency, setSyncFrequency] = useState('manual');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [customConfig, setCustomConfig] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && orgId) {
      fetchAvailableIntegrations();
      resetForm();
    }
  }, [isOpen, orgId]);

  const resetForm = () => {
    setSelectedIntegration('');
    setSyncFrequency('manual');
    setApiKey('');
    setApiSecret('');
    setCustomConfig('');
  };

  const fetchAvailableIntegrations = async () => {
    setLoading(true);
    try {
      // Fetch all available integrations
      const allIntegrations = await IntegrationService.getIntegrations({ status: 'available' });
      
      // Fetch already connected integrations
      const connected = await IntegrationService.getOrganizationIntegrations(orgId, { page: 1, perPage: 100 });
      const connectedIds = connected.items.map(item => item.integration_id);
      
      // Filter out connected ones
      const available = allIntegrations.items.filter(int => !connectedIds.includes(int.id));
      setAvailableIntegrations(available);
    } catch (error) {
      console.error("Failed to fetch integrations", error);
      toast.error("Failed to load available integrations");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!selectedIntegration) return;
    
    setSubmitting(true);
    try {
      let parsedConfig = {};
      if (customConfig) {
        try {
          parsedConfig = JSON.parse(customConfig);
        } catch (e) {
          toast.error("Invalid JSON in custom configuration");
          setSubmitting(false);
          return;
        }
      }

      await IntegrationService.connectIntegration(orgId, selectedIntegration, {
        sync_frequency: syncFrequency,
        api_key: apiKey,
        api_secret: apiSecret,
        configuration: parsedConfig
      });
      
      toast.success("Integration connected successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to connect integration", error);
      toast.error("Failed to connect integration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Integration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Integration</Label>
            <Select value={selectedIntegration} onValueChange={setSelectedIntegration} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Loading..." : "Choose an integration"} />
              </SelectTrigger>
              <SelectContent>
                {availableIntegrations.map(int => (
                  <SelectItem key={int.id} value={int.id}>
                    {int.name} ({int.category})
                  </SelectItem>
                ))}
                {availableIntegrations.length === 0 && !loading && (
                  <SelectItem value="none" disabled>No available integrations</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedIntegration && (
            <>
              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                  <SelectTrigger>
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
                <Label>API Key (Optional)</Label>
                <Input 
                  type="password" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="Enter API Key"
                />
              </div>

              <div className="space-y-2">
                <Label>API Secret (Optional)</Label>
                <Input 
                  type="password" 
                  value={apiSecret} 
                  onChange={(e) => setApiSecret(e.target.value)} 
                  placeholder="Enter API Secret"
                />
              </div>

              <div className="space-y-2">
                <Label>Custom Configuration (JSON, Optional)</Label>
                <Textarea 
                  value={customConfig} 
                  onChange={(e) => setCustomConfig(e.target.value)} 
                  placeholder='{"custom_field": "value"}'
                  className="font-mono text-sm"
                  rows={3}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleConnect} 
            disabled={!selectedIntegration || submitting}
          >
            {submitting ? "Connecting..." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
