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

  it('should handle errors gracefully', async () => {
    render(<ChatInterface />);

    const nameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'error' } });

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(
      () => {
        expect(
          screen.getByText(/an error occurred while sending your message/i)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(sendButton).not.toBeDisabled();
  });

  it('should clear the input field after sending a message', async () => {
    render(<ChatInterface />);

    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'Hello Bot!' } });

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(
      () => {
        expect(messageInput).toHaveValue('');
      },
      { timeout: 2000 }
    );
  });

  it('should not send empty messages', async () => {
    render(<ChatInterface />);

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.queryByText(/test user:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bot:/i)).not.toBeInTheDocument();
  });
});
