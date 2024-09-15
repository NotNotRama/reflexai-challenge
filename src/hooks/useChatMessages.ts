import { useState } from 'react';
import { Message } from '@prisma/client';
import { useSendMessage } from './react-query/useSendMessage';

interface ChatMessage extends Message {
  timestamp: string;
}

export const useChatMessages = (userName: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useSendMessage({
    onSuccess: (data) => {
      const userMessage: ChatMessage = {
        id: data.userMessage.id,
        content: data.userMessage.content,
        author: userName,
        createdAt: new Date(),
        timestamp: new Date().toISOString(),
      };
      const botMessage: ChatMessage = {
        id: data.botMessage.id,
        content: data.botMessage.content,
        author: 'Bot',
        createdAt: new Date(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  return { messages, sendMessage };
};
