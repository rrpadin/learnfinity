
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrganizationService } from '@/lib/OrganizationService.js';
import { OrganizationMetrics } from '@/components/admin/OrganizationMetrics.jsx';
import { OrganizationsList } from '@/components/admin/OrganizationsList.jsx';
import { CreateOrganizationModal } from '@/components/admin/CreateOrganizationModal.jsx';
import { EditOrganizationModal } from '@/components/admin/EditOrganizationModal.jsx';
import { DeleteOrganizationDialog } from '@/components/admin/DeleteOrganizationDialog.jsx';

export default function OrganizationManagement() {
  const [organizations, setOrganizations] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(true);
  
  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editOrg, setEditOrg] = useState(null);
  const [deleteOrg, setDeleteOrg] = useState(null);

  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const result = await OrganizationService.getAllOrganizations(
        { search: searchTerm, status: statusFilter },
        { page, perPage: 20 }
      );
      setOrganizations(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch organizations", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, page]);

  const fetchMetrics = async () => {
    setMetricsLoading(true);
    try {
      const data = await OrganizationService.getOrganizationMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("Failed to fetch metrics", error);
    } finally {
      setMetricsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleDataChange = () => {
    fetchOrganizations();
    fetchMetrics();
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset to first page on new search
      fetchOrganizations();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchOrganizations]);

  return (
    <>
      <Helmet>
        <title>Organizations - Admin | Learnfinity</title>
      </Helmet>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--admin-text))] tracking-tight">Organizations</h1>
            <p className="text-[hsl(var(--admin-muted))] mt-1">Manage client organizations and their limits.</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create Organization
          </Button>
        </div>

        <OrganizationMetrics metrics={metrics} loading={metricsLoading} />

        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search organizations or contacts..." 
                className="pl-9 bg-[hsl(var(--admin-card))]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
              <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
                <SelectTrigger className="w-full sm:w-[180px] bg-[hsl(var(--admin-card))]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <OrganizationsList 
            organizations={organizations} 
            loading={loading} 
            onEdit={setEditOrg}
            onDelete={setDeleteOrg}
          />

          {/* Simple Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-[hsl(var(--admin-muted))]">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateOrganizationModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleDataChange}
      />
      
      <EditOrganizationModal 
        isOpen={!!editOrg} 
        organization={editOrg}
        onClose={() => setEditOrg(null)} 
        onSuccess={handleDataChange}
      />

      <DeleteOrganizationDialog 
        isOpen={!!deleteOrg} 
        organization={deleteOrg}
        onClose={() => setDeleteOrg(null)} 
        onSuccess={handleDataChange}
      />
    </>
  );
}
