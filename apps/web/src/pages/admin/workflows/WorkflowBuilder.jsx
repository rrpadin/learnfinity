
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WorkflowService } from '@/lib/WorkflowService.js';
import { WorkflowCard } from '@/components/admin/workflows/WorkflowCard.jsx';
import { toast } from 'sonner';

export default function WorkflowBuilder() {
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('orgId'); // In a real app, might default to admin's org
  
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerFilter, setTriggerFilter] = useState('all');

  const fetchWorkflows = async () => {
    if (!orgId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const result = await WorkflowService.getOrganizationWorkflows(orgId, {
        search: searchTerm,
        trigger_type: triggerFilter
      });
      setWorkflows(result.items);
    } catch (error) {
      console.error("Failed to fetch workflows", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchWorkflows, 300);
    return () => clearTimeout(timer);
  }, [orgId, searchTerm, triggerFilter]);

  const handleToggleStatus = async (id, isActive) => {
    try {
      if (isActive) await WorkflowService.activateWorkflow(id);
      else await WorkflowService.deactivateWorkflow(id);
      toast.success(`Workflow ${isActive ? 'activated' : 'deactivated'}`);
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await WorkflowService.duplicateWorkflow(id);
      toast.success("Workflow duplicated");
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to duplicate");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workflow?")) return;
    try {
      await WorkflowService.deleteWorkflow(id);
      toast.success("Workflow deleted");
      fetchWorkflows();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleExecute = async (id) => {
    try {
      await WorkflowService.executeWorkflow(id, orgId);
      toast.success("Workflow executed");
      fetchWorkflows();
    } catch (error) {
      toast.error("Execution failed");
    }
  };

  if (!orgId) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-2">Organization Required</h2>
        <p className="text-muted-foreground">Please select an organization to manage workflows.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Helmet>
        <title>Workflow Builder - Admin | Learnfinity</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Workflow Builder</h1>
          <p className="text-muted-foreground">Automate tasks and processes across your organization.</p>
        </div>
        <Button asChild className="gap-2">
          <Link to={`/admin/workflows/create?orgId=${orgId}`}>
            <Plus className="w-4 h-4" /> Create Workflow
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search workflows..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={triggerFilter} onValueChange={setTriggerFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Trigger Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Triggers</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="schedule">Schedule</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
        ) : workflows.length === 0 ? (
          <div className="text-center py-24 border rounded-xl bg-card">
            <h3 className="text-lg font-medium mb-2">No workflows found</h3>
            <p className="text-muted-foreground mb-4">Create your first workflow to get started.</p>
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
