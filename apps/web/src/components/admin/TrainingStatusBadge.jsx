
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TrainingStatusBadge({ status, className }) {
  const statusConfig = {
    not_started: {
      label: 'Not Started',
      className: 'bg-muted text-muted-foreground hover:bg-muted',
      icon: null
    },
    in_progress: {
      label: 'In Progress',
      className: 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-400',
      icon: <Loader2 className="w-3 h-3 mr-1 animate-spin" />
    },
    completed: {
      label: 'Completed',
      className: 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400',
      icon: null
    },
    failed: {
      label: 'Failed',
      className: 'bg-destructive/15 text-destructive hover:bg-destructive/25 dark:text-destructive',
      icon: null
    }
  };

  const config = statusConfig[status] || statusConfig.not_started;

  return (
    <Badge 
      variant="secondary"
      className={cn("capitalize font-medium flex items-center w-fit", config.className, className)}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
}
