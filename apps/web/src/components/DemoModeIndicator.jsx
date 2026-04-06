
import React from 'react';
import { useDemoContext } from '@/contexts/DemoContext.jsx';
import { Button } from '@/components/ui/button';
import { X, PlayCircle } from 'lucide-react';

export default function DemoModeIndicator() {
  const { isActive, exitDemo, currentStep, totalSteps } = useDemoContext();

  if (!isActive) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-3 bg-card shadow-lg rounded-full pl-4 pr-2 py-2 border border-border demo-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--demo-accent))] animate-pulse" />
        <span className="text-sm font-bold text-foreground">Demo Mode</span>
        <span className="text-xs text-muted-foreground ml-2">
          Step {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="w-px h-4 bg-border mx-1" />
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={exitDemo}
        className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
      >
        <X className="w-4 h-4 mr-1" />
        Exit
      </Button>
    </div>
  );
}
