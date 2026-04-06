
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function GoalPriorityBadge({ priority }) {
  const variants = {
    high: 'bg-red-500/15 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800',
    medium: 'bg-amber-500/15 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800',
    low: 'bg-slate-500/15 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-800',
  };

  const defaultVariant = 'bg-slate-500/15 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-800';
  const className = variants[priority?.toLowerCase()] || defaultVariant;

  return (
    <Badge variant="outline" className={`capitalize ${className}`}>
      {priority || 'Medium'}
    </Badge>
  );
}
