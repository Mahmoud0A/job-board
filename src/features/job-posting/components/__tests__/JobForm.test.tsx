import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi, beforeEach } from 'vitest';
import { JobForm } from '../JobForm';

beforeEach(() => {
  global.fetch = vi.fn();
});

test('Invalid job form submission shows validation errors', async () => {
  render(<JobForm />);

  const submitBtn = screen.getByRole('button', { name: /publish job/i });
  await userEvent.click(submitBtn);

  // Validation messages should appear
  await waitFor(() => {
    expect(screen.getByText(/Title must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Company name must be at least 2 characters/i)).toBeInTheDocument();
  });

  // Fetch should not be called
  expect(global.fetch).not.toHaveBeenCalled();
});

test('Valid job submission posts data', async () => {
  vi.mocked(global.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 'new-job-1' }),
  } as any);

  render(<JobForm />);

  await userEvent.type(screen.getByLabelText(/job title/i), 'Senior Dev');
  await userEvent.type(screen.getByLabelText(/company/i), 'Acme Corp');
  await userEvent.type(screen.getByLabelText(/location/i), 'Remote');
  await userEvent.type(screen.getByLabelText(/description/i), 'This is a description that needs to be at least 20 chars long');
  await userEvent.type(screen.getByLabelText(/requirements/i), 'Req 1\nReq 2\nReq 3');

  const submitBtn = screen.getByRole('button', { name: /publish job/i });
  await userEvent.click(submitBtn);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('Senior Dev')
    }));
  });
});

