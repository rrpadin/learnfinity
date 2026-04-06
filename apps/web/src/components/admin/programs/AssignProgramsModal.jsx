
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { OrganizationProgramService } from '@/lib/OrganizationProgramService.js';

export function AssignProgramsModal({ isOpen, onClose, onSuccess, orgId }) {
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgramIds, setSelectedProgramIds] = useState(new Set());
  const [assignmentStatus, setAssignmentStatus] = useState('active');

  useEffect(() => {
    if (isOpen && orgId) {
      fetchAvailablePrograms();
      setSelectedProgramIds(new Set());
      setSearchTerm('');
      setAssignmentStatus('active');
    }
  }, [isOpen, orgId]);

  const fetchAvailablePrograms = async () => {
    setLoading(true);
    try {
      const programs = await OrganizationProgramService.getAvailablePrograms(orgId);
      setAvailablePrograms(programs);
    } catch (error) {
      console.error("Failed to fetch available programs", error);
      toast.error("Failed to load available programs");
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = availablePrograms.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProgram = (programId) => {
    const newSelected = new Set(selectedProgramIds);
    if (newSelected.has(programId)) {
      newSelected.delete(programId);
    } else {
      newSelected.add(programId);
    }
    setSelectedProgramIds(newSelected);
  };

  const handleAssign = async () => {
    if (selectedProgramIds.size === 0) return;
    
    setSubmitting(true);
    try {
      await OrganizationProgramService.assignProgramsToOrganization(
        orgId, 
        Array.from(selectedProgramIds), 
        assignmentStatus
      );
      toast.success(`Successfully assigned ${selectedProgramIds.size} program(s)`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to assign programs", error);
      toast.error("Failed to assign programs. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Programs</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search programs..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={assignmentStatus} onValueChange={setAssignmentStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <div className="bg-muted/50 p-3 border-b flex justify-between items-center">
              <span className="text-sm font-medium">Available Programs</span>
              <span className="text-sm text-muted-foreground">
                {selectedProgramIds.size} program(s) selected
              </span>
            </div>
            
            <ScrollArea className="h-[300px]">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredPrograms.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {searchTerm ? "No programs match your search." : "No available programs to assign."}
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {filteredPrograms.map(program => (
                    <div 
                      key={program.id}
                      className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                      onClick={() => toggleProgram(program.id)}
                    >
                      <Checkbox 
                        id={`program-${program.id}`}
                        checked={selectedProgramIds.has(program.id)}
                        onCheckedChange={() => toggleProgram(program.id)}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-none flex-1">
                        <label 
                          htmlFor={`program-${program.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {program.title}
                        </label>
                        {program.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {program.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            disabled={selectedProgramIds.size === 0 || submitting}
          >
            {submitting ? "Assigning..." : "Assign Programs"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
