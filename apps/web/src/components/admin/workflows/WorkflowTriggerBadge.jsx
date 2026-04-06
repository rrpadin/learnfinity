
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function WorkflowTriggerBadge({ triggerType, className }) {
  const triggerConfig = {
    event: { label: 'Event', className: 'bg-teal-500/15 text-teal-700 dark:text-teal-400' },
    schedule: { label: 'Schedule', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400' },
    manual: { label: 'Manual', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
    webhook: { label: 'Webhook', className: 'bg-green-500/15 text-green-700 dark:text-green-400' }
  };

  const config = triggerConfig[triggerType] || { label: triggerType, className: 'bg-slate-500/15 text-slate-700' };

  return (
    <Badge variant="outline" className={cn("capitalize font-medium border-transparent", config.className, className)}>
      {config.label}
    </Badge>
  );
}
