import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi, beforeEach } from 'vitest';
import { SavedJobsList } from '../SavedJobsList';
import { useSavedJobsStore } from '../../store/savedJobsStore';

beforeEach(() => {
  useSavedJobsStore.setState({ ids: [] });
  global.fetch = vi.fn();
});

test('Empty Saved Jobs state', () => {
  render(<SavedJobsList />);
  expect(screen.getByText('No saved jobs yet')).toBeInTheDocument();
  expect(screen.getByText('Browse jobs')).toBeInTheDocument();
});

test('Saved Jobs page displays jobs', async () => {
  const mockJob = {
    id: "job-1",
    title: "Test Job",
    company: "Test Co",
    location: "Remote",
    remote: true,
    employmentType: "full-time",
    category: "engineering",
    description: "desc",
    requirements: [],
    postedAt: "2026-08-22T09:00:00Z",
  };

  useSavedJobsStore.setState({ ids: ['job-1'] });
  
  vi.mocked(global.fetch).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => mockJob,
  } as any);

  render(<SavedJobsList />);

  // Should show loading initially or fetch
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('/api/jobs/job-1');
  });

  await waitFor(() => {
    expect(screen.getByText(/Test Job/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Co/i)).toBeInTheDocument();
  });
});

