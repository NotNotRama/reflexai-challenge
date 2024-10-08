import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isPending: boolean;
  isError: boolean;
}

export function MessageInput({
  onSendMessage,
  isPending,
  isError,
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full space-x-2"
      data-testid="message-input-form"
      aria-describedby={isError ? 'message-send-error' : undefined}
    >
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow"
        aria-label="Type your message"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}
