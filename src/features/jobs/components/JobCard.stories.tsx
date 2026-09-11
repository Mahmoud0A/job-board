import type { Meta, StoryObj } from "@storybook/react";
import { JobCard } from "./JobCard";
import { initialJobs } from "../data/jobs";

const meta: Meta<typeof JobCard> = {
  title: "Jobs/JobCard",
  component: JobCard,
};

export default meta;
type Story = StoryObj<typeof JobCard>;

export const Default: Story = {
  args: { job: initialJobs[0] },
};

export const WithoutSalary: Story = {
  args: {
    job: { ...initialJobs[1], salary: undefined },
  },
};

export const OnSite: Story = {
  args: {
    job: { ...initialJobs[1], remote: false },
  },
};

export const ArabicRTL: Story = {
  args: { job: initialJobs[0] },
  globals: { locale: "ar" },
};
