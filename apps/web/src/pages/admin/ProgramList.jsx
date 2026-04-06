
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreVertical, Edit, Eye, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function ProgramList() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('programs').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setPrograms(records);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program? This action cannot be undone.')) return;
    
    try {
      await pb.collection('programs').delete(id, { $autoCancel: false });
      setPrograms(programs.filter(p => p.id !== id));
      toast.success('Program deleted successfully');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error('Failed to delete program');
    }
  };

  const handleDuplicate = async (program) => {
    try {
      const newProgram = { ...program };
      delete newProgram.id;
      delete newProgram.created;
      delete newProgram.updated;
      newProgram.title = `${program.title} (Copy)`;
      newProgram.status = 'draft';
      newProgram.enrollment_count = 0;

      const created = await pb.collection('programs').create(newProgram, { $autoCancel: false });
      setPrograms([created, ...programs]);
      toast.success('Program duplicated successfully');
    } catch (error) {
      console.error("Duplicate error:", error);
      toast.error('Failed to duplicate program');
    }
  };

  const filteredPrograms = programs.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'draft': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Programs - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--admin-text))] tracking-tight">Programs</h1>
            <p className="text-[hsl(var(--admin-muted))] mt-1">Manage learning paths and sprints.</p>
          </div>
          <Button onClick={() => navigate('/admin/programs/new')} className="gap-2">
            <Plus className="w-4 h-4" /> Create Program
          </Button>
        </div>

        <div className="bg-[hsl(var(--admin-card))] border border-[hsl(var(--admin-border))] rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[hsl(var(--admin-border))] flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted))]" />
              <Input 
                placeholder="Search programs..." 
                className="pl-9 bg-[hsl(var(--admin-bg))] border-[hsl(var(--admin-border))]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[hsl(var(--admin-bg))]">
                <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                  <TableHead className="text-[hsl(var(--admin-muted))]">Title</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Category</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Duration</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Enrollments</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Status</TableHead>
                  <TableHead className="text-right text-[hsl(var(--admin-muted))]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i} className="border-[hsl(var(--admin-border))]">
                      <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredPrograms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-[hsl(var(--admin-muted))]">
                      No programs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrograms.map((program) => (
                    <TableRow key={program.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-hover))]">
                      <TableCell className="font-medium text-[hsl(var(--admin-text))]">{program.title}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-muted))]">{program.category || '-'}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-muted))]">{program.duration_days} days</TableCell>
                      <TableCell className="text-[hsl(var(--admin-muted))]">{program.enrollment_count || 0}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`capitalize ${getStatusColor(program.status)}`}>
                          {program.status || 'draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--admin-muted))] hover:text-[hsl(var(--admin-text))]">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                            <DropdownMenuItem onClick={() => navigate(`/admin/programs/${program.id}/edit`)} className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/programs/${program.id}`)} className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" /> View Public
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(program)} className="cursor-pointer">
                              <Copy className="w-4 h-4 mr-2" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(program.id)} className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramList;
