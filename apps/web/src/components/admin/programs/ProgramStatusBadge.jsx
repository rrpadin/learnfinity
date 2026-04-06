
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ProgramStatusBadge({ status, className }) {
  const isInactive = status === 'inactive';
  
  return (
    <Badge 
      variant={isInactive ? "secondary" : "default"}
      className={cn(
        "capitalize font-medium",
        isInactive 
          ? "bg-muted text-muted-foreground hover:bg-muted" 
          : "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400",
        className
      )}
    >
      {status || 'Unknown'}
    </Badge>
  );
}
