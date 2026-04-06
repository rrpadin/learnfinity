
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Blocks } from 'lucide-react';
import { IntegrationStatusBadge } from './IntegrationStatusBadge.jsx';
import { IntegrationCategoryBadge } from './IntegrationCategoryBadge.jsx';

export function IntegrationCard({ integration, orgId }) {
  const isAvailable = integration.status === 'available';

  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
            {integration.icon_url ? (
              <img src={integration.icon_url} alt={integration.name} className="w-8 h-8 object-contain" />
            ) : (
              <Blocks className="w-6 h-6" />
            )}
          </div>
          <IntegrationStatusBadge status={integration.status} />
        </div>
        <h3 className="text-lg font-semibold leading-tight">{integration.name}</h3>
        <div className="mt-1">
          <IntegrationCategoryBadge category={integration.category} />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {integration.description || `Connect ${integration.name} to sync data and automate workflows.`}
        </p>
      </CardContent>
      <CardFooter className="pt-4 border-t mt-auto">
        {isAvailable ? (
          <Button asChild className="w-full" variant="secondary">
            <Link to={`/admin/integrations/${integration.id}${orgId ? `?orgId=${orgId}` : ''}`}>
              Configure
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full" variant="outline">
            {integration.status === 'coming_soon' ? 'Coming Soon' : 'Unavailable'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
