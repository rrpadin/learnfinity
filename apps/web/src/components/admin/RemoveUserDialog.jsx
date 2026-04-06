
import React, { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { OrganizationService } from '@/lib/OrganizationService.js';

export function RemoveUserDialog({ isOpen, onClose, onSuccess, orgId, orgUser }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    if (!orgUser?.id || !orgId) return;
    
    setIsRemoving(true);
    try {
      await OrganizationService.removeUserFromOrganization(orgId, orgUser.id);
      toast.success('User removed from organization');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to remove user');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{orgUser?.expand?.user_id?.name || 'this user'}</strong> from the organization? They will lose access to organization resources.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleRemove();
            }} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isRemoving}
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
