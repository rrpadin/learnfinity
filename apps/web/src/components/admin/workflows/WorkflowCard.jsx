
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Play, Copy, Trash2, Edit2, Activity } from 'lucide-react';
import { WorkflowStatusBadge } from './WorkflowStatusBadge.jsx';
import { WorkflowTriggerBadge } from './WorkflowTriggerBadge.jsx';

export function WorkflowCard({ workflow, onToggleStatus, onDuplicate, onDelete, onExecute }) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{workflow.name}</h3>
              <WorkflowStatusBadge isActive={workflow.is_active} />
              <WorkflowTriggerBadge triggerType={workflow.trigger_type} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 max-w-3xl">
              {workflow.description || 'No description provided.'}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                <span>{workflow.execution_count || 0} executions</span>
              </div>
              <div>
                Last run: {workflow.last_execution_date ? format(new Date(workflow.last_execution_date), 'MMM d, yyyy h:mm a') : 'Never'}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-between gap-4 border-l pl-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Active</span>
              <Switch 
                checked={workflow.is_active} 
                onCheckedChange={(checked) => onToggleStatus(workflow.id, checked)} 
              />
            </div>
            <div className="flex items-center gap-2">
              {workflow.trigger_type === 'manual' && (
                <Button variant="outline" size="sm" onClick={() => onExecute(workflow.id)} className="gap-1.5">
                  <Play className="w-4 h-4" /> Run
                </Button>
              )}
              <Button variant="ghost" size="icon" asChild title="Edit">
                <Link to={`/admin/workflows/${workflow.id}/edit?orgId=${workflow.organization_id}`}>
                  <Edit2 className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDuplicate(workflow.id)} title="Duplicate">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(workflow.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
