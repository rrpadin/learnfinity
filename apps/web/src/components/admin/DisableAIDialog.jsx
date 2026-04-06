
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
import { AIManagementService } from '@/lib/AIManagementService.js';

export function DisableAIDialog({ isOpen, onClose, onConfirm, organizationId }) {
  const [isDisabling, setIsDisabling] = useState(false);

  const handleDisable = async () => {
    if (!organizationId) return;
    
    setIsDisabling(true);
    try {
      await AIManagementService.disableAI(organizationId);
      toast.success("AI has been disabled for this organization.");
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to disable AI", error);
      toast.error("Failed to disable AI. Please try again.");
    } finally {
      setIsDisabling(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disable AI Features?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to disable AI for this organization? You can re-enable it anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDisabling}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleDisable();
            }}
            disabled={isDisabling}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDisabling ? "Disabling..." : "Disable AI"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
