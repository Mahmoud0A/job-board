"use client";

import type { Job } from "../types/job";
import { JobCard } from "./JobCard";
import { EmptyState } from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/Button";
import { useLanguage } from "@/i18n/LanguageProvider";

interface JobResultsProps {
  jobs: Job[];
  total: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function JobResults({
  jobs,
  total,
  hasActiveFilters,
  onClearFilters,
}: JobResultsProps) {
  const { t } = useLanguage();

  if (jobs.length === 0) {
    return (
      <EmptyState
        title={t(hasActiveFilters ? "results.noMatchTitle" : "results.noJobsTitle")}
        description={t(
          hasActiveFilters
            ? "results.noMatchDescription"
            : "results.noJobsDescription"
        )}
        action={
          hasActiveFilters ? (
            <Button variant="secondary" onClick={onClearFilters}>
              {t("filters.clear")}
            </Button>
          ) : null
        }
      />
    );
  }

  return (
    <section
      aria-label={t("results.resultsLabel")}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
    >
      <p
        className="muted"
        style={{ fontSize: 14, margin: 0 }}
        aria-live="polite"
      >
        {t("results.showing", { shown: jobs.length, total })}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  );
}
