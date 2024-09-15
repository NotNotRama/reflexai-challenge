const botResponses = [
  'Hello! How can I assist you today?',
  "I'm a simple bot, but I'll do my best to help.",
  "That's an interesting question. Let me think about it.",
  "I'm sorry, I don't have enough information to answer that.",
  'Could you please rephrase your question?',
];

export function getRandomBotResponse(): string {
  const randomIndex = Math.floor(Math.random() * botResponses.length);
  return botResponses[randomIndex];
}
