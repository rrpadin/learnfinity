
import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatBubble from '@/components/ChatBubble.jsx';

function ConversationHistory({ messages, loading }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-[400px] md:h-[500px] pr-4">
      <div className="flex flex-col py-4">
        {messages.length === 0 && !loading && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No messages yet. Start the conversation!
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <ChatBubble key={msg.id || idx} message={msg} />
        ))}
        
        {loading && (
          <div className="flex justify-start mb-6">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1 animate-pulse" />
              <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}

export default ConversationHistory;
