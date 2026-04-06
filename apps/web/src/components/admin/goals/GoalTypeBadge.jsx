
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function GoalTypeBadge({ type }) {
  const variants = {
    strategic: 'bg-teal-500/15 text-teal-700 border-teal-200 dark:text-teal-400 dark:border-teal-800',
    operational: 'bg-amber-500/15 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800',
    learning: 'bg-blue-500/15 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800',
  };

  const defaultVariant = 'bg-slate-500/15 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-800';
  const className = variants[type?.toLowerCase()] || defaultVariant;

  return (
    <Badge variant="outline" className={`capitalize ${className}`}>
      {type || 'Unknown'}
    </Badge>
  );
}
