import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Head>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Head>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16 text-yellow-500" />
          </div>
          <p className="text-gray-600 mb-4">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-gray-500">
            It seems you&apos;ve ventured into uncharted territory. Let&apos;s
            get you back on track!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" passHref>
            <Button className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
