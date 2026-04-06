
import React from 'react';
import { Bot } from 'lucide-react';

function GuidanceMessage({ message }) {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">
            {message.sender}
          </span>
          <span className="text-xs text-muted-foreground">
            AI Coach
          </span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default GuidanceMessage;
