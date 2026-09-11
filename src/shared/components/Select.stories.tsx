import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Shared/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Category: Story = {
  args: {
    label: "Category",
    defaultValue: "engineering",
    options: [
      { value: "all", label: "All categories" },
      { value: "engineering", label: "Engineering" },
      { value: "design", label: "Design" },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: "Employment type",
    required: true,
    error: "Required",
    options: [{ value: "all", label: "All types" }],
  },
};
