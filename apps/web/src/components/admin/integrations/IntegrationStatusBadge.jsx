
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function IntegrationStatusBadge({ status, className }) {
  const statusConfig = {
    available: {
      label: 'Available',
      className: 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400'
    },
    coming_soon: {
      label: 'Coming Soon',
      className: 'bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:text-blue-400'
    },
    deprecated: {
      label: 'Deprecated',
      className: 'bg-destructive/15 text-destructive hover:bg-destructive/25 dark:text-destructive'
    }
  };

  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };

  return (
    <Badge variant="secondary" className={cn("capitalize font-medium", config.className, className)}>
      {config.label}
    </Badge>
  );
}
