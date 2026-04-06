
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrganizationProgramService } from '@/lib/OrganizationProgramService.js';
import { AssignedProgramsList } from './AssignedProgramsList.jsx';
import { AssignProgramsModal } from './AssignProgramsModal.jsx';
import { RemoveProgramDialog } from './RemoveProgramDialog.jsx';

export function ProgramsTab({ orgId }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('-created');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modals
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [programToRemove, setProgramToRemove] = useState(null);

  const fetchPrograms = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const result = await OrganizationProgramService.getOrganizationPrograms(
        orgId,
        { search: searchTerm, status: statusFilter, sort: sortOption },
        { page, perPage: 20 }
      );
      setPrograms(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch organization programs", error);
    } finally {
      setLoading(false);
    }
  }, [orgId, searchTerm, statusFilter, sortOption, page]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchPrograms();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchPrograms]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search programs..." 
              className="pl-9 bg-[hsl(var(--admin-card))]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[140px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={(val) => { setSortOption(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[160px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-created">Newest First</SelectItem>
              <SelectItem value="created">Oldest First</SelectItem>
              <SelectItem value="program_id.title">Name (A-Z)</SelectItem>
              <SelectItem value="-program_id.title">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsAssignModalOpen(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Assign Programs
        </Button>
      </div>

      <AssignedProgramsList 
        programs={programs} 
        loading={loading} 
        onRemove={setProgramToRemove}
      />

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

      <AssignProgramsModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        onSuccess={fetchPrograms}
        orgId={orgId}
      />

      <RemoveProgramDialog 
        isOpen={!!programToRemove} 
        onClose={() => setProgramToRemove(null)} 
        onSuccess={fetchPrograms}
        orgId={orgId}
        program={programToRemove}
      />
    </div>
  );
}
