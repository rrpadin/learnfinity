
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit2, Trash2, Target } from 'lucide-react';
import { GoalTypeBadge } from './GoalTypeBadge.jsx';
import { GoalPriorityBadge } from './GoalPriorityBadge.jsx';
import { GoalStatusBadge } from './GoalStatusBadge.jsx';

export function GoalsList({ 
  goals, 
  loading, 
  onEdit, 
  onDelete 
}) {
  
  if (loading) {
    return (
      <div className="border rounded-lg overflow-hidden bg-[hsl(var(--admin-card))]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Goal Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Target Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-[hsl(var(--admin-card))] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-[hsl(var(--admin-text))]">No goals yet</h3>
        <p className="text-[hsl(var(--admin-muted))] mt-1 max-w-sm">
          Create your first organizational goal to start tracking progress!
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-[hsl(var(--admin-card))]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Goal Title</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
            <TableHead className="font-semibold">Target Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id} className="hover:bg-[hsl(var(--admin-hover))] transition-colors">
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-[hsl(var(--admin-text))]">{goal.title}</span>
                  {goal.description && (
                    <span className="text-xs text-[hsl(var(--admin-muted))] line-clamp-1 max-w-md mt-0.5">
                      {goal.description}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <GoalTypeBadge type={goal.goal_type} />
              </TableCell>
              <TableCell>
                <GoalPriorityBadge priority={goal.priority} />
              </TableCell>
              <TableCell className="text-sm text-[hsl(var(--admin-muted))]">
                {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'Not set'}
              </TableCell>
              <TableCell>
                <GoalStatusBadge status={goal.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(goal)}
                    className="h-8 w-8 text-[hsl(var(--admin-muted))] hover:text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(goal)}
                    className="h-8 w-8 text-[hsl(var(--admin-muted))] hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
