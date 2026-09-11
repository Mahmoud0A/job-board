import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi, beforeEach } from 'vitest';
import { SaveJobButton } from '../SaveJobButton';
import { useSavedJobsStore } from '../../store/savedJobsStore';

beforeEach(() => {
  // Clear zustand store before each test
  useSavedJobsStore.setState({ ids: [] });
});

test('Save a job', async () => {
  render(<SaveJobButton jobId="job-1" />);

  const button = screen.getByRole('button', { name: 'Save job' });
  expect(button).toBeInTheDocument();
  
  await userEvent.click(button);

  // Button text should change
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Unsave job' })).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  // Store should contain the jobId
  expect(useSavedJobsStore.getState().ids).toContain('job-1');
});

test('Unsave a job', async () => {
  // Setup: already saved
  useSavedJobsStore.setState({ ids: ['job-1'] });

  render(<SaveJobButton jobId="job-1" />);

  const button = screen.getByRole('button', { name: 'Unsave job' });
  await userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Save job' })).toBeInTheDocument();
    expect(screen.getByText('Save Job')).toBeInTheDocument();
  });

  expect(useSavedJobsStore.getState().ids).not.toContain('job-1');
});

