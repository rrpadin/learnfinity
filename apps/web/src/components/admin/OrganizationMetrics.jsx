
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function OrganizationMetrics({ metrics, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Total Organizations</p>
            <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">
              {metrics?.totalOrganizations || 0}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Total Users</p>
            <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">
              {metrics?.totalUsers || 0}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Active Organizations</p>
            <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">
              {metrics?.activeOrganizations || 0}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
