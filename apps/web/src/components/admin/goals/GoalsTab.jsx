
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoalService } from '@/lib/GoalService.js';
import { GoalsList } from './GoalsList.jsx';
import { CreateGoalModal } from './CreateGoalModal.jsx';
import { EditGoalModal } from './EditGoalModal.jsx';
import { DeleteGoalDialog } from './DeleteGoalDialog.jsx';
import { toast } from 'sonner';

export function GoalsTab({ orgId }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('-created');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const fetchGoals = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const result = await GoalService.getOrganizationGoals(
        orgId,
        { 
          search: searchTerm, 
          type: typeFilter, 
          priority: priorityFilter, 
          status: statusFilter,
          sort: sortOption
        },
        { page, perPage: 20 }
      );
      setGoals(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch goals", error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  }, [orgId, searchTerm, typeFilter, priorityFilter, statusFilter, sortOption, page]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchGoals();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchGoals]);

  const handleSeedData = async () => {
    try {
      setLoading(true);
      await GoalService.seedSampleGoals(orgId);
      toast.success('Sample goals seeded successfully');
      fetchGoals();
    } catch (error) {
      toast.error('Failed to seed sample goals');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search goals..." 
              className="pl-9 bg-[hsl(var(--admin-card))]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={typeFilter} onValueChange={(val) => { setTypeFilter(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[130px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="strategic">Strategic</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={(val) => { setPriorityFilter(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[130px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[130px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOption} onValueChange={(val) => { setSortOption(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[150px] bg-[hsl(var(--admin-card))]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-created">Newest First</SelectItem>
              <SelectItem value="created">Oldest First</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="-title">Title (Z-A)</SelectItem>
              <SelectItem value="target_date">Target Date (Asc)</SelectItem>
              <SelectItem value="-target_date">Target Date (Desc)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 shrink-0 w-full lg:w-auto">
          {goals.length === 0 && !loading && !searchTerm && (
            <Button variant="outline" onClick={handleSeedData} className="gap-2 flex-1 lg:flex-none">
              <Database className="w-4 h-4" /> Seed Data
            </Button>
          )}
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 flex-1 lg:flex-none">
            <Plus className="w-4 h-4" /> Add Goal
          </Button>
        </div>
      </div>

      <GoalsList 
        goals={goals} 
        loading={loading} 
        onEdit={setGoalToEdit}
        onDelete={setGoalToDelete}
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

      <CreateGoalModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={fetchGoals}
        orgId={orgId}
      />

      <EditGoalModal 
        isOpen={!!goalToEdit} 
        goal={goalToEdit}
        onClose={() => setGoalToEdit(null)} 
        onSuccess={fetchGoals}
      />

      <DeleteGoalDialog 
        isOpen={!!goalToDelete} 
        goal={goalToDelete}
        onClose={() => setGoalToDelete(null)} 
        onSuccess={fetchGoals}
      />
    </div>
  );
}
