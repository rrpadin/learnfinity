
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star } from 'lucide-react';
import { getProgramPresentation } from '@/lib/programPresentation';

function ProgramCard({ program, onAction, actionLabel = "View Details" }) {
  const presentation = getProgramPresentation(program);
  const Icon = presentation.Icon;

  const truncate = (str, length) => {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  };

  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  };

  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group">
      <div className={`h-28 w-full bg-gradient-to-r ${presentation.gradient} p-4 text-white`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Badge variant="secondary" className="border-none bg-white/15 text-white backdrop-blur-sm">
              {presentation.formatLabel}
            </Badge>
            {presentation.aiLabel ? (
              <Badge variant="secondary" className="border-none bg-white/15 text-white backdrop-blur-sm">
                {presentation.aiLabel}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4 mb-3">
          <Badge variant="secondary" className="font-medium">
            {program.category || 'General'}
          </Badge>
          {program.difficulty && (
            <Badge variant="outline" className={`capitalize ${difficultyColors[program.difficulty] || ''}`}>
              {program.difficulty}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl leading-tight text-balance group-hover:text-primary transition-colors">
          {program.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
          {truncate(program.description, 120)}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/80">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{presentation.isSprint ? `${program.duration_days} Day Sprint` : `${program.duration_days} Days`}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{program.enrollment_count || 0}</span>
          </div>
          {program.rating > 0 && (
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{program.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Button onClick={() => onAction(program)} className="w-full group-hover:shadow-md transition-all">
          {presentation.isAdaptive ? 'Open Jordy Path' : actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProgramCard;
