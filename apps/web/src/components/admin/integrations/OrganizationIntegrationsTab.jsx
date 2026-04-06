
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Plus, Search, Settings, Unplug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { IntegrationService } from '@/lib/IntegrationService.js';
import { IntegrationCategoryBadge } from './IntegrationCategoryBadge.jsx';
import { AddIntegrationModal } from './AddIntegrationModal.jsx';

export function OrganizationIntegrationsTab({ orgId }) {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchIntegrations = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const result = await IntegrationService.getOrganizationIntegrations(orgId, { page: 1, perPage: 50 });
      setIntegrations(result.items);
    } catch (error) {
      console.error("Failed to fetch org integrations", error);
    } finally {
      setLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  const handleDisconnect = async (integrationId, name) => {
    if (!window.confirm(`Are you sure you want to disconnect ${name}?`)) return;
    
    try {
      await IntegrationService.disconnectIntegration(orgId, integrationId);
      toast.success(`${name} disconnected successfully`);
      fetchIntegrations();
    } catch (error) {
      toast.error("Failed to disconnect integration");
    }
  };

  const filteredIntegrations = integrations.filter(item => {
    const name = item.expand?.integration_id?.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search connected integrations..." 
            className="pl-9 bg-[hsl(var(--admin-card))]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add Integration
        </Button>
      </div>

      <div className="border rounded-md bg-[hsl(var(--admin-card))]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Integration</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sync Frequency</TableHead>
              <TableHead>Last Sync</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredIntegrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  {searchTerm ? "No integrations match your search." : "No integrations connected yet."}
                </TableCell>
              </TableRow>
            ) : (
              filteredIntegrations.map((item) => {
                const integration = item.expand?.integration_id;
                if (!integration) return null;

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {integration.icon_url ? (
                        <img src={integration.icon_url} alt="" className="w-5 h-5 object-contain" />
                      ) : (
                        <div className="w-5 h-5 rounded bg-muted" />
                      )}
                      {integration.name}
                    </TableCell>
                    <TableCell>
                      <IntegrationCategoryBadge category={integration.category} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_active ? "default" : "secondary"} className={item.is_active ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400" : ""}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{item.sync_frequency}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {item.last_sync_date ? format(new Date(item.last_sync_date), 'MMM d, yyyy h:mm a') : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/integrations/${integration.id}?orgId=${orgId}`}>
                            <Settings className="w-4 h-4 mr-1" /> Configure
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDisconnect(integration.id, integration.name)}
                        >
                          <Unplug className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <AddIntegrationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchIntegrations}
        orgId={orgId}
      />
    </div>
  );
}
