
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { OrganizationProgramService } from '@/lib/OrganizationProgramService.js';

export function RemoveProgramDialog({ isOpen, onClose, onSuccess, orgId, program }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    if (!program || !orgId) return;
    
    setIsDeleting(true);
    try {
      await OrganizationProgramService.removeProgramFromOrganization(orgId, program.id);
      toast.success(`${program.title} removed successfully`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to remove program", error);
      toast.error("Failed to remove program. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Program</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{program?.title}</strong> from this organization? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleRemove();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
