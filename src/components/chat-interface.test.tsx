import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChatInterface } from '@/components/chat-interface';
import { render } from '../lib/test-utils';
import { axe } from 'jest-axe';

describe('ChatInterface with real API', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ChatInterface />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should allow a user to type a message, send it, and receive a bot response', async () => {
    render(<ChatInterface />);

    const nameInput = screen.getByLabelText('Your Name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'Hello Bot!' } });

    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    await waitFor(
      () => expect(screen.getByText(/bot is typing.../i)).toBeInTheDocument(),
      { timeout: 2000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText(/test user:/i)).toBeInTheDocument();
        expect(screen.getByText(/hello bot!/i)).toBeInTheDocument();
        expect(screen.getByText(/bot:/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const botResponses = screen.getAllByText(/bot:/i);
    expect(botResponses.length).toBeGreaterThan(0);
  }, 2000);

  it('should handle errors gracefully', async () => {
    render(<ChatInterface />);

    const nameInput = screen.getByLabelText('Your Name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'error' } });

    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    await waitFor(
      () => {
        expect(
          screen.getByText(/an error occurred while sending your message/i)
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    expect(sendButton).not.toBeDisabled();
  }, 10000); // Increase timeout to 10 seconds for this test

  it('should clear the input field after sending a message', async () => {
    render(<ChatInterface />);

    const messageInput = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(messageInput, { target: { value: 'Hello Bot!' } });

    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    await waitFor(
      () => {
        expect(messageInput).toHaveValue('');
      },
      { timeout: 5000 }
    );
  });

  it('should not send empty messages', async () => {
    render(<ChatInterface />);

    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    // Wait for a short time to ensure no API call is made
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.queryByText(/test user:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bot:/i)).not.toBeInTheDocument();
  });

  it('should have a link to the admin dashboard', () => {
    render(<ChatInterface />);
    const adminLink = screen.getByRole('link', { name: /admin dashboard/i });
    expect(adminLink).toBeInTheDocument();
    expect(adminLink).toHaveAttribute('href', '/admin/dashboard');
  });
});
