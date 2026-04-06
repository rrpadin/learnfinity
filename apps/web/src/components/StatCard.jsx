
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleDotDashed as LucideIcon } from 'lucide-react';

function StatCard({ icon: Icon, label, value, trend, trendLabel }) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {label}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {trend !== undefined && (
              <p className={`text-xs mt-2 ${trend >= 0 ? 'text-accent' : 'text-destructive'}`}>
                {trend >= 0 ? '+' : ''}{trend} {trendLabel}
              </p>
            )}
          </div>
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
