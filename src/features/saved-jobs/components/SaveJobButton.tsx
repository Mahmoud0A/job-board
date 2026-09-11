"use client";

import { useSavedJobsStore } from "../store/savedJobsStore";
import { Button } from "@/shared/components/Button";
import { useLanguage } from "@/i18n/LanguageProvider";

interface SaveJobButtonProps {
  jobId: string;
  size?: "sm" | "md";
}

export function SaveJobButton({ jobId, size = "md" }: SaveJobButtonProps) {
  const isSaved = useSavedJobsStore((state) => state.ids.includes(jobId));
  const toggleJob = useSavedJobsStore((state) => state.toggleJob);
  const { t } = useLanguage();

  return (
    <Button
      type="button"
      variant={isSaved ? "secondary" : "primary"}
      size={size}
      onClick={() => toggleJob(jobId)}
      aria-pressed={isSaved}
      aria-label={t(isSaved ? "saveJob.unsaveLabel" : "saveJob.saveLabel")}
    >
      <span aria-hidden="true">{isSaved ? "★" : "☆"}</span>
      <span>{t(isSaved ? "saveJob.saved" : "saveJob.save")}</span>
    </Button>
  );
}
