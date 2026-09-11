import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { JobFilters } from "./JobFilters";
import type { JobsQuery } from "../types/job";

const meta: Meta<typeof JobFilters> = {
  title: "Jobs/JobFilters",
  component: JobFilters,
};

export default meta;
type Story = StoryObj<typeof JobFilters>;

function InteractiveFilters() {
  const [query, setQuery] = useState<JobsQuery>({ sort: "newest" });
  return (
    <div style={{ maxWidth: 320 }}>
      <JobFilters
        query={query}
        onChange={setQuery}
        onReset={() => setQuery({ sort: "newest" })}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <InteractiveFilters />,
};

export const WithActiveFilters: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <JobFilters
        query={{
          search: "engineer",
          location: "Istanbul",
          category: "engineering",
          employmentType: "full-time",
          remote: true,
          sort: "newest",
        }}
        onChange={() => undefined}
        onReset={() => undefined}
      />
    </div>
  ),
};

export const ArabicRTL: Story = {
  render: () => <InteractiveFilters />,
  globals: { locale: "ar" },
};
