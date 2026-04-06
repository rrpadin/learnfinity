
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle as MessageCircleQuestion } from 'lucide-react';

function FollowUpQuestions({ questions, onQuestionClick }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-3 px-2">
        <MessageCircleQuestion className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Suggested Follow-ups
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(question)}
            className="text-xs rounded-full bg-background hover:bg-secondary hover:text-secondary-foreground transition-colors border-border/60"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default FollowUpQuestions;
