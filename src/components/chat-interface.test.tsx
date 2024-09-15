import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChatInterface } from '@/components/chat-interface';
import { render } from '../lib/test-utils';

describe('ChatInterface with real API', () => {
  it('should allow a user to type a message, send it, and receive a bot response', async () => {
    render(<ChatInterface />);

    const nameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'Hello Bot!' } });

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(() =>
      expect(screen.getByText(/bot is typing.../i)).toBeInTheDocument()
    );
    await waitFor(
      () => {
        expect(screen.getByText(/test user:/i)).toBeInTheDocument();
        expect(screen.getByText(/hello bot!/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await waitFor(
      () => {
        const botMessage = screen.getByText(/bot:/i);
        expect(botMessage).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
