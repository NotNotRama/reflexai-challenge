import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useGetAllMessages } from '@/hooks/react-query/useGetAllMessages';
import { chatClient } from '@/lib/client';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default function AdminDashboard() {
  const { data: messages, isLoading, error } = useGetAllMessages();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-500">An error occurred</div>
    );

  return (
    <>
      <Head>
        <title>Admin Dashboard - Chat Messages</title>
      </Head>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard - Chat Messages
            </h1>
            <Link href="/" passHref>
              <Button variant="link" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Chat
              </Button>
            </Link>
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                All Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  {messages?.map((message) => (
                    <div
                      key={message.id}
                      className="p-3 bg-white rounded-lg shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <span className="font-medium text-gray-800">
                            {message.author}:{' '}
                          </span>
                          <span className="text-gray-600">
                            {message.content}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['allMessages'],
    queryFn: chatClient.getAllMessages,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
