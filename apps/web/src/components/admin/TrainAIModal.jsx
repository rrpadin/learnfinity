
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Database, Users, BookOpen, Target, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { AIManagementService } from '@/lib/AIManagementService.js';

export function TrainAIModal({ isOpen, onClose, onTrainingComplete, organizationId }) {
  const [isTraining, setIsTraining] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    if (isOpen && organizationId) {
      fetchStats();
    }
  }, [isOpen, organizationId]);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const data = await AIManagementService.getOrganizationStatsForTraining(organizationId);
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleStartTraining = async () => {
    setIsTraining(true);
    try {
      // We close the modal immediately and let the training run in the background
      // or we can keep it open. The prompt says: "On Start Training: close modal, trigger trainAI(), show loading state, after 3-5 seconds show success toast"
      onClose();
      toast.info("AI training started. This may take a few moments...");
      
      await AIManagementService.trainAI(organizationId);
      
      toast.success("AI training completed successfully");
      if (onTrainingComplete) onTrainingComplete();
    } catch (error) {
      console.error("Training failed", error);
      toast.error("AI training failed. Please try again.");
      if (onTrainingComplete) onTrainingComplete();
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isTraining && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Train AI Model
          </DialogTitle>
          <DialogDescription>
            This will train the AI model using your organization's data. This is a placeholder workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h4 className="text-sm font-medium mb-3 text-foreground">Data to be processed:</h4>
          
          {loadingStats || !stats ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.usersCount}</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.programsCount}</p>
                  <p className="text-xs text-muted-foreground">Programs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.goalsCount}</p>
                  <p className="text-xs text-muted-foreground">Goals</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.needsCount}</p>
                  <p className="text-xs text-muted-foreground">L&D Needs</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isTraining || loadingStats}>
            Cancel
          </Button>
          <Button onClick={handleStartTraining} disabled={isTraining || loadingStats}>
            {isTraining ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Training"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
