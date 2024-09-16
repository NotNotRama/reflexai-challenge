import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MessageInput } from './message-input';
import { axe } from 'jest-axe';

describe('MessageInput', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MessageInput onSendMessage={vi.fn()} isPending={false} isError={false} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('renders input and button', () => {
    render(
      <MessageInput onSendMessage={vi.fn()} isPending={false} isError={false} />
    );

    expect(
      screen.getByPlaceholderText('Type your message...')
    ).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('calls onSendMessage with correct content on form submit', () => {
    const mockSendMessage = vi.fn();
    render(
      <MessageInput
        onSendMessage={mockSendMessage}
        isPending={false}
        isError={false}
      />
    );

    const input = screen.getByPlaceholderText('Type your message...');
    const button = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello, Bot!' } });
    fireEvent.click(button);

    expect(mockSendMessage).toHaveBeenCalledWith('Hello, Bot!');
  });

  it('disables the button when isPending is true', () => {
    render(
      <MessageInput onSendMessage={vi.fn()} isPending={true} isError={false} />
    );

    expect(screen.getByText('Sending...')).toBeDisabled();
  });

  it('enables the button when isPending is false', () => {
    render(
      <MessageInput onSendMessage={vi.fn()} isPending={false} isError={false} />
    );

    expect(screen.getByText('Send')).toBeEnabled();
  });

  it('clears the input field after submission', () => {
    const mockSendMessage = vi.fn();
    render(
      <MessageInput
        onSendMessage={mockSendMessage}
        isPending={false}
        isError={false}
      />
    );

    const input = screen.getByPlaceholderText('Type your message...');
    const form = screen.getByTestId('message-input-form');

    fireEvent.change(input, { target: { value: 'Hello, Bot!' } });
    fireEvent.submit(form);

    expect(input).toHaveValue('');
  });
});
