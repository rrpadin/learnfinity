
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, User, Clock, Sparkles } from 'lucide-react';
import { useDemoContext } from '@/contexts/DemoContext.jsx';

export default function DemoSelectionModal({ isOpen, onOpenChange }) {
  const { startDemo } = useDemoContext();

  const handleStart = (type) => {
    onOpenChange(false);
    startDemo(type);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-card">
        <div className="p-8 pb-6 text-center bg-muted/30 border-b border-border">
          <div className="w-12 h-12 bg-[hsl(var(--demo-primary))]/10 text-[hsl(var(--demo-primary))] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Welcome to Learnfinity Demo</DialogTitle>
          <DialogDescription className="text-base">
            Choose how you'd like to explore the system. We've prepared sample data to give you a complete experience.
          </DialogDescription>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Card */}
          <div className="group relative flex flex-col bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[hsl(var(--demo-primary))]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--demo-primary))]/10 text-[hsl(var(--demo-primary))] flex items-center justify-center mb-4">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">Admin Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Explore organization management, user administration, program creation, and workflow automation.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span>~5 minutes</span>
            </div>
            <Button 
              className="w-full bg-[hsl(var(--demo-primary))] hover:bg-[hsl(var(--demo-primary))]/90 text-white"
              onClick={() => handleStart('admin')}
            >
              Start Admin Demo
            </Button>
          </div>

          {/* End-User Card */}
          <div className="group relative flex flex-col bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[hsl(var(--demo-accent))]/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--demo-accent))]/10 text-[hsl(var(--demo-accent))] flex items-center justify-center mb-4">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">End-User Demo</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Experience the learner dashboard, browse programs, track goals, and monitor learning progress.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span>~5 minutes</span>
            </div>
            <Button 
              variant="outline"
              className="w-full border-[hsl(var(--demo-accent))] text-[hsl(var(--demo-accent))] hover:bg-[hsl(var(--demo-accent))]/10"
              onClick={() => handleStart('end-user')}
            >
              Start End-User Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
