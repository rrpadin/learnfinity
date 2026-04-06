
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, ArrowRight, Award } from 'lucide-react';

function FeedbackPanel({ feedback }) {
  if (!feedback) return null;

  const { score, strengths, areasToImprove, nextSteps } = feedback;

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-accent';
    if (score >= 6) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs improvement';
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">AI Feedback</CardTitle>
          <div className="flex items-center gap-2">
            <Award className={`w-5 h-5 ${getScoreColor(score)}`} />
            <Badge variant="outline" className={`text-lg font-bold ${getScoreColor(score)}`}>
              {score}/10
            </Badge>
            <span className="text-sm text-muted-foreground">
              {getScoreLabel(score)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-accent mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve */}
        {areasToImprove.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Areas to improve</h3>
            </div>
            <ul className="space-y-2">
              {areasToImprove.map((area, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-primary mt-1">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Next steps</h3>
          </div>
          <ul className="space-y-2">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-muted-foreground mt-1">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default FeedbackPanel;
