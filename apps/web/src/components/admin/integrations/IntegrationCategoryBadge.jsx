
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function IntegrationCategoryBadge({ category, className }) {
  const categoryConfig = {
    hris: { label: 'HRIS', className: 'bg-teal-500/15 text-teal-700 dark:text-teal-400' },
    lms: { label: 'LMS', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400' },
    analytics: { label: 'Analytics', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
    communication: { label: 'Communication', className: 'bg-green-500/15 text-green-700 dark:text-green-400' },
    other: { label: 'Other', className: 'bg-slate-500/15 text-slate-700 dark:text-slate-400' }
  };

  const config = categoryConfig[category] || categoryConfig.other;

  return (
    <Badge variant="outline" className={cn("font-medium border-transparent", config.className, className)}>
      {config.label}
    </Badge>
  );
}
