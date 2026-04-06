
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function OrganizationStatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { label: 'Active', className: 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800' };
      case 'inactive':
        return { label: 'Inactive', className: 'bg-slate-500/15 text-slate-700 hover:bg-slate-500/25 border-slate-200 dark:text-slate-400 dark:border-slate-800' };
      case 'suspended':
        return { label: 'Suspended', className: 'bg-red-500/15 text-red-700 hover:bg-red-500/25 border-red-200 dark:text-red-400 dark:border-red-800' };
      default:
        return { label: status || 'Unknown', className: 'bg-slate-100 text-slate-700' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant="outline" className={`font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}
