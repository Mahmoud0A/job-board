"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSavedJobsStore } from "../store/savedJobsStore";
import type { Job } from "@/features/jobs/types/job";
import { JobCard } from "@/features/jobs/components/JobCard";
import { EmptyState } from "@/shared/components/EmptyState";
import { JobListSkeleton } from "@/features/jobs/components/JobListSkeleton";
import { useLanguage } from "@/i18n/LanguageProvider";

export function SavedJobsList() {
  const ids = useSavedJobsStore((state) => state.ids);
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) {
      setJobs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    Promise.all(
      ids.map((id) =>
        fetch(`/api/jobs/${id}`).then(async (res) => {
          if (res.status === 404) return null; // stale ID — skip gracefully
          if (!res.ok) throw new Error(`Failed to load ${id}`);
          return res.json() as Promise<Job>;
        })
      )
    )
      .then((results) => {
        if (!cancelled) {
          const validJobs = results.filter((r): r is Job => r !== null);
          setJobs(validJobs);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(t("saved.loadError"));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [ids, t]);

  if (ids.length === 0) {
    return (
      <EmptyState
        title={t("saved.emptyTitle")}
        description={t("saved.emptyDescription")}
        action={
          <Link
            href="/jobs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "var(--touch-target, 44px)",
              padding: "0 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {t("saved.browseJobs")}
          </Link>
        }
      />
    );
  }

  if (loading) return <JobListSkeleton count={Math.min(ids.length, 4)} />;

  if (error) {
    return <EmptyState title={t("saved.errorTitle")} description={error} />;
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title={t("saved.missingTitle")}
        description={t("saved.missingDescription")}
      />
    );
  }

  return (
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
  );
}
