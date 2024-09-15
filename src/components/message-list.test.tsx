import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MessageList } from './message-list';
import { ChatMessage } from '@/types/chat';

const mockMessages: ChatMessage[] = [
  {
    id: 1,
    author: 'Bot',
    content: 'Hello, how can I help you?',
    timestamp: new Date().toISOString(),
    createdAt: new Date(),
  },
  {
    id: 2,
    author: 'User',
    content: 'I need assistance with my account.',
    timestamp: new Date().toISOString(),
    createdAt: new Date(),
  },
];

describe('MessageList', () => {
  it('renders messages from the Bot and User', () => {
    render(<MessageList messages={mockMessages} />);

    expect(screen.getByText('Hello, how can I help you?')).toBeInTheDocument();
    expect(
      screen.getByText('I need assistance with my account.')
    ).toBeInTheDocument();
  });

  it('applies correct styles based on the author', () => {
    render(<MessageList messages={mockMessages} />);

    // Check if styles for the Bot message are applied
    const botMessage = screen
      .getByText('Hello, how can I help you?')
      .closest('div');
    expect(botMessage).toHaveClass('bg-secondary');
    expect(botMessage).toHaveClass('text-secondary-foreground');

    // Check if styles for the User message are applied
    const userMessage = screen
      .getByText('I need assistance with my account.')
      .closest('div');
    expect(userMessage).toHaveClass('bg-primary');
    expect(userMessage).toHaveClass('text-primary-foreground');
  });
});
