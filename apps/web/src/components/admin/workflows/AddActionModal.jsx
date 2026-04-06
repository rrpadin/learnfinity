
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function AddActionModal({ isOpen, onClose, onAdd }) {
  const [actionType, setActionType] = useState('');
  const [config, setConfig] = useState({});

  const handleAdd = () => {
    if (!actionType) return;
    
    onAdd({
      id: crypto.randomUUID(),
      type: actionType,
      config: config
    });
    
    // Reset
    setActionType('');
    setConfig({});
    onClose();
  };

  const renderConfigFields = () => {
    switch (actionType) {
      case 'send_email':
        return (
          <>
            <div className="space-y-2">
              <Label>To Address</Label>
              <Input 
                placeholder="user@example.com or {{user.email}}" 
                value={config.to || ''} 
                onChange={(e) => setConfig({...config, to: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input 
                placeholder="Email Subject" 
                value={config.subject || ''} 
                onChange={(e) => setConfig({...config, subject: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Body</Label>
              <Textarea 
                placeholder="Email content..." 
                value={config.body || ''} 
                onChange={(e) => setConfig({...config, body: e.target.value})} 
              />
            </div>
          </>
        );
      case 'call_integration':
        return (
          <>
            <div className="space-y-2">
              <Label>Integration</Label>
              <Select value={config.integration || ''} onValueChange={(v) => setConfig({...config, integration: v})}>
                <SelectTrigger><SelectValue placeholder="Select integration" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="slack">Slack</SelectItem>
                  <SelectItem value="workday">Workday</SelectItem>
                  <SelectItem value="custom">Custom Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payload (JSON)</Label>
              <Textarea 
                placeholder='{"message": "Hello"}' 
                value={config.payload || ''} 
                onChange={(e) => setConfig({...config, payload: e.target.value})} 
                className="font-mono text-sm"
              />
            </div>
          </>
        );
      default:
        return (
          <div className="space-y-2">
            <Label>Configuration (JSON)</Label>
            <Textarea 
              placeholder='{"key": "value"}' 
              value={config.raw || ''} 
              onChange={(e) => setConfig({...config, raw: e.target.value})} 
              className="font-mono text-sm"
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Workflow Action</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Action Type</Label>
            <Select value={actionType} onValueChange={(v) => { setActionType(v); setConfig({}); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="send_email">Send Email</SelectItem>
                <SelectItem value="create_record">Create Record</SelectItem>
                <SelectItem value="update_record">Update Record</SelectItem>
                <SelectItem value="call_integration">Call Integration</SelectItem>
                <SelectItem value="send_notification">Send Notification</SelectItem>
                <SelectItem value="log_event">Log Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {actionType && (
            <div className="pt-4 border-t space-y-4">
              <h4 className="text-sm font-medium">Action Configuration</h4>
              {renderConfigFields()}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!actionType}>Add Action</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
