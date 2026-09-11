import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi, beforeEach } from 'vitest';
import { JobsBrowser } from '../JobsBrowser';

const mockJobs = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Lumen Labs",
    location: "Istanbul",
    remote: true,
    employmentType: "full-time",
    category: "engineering",
    description: "React role",
    requirements: ["React"],
    postedAt: "2026-08-22T09:00:00Z",
  },
  {
    id: "job-2",
    title: "Product Designer",
    company: "Northwind",
    location: "Berlin",
    remote: false,
    employmentType: "full-time",
    category: "design",
    description: "Design role",
    requirements: ["Figma"],
    postedAt: "2026-08-20T09:00:00Z",
  }
];

beforeEach(() => {
  global.fetch = vi.fn();
});

test('Search by title filters jobs', async () => {
  // Mock fetch response for the search query
  vi.mocked(global.fetch).mockResolvedValue({
    ok: true,
    json: async () => ({ jobs: [mockJobs[0]], total: 1 }),
  } as any);

  render(<JobsBrowser initialJobs={mockJobs as any} initialTotal={2} initialQuery={{}} />);

  // Initial state should show both mock jobs
  expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
  expect(screen.getByText(/Product Designer/i)).toBeInTheDocument();

  // Act: Type into the search input
  const searchInput = screen.getByLabelText('Keyword');
  await userEvent.type(searchInput, 'Senior');

  // Assert: Wait for fetch to be called and results to update
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('search=Senior'), expect.any(Object));
  });

  // Since we mocked fetch to return just job-1, job-2 should disappear
  await waitFor(() => {
    expect(screen.queryByText(/Product Designer/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
  });
});

test('Category filtering updates results', async () => {
  vi.mocked(global.fetch).mockResolvedValue({
    ok: true,
    json: async () => ({ jobs: [mockJobs[1]], total: 1 }),
  } as any);

  render(<JobsBrowser initialJobs={mockJobs as any} initialTotal={2} initialQuery={{}} />);

  const categorySelect = screen.getByLabelText('Category');
  await userEvent.selectOptions(categorySelect, 'design');

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('category=design'), expect.any(Object));
  });

  await waitFor(() => {
    expect(screen.queryByText(/Senior Frontend Engineer/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Product Designer/i)).toBeInTheDocument();
  });
});

test('Search + filter together updates results', async () => {
  vi.mocked(global.fetch).mockResolvedValue({
    ok: true,
    json: async () => ({ jobs: [], total: 0 }),
  } as any);

  render(<JobsBrowser initialJobs={mockJobs as any} initialTotal={2} initialQuery={{}} />);

  const searchInput = screen.getByLabelText('Keyword');
  await userEvent.type(searchInput, 'Nothing');

  const categorySelect = screen.getByLabelText('Category');
  await userEvent.selectOptions(categorySelect, 'sales');

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('search=Nothing'), expect.any(Object));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('category=sales'), expect.any(Object));
  });

  // Empty state should appear
  await waitFor(() => {
    expect(screen.getByText(/No jobs match your filters/i)).toBeInTheDocument();
  });
});
