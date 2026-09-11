import type { Job } from "../types/job";
import { JobCard } from "./JobCard";
import { EmptyState } from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/Button";

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
  if (jobs.length === 0) {
    return (
      <EmptyState
        title={hasActiveFilters ? "No jobs match your filters" : "No jobs yet"}
        description={
          hasActiveFilters
            ? "Try removing a filter or broadening your search."
            : "Check back soon — new opportunities are posted regularly."
        }
        action={
          hasActiveFilters ? (
            <Button variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          ) : null
        }
      />
    );
  }

  return (
    <section
      aria-label="Job results"
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
    >
      <p
        className="muted"
        style={{ fontSize: 14, margin: 0 }}
        aria-live="polite"
      >
        Showing {jobs.length} of {total}
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