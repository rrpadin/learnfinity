
import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProgramStatusBadge } from './ProgramStatusBadge.jsx';

export function AssignedProgramsList({ 
  programs, 
  loading, 
  onRemove 
}) {
  if (loading) {
    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-64" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="border rounded-md p-12 text-center bg-[hsl(var(--admin-card))]">
        <h3 className="text-lg font-medium mb-2">No programs assigned yet</h3>
        <p className="text-muted-foreground">
          Click "Assign Programs" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-md bg-[hsl(var(--admin-card))]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Program Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[150px]">Assigned Date</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map((orgProgram) => {
            const program = orgProgram.expand?.program_id;
            if (!program) return null;
            
            const description = program.description || '';
            const truncatedDesc = description.length > 100 
              ? `${description.substring(0, 100)}...` 
              : description;

            return (
              <TableRow key={orgProgram.id}>
                <TableCell className="font-medium">
                  {program.title}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {truncatedDesc}
                </TableCell>
                <TableCell>
                  <ProgramStatusBadge status={orgProgram.status} />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {orgProgram.assigned_date ? format(new Date(orgProgram.assigned_date), 'MM/dd/yyyy') : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemove(program)}
                    title="Remove Program"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
