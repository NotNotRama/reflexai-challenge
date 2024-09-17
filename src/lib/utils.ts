import { useChatMessages } from '@/hooks/useChatMessages';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleSendMessage({
  content,
  userName,
  sendMessage,
  setError,
}: {
  content: string;
  userName: string;
  sendMessage: ReturnType<typeof useChatMessages>['sendMessage'];
  setError: (error: Error | null) => void;
}) {
  try {
    if (content.toLowerCase() === 'throw error') {
      throw new Error('This is a simulated error from the app');
    }
    sendMessage.mutate({ author: userName, content });
    setError(null);
  } catch (err) {
    setError(err as Error);
  }
}
