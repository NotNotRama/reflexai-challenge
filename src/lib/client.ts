import axios from 'axios';
import { Message } from '@prisma/client';

const isServer = typeof window === 'undefined';

const getBaseUrl = () => {
  if (isServer) {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }
  return '/api';
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
});

export const chatClient = {
  sendMessage: async (
    author: string,
    content: string
  ): Promise<{ userMessage: Message; botMessage: Message }> => {
    const { data } = await axiosInstance.post('/chat', { author, content });
    return data;
  },

  getAllMessages: async (): Promise<Message[]> => {
    const { data } = await axiosInstance.get('/messages');
    return data;
  },
};
