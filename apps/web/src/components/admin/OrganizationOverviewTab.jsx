
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

export function OrganizationOverviewTab({ organization, onEdit, onDelete }) {
  if (!organization) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">About Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[hsl(var(--admin-muted))] mb-1">Description</h4>
              <p className="text-[hsl(var(--admin-text))] leading-relaxed">
                {organization.description || 'No description provided.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--admin-muted))] mb-1">Primary Contact</h4>
                <p className="text-[hsl(var(--admin-text))]">{organization.primary_contact_name || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--admin-muted))] mb-1">Subscription Tier</h4>
                <p className="text-[hsl(var(--admin-text))] capitalize">{organization.subscription_tier || 'Standard'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => onEdit(organization)}
            >
              <Edit2 className="w-4 h-4" /> Edit Organization
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(organization)}
            >
              <Trash2 className="w-4 h-4" /> Delete Organization
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
