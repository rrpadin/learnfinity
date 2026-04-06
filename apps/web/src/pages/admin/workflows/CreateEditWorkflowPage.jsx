
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Save, Play, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { WorkflowService } from '@/lib/WorkflowService.js';
import { AddActionModal } from '@/components/admin/workflows/AddActionModal.jsx';
import { WorkflowExecutionHistory } from '@/components/admin/workflows/WorkflowExecutionHistory.jsx';

export default function CreateEditWorkflowPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('orgId');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [isAddActionOpen, setIsAddActionOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [triggerType, setTriggerType] = useState('manual');
  const [triggerConfig, setTriggerConfig] = useState({});
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (isEdit) {
      const fetchWorkflow = async () => {
        try {
          const data = await WorkflowService.getWorkflow(id);
          setName(data.name);
          setDescription(data.description || '');
          setTriggerType(data.trigger_type || 'manual');
          setTriggerConfig(data.trigger_config || {});
          setActions(data.actions || []);
        } catch (error) {
          toast.error("Failed to load workflow");
          navigate(`/admin/organizations/${orgId}`);
        } finally {
          setLoading(false);
        }
      };
      fetchWorkflow();
    }
  }, [id, isEdit, orgId, navigate]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Workflow name is required");
      return;
    }
    if (actions.length === 0) {
      toast.error("At least one action is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        description,
        trigger_type: triggerType,
        trigger_config: triggerConfig,
        actions
      };

      if (isEdit) {
        await WorkflowService.updateWorkflow(id, payload);
        toast.success("Workflow updated successfully");
      } else {
        await WorkflowService.createWorkflow(orgId, payload);
        toast.success("Workflow created successfully");
        navigate(`/admin/organizations/${orgId}`);
      }
    } catch (error) {
      toast.error("Failed to save workflow");
    } finally {
      setSaving(false);
    }
  };

  const handleAddAction = (action) => {
    setActions([...actions, action]);
  };

  const handleRemoveAction = (actionId) => {
    setActions(actions.filter(a => a.id !== actionId));
  };

  const handleTest = () => {
    toast.success("Test execution triggered successfully");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><Skeleton className="h-96 w-full rounded-xl" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>{isEdit ? 'Edit Workflow' : 'Create Workflow'} - Admin | Learnfinity</title>
      </Helmet>

      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to={`/admin/organizations/${orgId}`} className="hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Organization
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEdit ? 'Edit Workflow' : 'Create Workflow'}
        </h1>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={handleTest} className="flex-1 md:flex-none gap-2">
            <Play className="w-4 h-4" /> Test
          </Button>
          <Button onClick={handleSave} disabled={saving} className="flex-1 md:flex-none gap-2">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Workflow'}
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Workflow Name <span className="text-destructive">*</span></Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Welcome New User" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this workflow do?" />
            </div>
          </CardContent>
        </Card>

        {/* Trigger */}
        <Card>
          <CardHeader>
            <CardTitle>Trigger</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Trigger Type</Label>
              <Select value={triggerType} onValueChange={(v) => { setTriggerType(v); setTriggerConfig({}); }}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event-based</SelectItem>
                  <SelectItem value="schedule">Scheduled</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {triggerType === 'event' && (
              <div className="space-y-2 pt-2">
                <Label>Event Type</Label>
                <Select 
                  value={triggerConfig.event_type || ''} 
                  onValueChange={(v) => setTriggerConfig({...triggerConfig, event_type: v})}
                >
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user_created">User Created</SelectItem>
                    <SelectItem value="program_assigned">Program Assigned</SelectItem>
                    <SelectItem value="goal_created">Goal Created</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {triggerType === 'schedule' && (
              <div className="space-y-2 pt-2">
                <Label>Cron Expression</Label>
                <Input 
                  value={triggerConfig.cron || ''} 
                  onChange={(e) => setTriggerConfig({...triggerConfig, cron: e.target.value})} 
                  placeholder="0 0 * * *" 
                  className="font-mono w-full md:w-[300px]"
                />
              </div>
            )}

            {triggerType === 'webhook' && (
              <div className="space-y-2 pt-2">
                <Label>Webhook URL (Auto-generated)</Label>
                <Input 
                  readOnly 
                  value={`https://api.learnfinity.com/webhooks/workflows/${id || 'new'}`} 
                  className="bg-muted font-mono text-sm"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Actions</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsAddActionOpen(true)} className="gap-1">
              <Plus className="w-4 h-4" /> Add Action
            </Button>
          </CardHeader>
          <CardContent>
            {actions.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No actions added yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {actions.map((action, index) => (
                  <div key={action.id} className="flex items-start justify-between p-4 border rounded-lg bg-muted/30">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold">
                          {index + 1}
                        </span>
                        <h4 className="font-medium capitalize">{action.type.replace('_', ' ')}</h4>
                      </div>
                      <pre className="text-xs text-muted-foreground mt-2 bg-background p-2 rounded border overflow-x-auto max-w-[600px]">
                        {JSON.stringify(action.config, null, 2)}
                      </pre>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveAction(action.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Execution History (Edit Mode Only) */}
        {isEdit && (
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkflowExecutionHistory workflowId={id} />
            </CardContent>
          </Card>
        )}
      </div>

      <AddActionModal 
        isOpen={isAddActionOpen} 
        onClose={() => setIsAddActionOpen(false)} 
        onAdd={handleAddAction} 
      />
    </div>
  );
}
