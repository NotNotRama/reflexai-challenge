import { chatClient } from '@/lib/client';
import { Message } from '@prisma/client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface SendMessageVariables {
  author: string;
  content: string;
}

export const useSendMessage = (
  options?: UseMutationOptions<
    { userMessage: Message; botMessage: Message },
    Error,
    SendMessageVariables
  >
) => {
  return useMutation({
    mutationFn: ({ author, content }: SendMessageVariables) =>
      chatClient.sendMessage(author, content),
    ...options,
  });
};
