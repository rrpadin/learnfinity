
import React from 'react';
import { Building2, Mail, Phone, Globe, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { OrganizationStatusBadge } from './OrganizationStatusBadge.jsx';

export function OrganizationHeader({ organization }) {
  if (!organization) return null;

  const userCount = organization.current_user_count || 0;
  const userLimit = organization.user_limit || 100;
  const usagePercentage = Math.min(100, (userCount / userLimit) * 100);

  return (
    <div className="bg-[hsl(var(--admin-card))] border rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Logo / Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {organization.logo ? (
            <img src={organization.logo} alt={organization.name} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <Building2 className="w-10 h-10" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--admin-text))] flex items-center gap-3">
                {organization.name}
                <OrganizationStatusBadge status={organization.status} />
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[hsl(var(--admin-muted))]">
                {organization.primary_contact_email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> {organization.primary_contact_email}
                  </span>
                )}
                {organization.primary_contact_phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> {organization.primary_contact_phone}
                  </span>
                )}
                {organization.website && (
                  <a href={organization.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" /> Website
                  </a>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Created {new Date(organization.created).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[hsl(var(--admin-text))]">User Limit</span>
              <span className="text-[hsl(var(--admin-muted))]">{userCount} / {userLimit} users</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
