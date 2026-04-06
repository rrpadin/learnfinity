
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

function MissionCard({ mission, status = 'pending', onClick }) {
  const statusConfig = {
    pending: {
      icon: Circle,
      label: 'Not started',
      variant: 'secondary',
      color: 'text-muted-foreground'
    },
    in_progress: {
      icon: Clock,
      label: 'In progress',
      variant: 'default',
      color: 'text-primary'
    },
    completed: {
      icon: CheckCircle2,
      label: 'Completed',
      variant: 'default',
      color: 'text-accent'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                Day {mission.day_number}
              </Badge>
              <Badge variant={config.variant} className="text-xs gap-1">
                <StatusIcon className="w-3 h-3" />
                {config.label}
              </Badge>
            </div>
            <CardTitle className="text-xl">{mission.title}</CardTitle>
          </div>
        </div>
        <CardDescription className="mt-2 line-clamp-2">
          {mission.objective}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {mission.instructions}
        </p>
      </CardContent>
    </Card>
  );
}

export default MissionCard;
