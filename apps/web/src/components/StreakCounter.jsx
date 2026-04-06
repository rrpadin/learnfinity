
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

function StreakCounter({ streak = 0 }) {
  return (
    <Card className="bg-gradient-to-br from-accent/20 to-primary/20 border-accent/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <Flame className="w-8 h-8 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Current streak
            </p>
            <p className="text-4xl font-bold text-foreground">
              {streak}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {streak === 1 ? 'day' : 'days'} in a row
            </p>
          </div>
        </div>
        {streak > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            {streak >= 7 ? 'Amazing consistency! Keep it up!' : 
             streak >= 3 ? 'Great momentum! Keep going!' : 
             'You\'re building a habit!'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default StreakCounter;
