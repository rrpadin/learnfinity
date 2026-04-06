
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function GoalStatusBadge({ status }) {
  const variants = {
    active: 'bg-emerald-500/15 text-emerald-700 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800',
    completed: 'bg-blue-500/15 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800',
    on_hold: 'bg-slate-500/15 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-800',
  };

  const defaultVariant = 'bg-slate-500/15 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-800';
  const className = variants[status?.toLowerCase()] || defaultVariant;
  
  const displayStatus = status ? status.replace('_', ' ') : 'Unknown';

  return (
    <Badge variant="outline" className={`capitalize ${className}`}>
      {displayStatus}
    </Badge>
  );
}
