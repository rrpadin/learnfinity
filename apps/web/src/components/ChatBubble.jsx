
import React from 'react';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

function ChatBubble({ message }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="text-xs font-medium text-foreground/70">
              {isUser ? 'You' : 'Jordy (AI Coach)'}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {message.timestamp ? format(new Date(message.timestamp), 'h:mm a') : ''}
            </span>
          </div>
          
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser 
              ? 'bg-primary text-primary-foreground rounded-tr-sm' 
              : 'bg-card border border-border/50 text-card-foreground rounded-tl-sm'
          }`}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
