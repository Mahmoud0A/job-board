import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";
import { JobListSkeleton } from "@/features/jobs/components/JobListSkeleton";

const meta: Meta<typeof EmptyState> = {
  title: "Shared/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoResults: Story = {
  args: {
    title: "No jobs match your filters",
    description: "Try removing a filter or broadening your search.",
    action: <Button variant="secondary">Clear filters</Button>,
  },
};

export const NoSavedJobs: Story = {
  args: {
    title: "No saved jobs yet",
    description: "Save a job from the listing or detail page and it will show up here.",
  },
};

export const LoadingList: StoryObj = {
  render: () => <JobListSkeleton count={3} />,
};
