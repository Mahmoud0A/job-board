"use client";

import { useSavedJobsStore } from "../store/savedJobsStore";
import { Button } from "@/shared/components/Button";

interface SaveJobButtonProps {
  jobId: string;
  size?: "sm" | "md";
}

export function SaveJobButton({ jobId, size = "md" }: SaveJobButtonProps) {
  const isSaved = useSavedJobsStore((state) => state.ids.includes(jobId));
  const toggleJob = useSavedJobsStore((state) => state.toggleJob);

  return (
    <Button
      type="button"
      variant={isSaved ? "secondary" : "primary"}
      size={size}
      onClick={() => toggleJob(jobId)}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Unsave job" : "Save job"}
    >
      <span aria-hidden="true">{isSaved ? "★" : "☆"}</span>
      <span>{isSaved ? "Saved" : "Save Job"}</span>
    </Button>
  );
}