
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function UserStatusBadge({ status, className }) {
  const statusConfig = {
    active: { label: 'Active', className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' },
    inactive: { label: 'Inactive', className: 'bg-slate-500/15 text-slate-700 dark:text-slate-400' },
    pending: { label: 'Pending', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' }
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.active;

  return (
    <Badge variant="secondary" className={cn("capitalize font-medium", config.className, className)}>
      {config.label}
    </Badge>
  );
}
