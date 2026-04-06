
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { IntegrationService } from '@/lib/IntegrationService.js';
import { IntegrationCard } from '@/components/admin/integrations/IntegrationCard.jsx';

export default function IntegrationsHub() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchIntegrations = async () => {
      setLoading(true);
      try {
        const result = await IntegrationService.getIntegrations({
          search: searchTerm,
          category: categoryFilter
        });
        setIntegrations(result.items);
      } catch (error) {
        console.error("Failed to fetch integrations", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchIntegrations, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, categoryFilter]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Helmet>
        <title>Integration Hub - Admin | Learnfinity</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Integration Hub</h1>
        <p className="text-muted-foreground">
          Connect Learnfinity with your favorite tools to sync data and automate workflows.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="hris">HRIS</SelectItem>
            <SelectItem value="lms">LMS</SelectItem>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : integrations.length === 0 ? (
        <div className="text-center py-24 border rounded-xl bg-card">
          <h3 className="text-lg font-medium mb-2">No integrations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {integrations.map(integration => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      )}
    </div>
  );
}
