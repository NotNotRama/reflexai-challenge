import { Message } from '@prisma/client';

export interface ChatMessage extends Message {
  timestamp: string;
}
