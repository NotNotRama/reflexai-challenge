import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';
import { getRandomBotResponse } from '@/lib/bot-responses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { author, content } = req.body;

    if (content.toLowerCase() === 'error') {
      return res.status(500).json({ error: 'Simulated server error' });
    }

    const userMessage = await prisma.message.create({
      data: {
        author: author || 'Anonymous',
        content,
      },
    });

    const botMessageContent = getRandomBotResponse();

    setTimeout(async () => {
      const botMessage = await prisma.message.create({
        data: {
          author: 'Bot',
          content: botMessageContent,
        },
      });

      res.status(200).json({ userMessage, botMessage });
    }, 1000);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
