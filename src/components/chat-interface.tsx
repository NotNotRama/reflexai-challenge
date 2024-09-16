import React, { useState } from 'react';
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
import { useGetAllMessages } from '@/hooks/react-query/useGetAllMessages';

export function ChatInterface() {
  const [userName, setUserName] = useState('');
  const { data: test, isLoading, error } = useGetAllMessages();

  console.log('test', test);
  console.log('isLoading', isLoading);
  console.log('error', error);

  const { messages, sendMessage } = useChatMessages(userName);

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
            sendMessage.mutate({ author: userName, content })
          }
          isPending={sendMessage.isPending}
        />
      </CardFooter>
    </Card>
  );
}
