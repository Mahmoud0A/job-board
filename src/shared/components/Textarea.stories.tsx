import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Shared/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Description: Story = {
  args: {
    label: "Description",
    placeholder: "Describe the role, the team, and what makes this opportunity exciting.",
    rows: 6,
    required: true,
  },
};

export const RequirementsWithHint: Story = {
  args: {
    label: "Requirements",
    rows: 5,
    hint: "Write one requirement per line.",
    defaultValue: "3+ years of React experience\nStrong TypeScript",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    required: true,
    error: "Description should be at least 40 characters",
    defaultValue: "Too short",
  },
};
