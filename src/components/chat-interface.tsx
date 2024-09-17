import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageList } from './message-list';
import { Alert, AlertDescription } from './ui/alert';
import { useChatMessages } from '@/hooks/useChatMessages';
import Link from 'next/link';
import { Button } from './ui/button';
import { MessageInput } from './message-input';
import { ErrorFallback } from './error-fallback';
import { handleSendMessage } from '@/lib/utils';

function ChatInterfaceContent() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { messages, sendMessage } = useChatMessages(userName);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chat with Bot</CardTitle>
        <Link href="/admin/dashboard" passHref>
          <Button variant="outline">Admin Dashboard</Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label htmlFor="user-name">Your Name</Label>
        <Input
          id="user-name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          aria-label="Your name"
        />
        <MessageList messages={messages} />
        {sendMessage.isPending && (
          <p className="text-gray-500 italic">Bot is typing...</p>
        )}
        {sendMessage.isError && (
          <Alert variant="destructive">
            <AlertDescription>
              An error occurred while sending your message. Please try again.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <MessageInput
          onSendMessage={(content) =>
            handleSendMessage({ content, userName, sendMessage, setError })
          }
          isPending={sendMessage.isPending}
          isError={sendMessage.isError}
        />
      </CardFooter>
    </Card>
  );
}

export function ChatInterface() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChatInterfaceContent />
    </ErrorBoundary>
  );
}
