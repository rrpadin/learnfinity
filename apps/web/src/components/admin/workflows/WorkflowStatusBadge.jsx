
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function WorkflowStatusBadge({ isActive, className }) {
  return (
    <Badge 
      variant={isActive ? "default" : "secondary"}
      className={cn(
        "font-medium",
        isActive 
          ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400" 
          : "bg-muted text-muted-foreground hover:bg-muted",
        className
      )}
    >
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  );
}
