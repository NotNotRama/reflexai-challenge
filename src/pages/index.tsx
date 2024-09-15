import { ChatInterface } from '@/components/chat-interface';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chat with Bot</title>
        <meta name="description" content="Chat with a simple bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Home;
