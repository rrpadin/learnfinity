
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight, Trophy } from 'lucide-react';

function ProgramProgressCard({ program, currentDay, streak, onAction, actionLabel = "Continue" }) {
  if (!program) return null;

  const totalDays = program.duration_days || 30;
  const progressPercentage = Math.min(100, Math.round((currentDay / totalDays) * 100));

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Trophy className="w-32 h-32" />
      </div>
      <CardContent className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm font-medium text-primary mb-1">Current Program</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                {program.title}
              </h2>
            </div>
            
            <div className="space-y-2 max-w-md">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-foreground">Day {currentDay} of {totalDays}</span>
                <span className="text-primary">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2.5 bg-primary/10" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Streak</p>
                <p className="text-lg font-bold leading-none">{streak} Days</p>
              </div>
            </div>
            
            <Button size="lg" onClick={onAction} className="w-full sm:w-auto gap-2 shadow-md hover:shadow-lg transition-all">
              {actionLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProgramProgressCard;
