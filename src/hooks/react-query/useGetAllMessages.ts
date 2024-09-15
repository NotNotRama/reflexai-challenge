import { chatClient } from '@/lib/client';
import { Message } from '@prisma/client';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetAllMessages = (
  queryOptions?: UseQueryOptions<Message[], Error>
) => {
  return useQuery({
    queryKey: ['allMessages'],
    queryFn: chatClient.getAllMessages,
    ...queryOptions,
  });
};
