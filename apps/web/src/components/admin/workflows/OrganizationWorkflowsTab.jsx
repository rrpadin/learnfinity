
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { WorkflowService } from '@/lib/WorkflowService.js';
import { WorkflowCard } from './WorkflowCard.jsx';

export function OrganizationWorkflowsTab({ orgId }) {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerFilter, setTriggerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchWorkflows = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const result = await WorkflowService.getOrganizationWorkflows(orgId, {
        search: searchTerm,
        trigger_type: triggerFilter,
        status: statusFilter
      }, { page: 1, perPage: 50 });
      setWorkflows(result.items);
    } catch (error) {
      console.error("Failed to fetch workflows", error);
    } finally {
      setLoading(false);
    }
  }, [orgId, searchTerm, triggerFilter, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchWorkflows(), 300);
    return () => clearTimeout(timer);
  }, [fetchWorkflows]);

  const handleToggleStatus = async (id, isActive) => {
    try {
      if (isActive) {
        await WorkflowService.activateWorkflow(id);
      } else {
        await WorkflowService.deactivateWorkflow(id);
      }
      toast.success(`Workflow ${isActive ? 'activated' : 'deactivated'}`);
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to update workflow status");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await WorkflowService.duplicateWorkflow(id);
      toast.success("Workflow duplicated successfully");
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to duplicate workflow");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workflow?")) return;
    try {
      await WorkflowService.deleteWorkflow(id);
      toast.success("Workflow deleted");
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to delete workflow");
    }
  };

  const handleExecute = async (id) => {
    try {
      await WorkflowService.executeWorkflow(id, orgId);
      toast.success("Workflow executed successfully");
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to execute workflow");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search workflows..." 
              className="pl-9 bg-[hsl(var(--admin-card))]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={triggerFilter} onValueChange={setTriggerFilter}>
            <SelectTrigger className="w-full sm:w-[140px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Triggers</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="schedule">Schedule</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="webhook">Webhook</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link to={`/admin/workflows/create?orgId=${orgId}`}>
            <Plus className="w-4 h-4" /> Create Workflow
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
        ) : workflows.length === 0 ? (
          <div className="border rounded-xl p-12 text-center bg-[hsl(var(--admin-card))]">
            <h3 className="text-lg font-medium mb-2">No workflows found</h3>
            <p className="text-muted-foreground mb-4">Create your first workflow to automate tasks.</p>
            <Button asChild variant="outline">
              <Link to={`/admin/workflows/create?orgId=${orgId}`}>Create Workflow</Link>
            </Button>
          </div>
        ) : (
          workflows.map(workflow => (
            <WorkflowCard 
              key={workflow.id} 
              workflow={workflow} 
              onToggleStatus={handleToggleStatus}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onExecute={handleExecute}
            />
          ))
        )}
      </div>
    </div>
  );
}
