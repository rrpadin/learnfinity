
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function UserRoleBadge({ role, className }) {
  const roleConfig = {
    admin: { label: 'Admin', className: 'bg-teal-500/15 text-teal-700 dark:text-teal-400' },
    manager: { label: 'Manager', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400' },
    employee: { label: 'Employee', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
    learner: { label: 'Learner', className: 'bg-slate-500/15 text-slate-700 dark:text-slate-400' }
  };

  const config = roleConfig[role?.toLowerCase()] || roleConfig.learner;

  return (
    <Badge variant="outline" className={cn("capitalize font-medium border-transparent", config.className, className)}>
      {config.label}
    </Badge>
  );
}
