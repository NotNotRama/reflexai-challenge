import React from 'react';
import clsx from 'clsx';
import { ChatMessage } from '@/types/chat';

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="h-[400px] w-full overflow-y-auto bg-secondary/10 rounded-md border">
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div
              className={clsx('flex', {
                'justify-start': message.author === 'Bot',
                'justify-end': message.author !== 'Bot',
              })}
            >
              <div
                className={clsx('inline-block p-2 rounded-lg', {
                  'bg-secondary text-secondary-foreground':
                    message.author === 'Bot',
                  'bg-primary text-primary-foreground':
                    message.author !== 'Bot',
                })}
              >
                <span className="font-bold">
                  {message.author || 'Anonymous'}:{' '}
                </span>
                <span>{message.content}</span>
              </div>
            </div>
            <span
              className={clsx('text-xs text-muted-foreground mt-1', {
                'text-left': message.author === 'Bot',
                'text-right': message.author !== 'Bot',
              })}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
