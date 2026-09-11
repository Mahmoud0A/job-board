import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Job title", placeholder: "e.g. Senior Frontend Engineer" },
};

export const Required: Story = {
  args: {
    label: "Company",
    placeholder: "e.g. Lumen Labs",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Location",
    defaultValue: "X",
    error: "Location is required",
    required: true,
  },
};

export const Search: Story = {
  args: {
    label: "Keyword",
    type: "search",
    placeholder: "Search title, company, skill…",
  },
};
