import type { Meta, StoryObj } from "@storybook/react";
import { SaveJobButton } from "./SaveJobButton";
import { useSavedJobsStore } from "../store/savedJobsStore";
import { useEffect } from "react";

const meta: Meta<typeof SaveJobButton> = {
  title: "SavedJobs/SaveJobButton",
  component: SaveJobButton,
};

export default meta;
type Story = StoryObj<typeof SaveJobButton>;

function UnsavedStory() {
  const unsaveJob = useSavedJobsStore((state) => state.unsaveJob);
  useEffect(() => {
    unsaveJob("story-job-1");
  }, [unsaveJob]);
  return <SaveJobButton jobId="story-job-1" />;
}

function SavedStory() {
  const saveJob = useSavedJobsStore((state) => state.saveJob);
  useEffect(() => {
    saveJob("story-job-1");
  }, [saveJob]);
  return <SaveJobButton jobId="story-job-1" />;
}

export const Unsaved: Story = {
  render: () => <UnsavedStory />,
};

export const Saved: Story = {
  render: () => <SavedStory />,
};

export const ArabicRTL: Story = {
  render: () => <UnsavedStory />,
  globals: { locale: "ar" },
};
