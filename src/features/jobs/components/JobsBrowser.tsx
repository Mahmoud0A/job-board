"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { Job, JobsQuery } from "../types/job";
import { JobFilters } from "./JobFilters";
import { JobResults } from "./JobResults";
import { JobListSkeleton } from "./JobListSkeleton";
import { EmptyState } from "@/shared/components/EmptyState";

interface JobsBrowserProps {
  initialJobs: Job[];
  initialTotal: number;
  initialQuery: JobsQuery;
}

function hasActiveFilters(query: JobsQuery): boolean {
  return Boolean(
    query.search ||
      query.location ||
      (query.category && query.category !== "all") ||
      (query.employmentType && query.employmentType !== "all") ||
      query.remote
  );
}

export function JobsBrowser({
  initialJobs,
  initialTotal,
  initialQuery,
}: JobsBrowserProps) {
  const [query, setQuery] = useState<JobsQuery>(initialQuery);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [total, setTotal] = useState(initialTotal);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const lastFetchedQueryRef = useRef<JobsQuery | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize query from URL params on mount (after initial server render).
  useEffect(() => {
    const urlQuery: JobsQuery = {
      search: searchParams.get("search") ?? undefined,
      location: searchParams.get("location") ?? undefined,
      category: (searchParams.get("category") as any) ?? "all",
      employmentType: (searchParams.get("employmentType") as any) ?? "all",
      remote: searchParams.get("remote") === "true" ? true : undefined,
      sort: (searchParams.get("sort") as any) ?? "newest",
    };
    const hasUrlFilters =
      urlQuery.search ||
      urlQuery.location ||
      urlQuery.category !== "all" ||
      urlQuery.employmentType !== "all" ||
      urlQuery.remote ||
      urlQuery.sort !== "newest";
    if (hasUrlFilters) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Sync query changes back to URL.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.search) params.set("search", query.search);
    if (query.location) params.set("location", query.location);
    if (query.category && query.category !== "all")
      params.set("category", query.category);
    if (query.employmentType && query.employmentType !== "all")
      params.set("employmentType", query.employmentType);
    if (query.remote) params.set("remote", "true");
    if (query.sort && query.sort !== "newest")
      params.set("sort", query.sort);

    const urlString = params.toString();
    const newUrl = urlString ? `/jobs?${urlString}` : "/jobs";
    router.replace(newUrl, { scroll: false });
  }, [query, router]);

  useEffect(() => {
    // Skip the first render only — initial jobs are already provided by the server.
    const isFirstRun = lastFetchedQueryRef.current === null;
    lastFetchedQueryRef.current = query;

    if (isFirstRun) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams();
    if (query.search) params.set("search", query.search);
    if (query.location) params.set("location", query.location);
    if (query.category && query.category !== "all")
      params.set("category", query.category);
    if (query.employmentType && query.employmentType !== "all")
      params.set("employmentType", query.employmentType);
    if (query.remote) params.set("remote", "true");
    if (query.sort) params.set("sort", query.sort);

    startTransition(async () => {
      try {
        setError(null);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const res = await fetch(`${baseUrl}/jobs?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load jobs");
        const data: { jobs: Job[]; total: number } = await res.json();
        setJobs(data.jobs);
        setTotal(data.total);
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") return;
        setError("We couldn't load jobs. Please try again.");
      }
    });

    return () => controller.abort();
  }, [query]);

  const active = useMemo(() => hasActiveFilters(query), [query]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description={error}
        action={
          <button
            type="button"
            onClick={() => {
              setError(null);
              // Re-trigger the fetch by cloning the query object.
              setQuery((q) => ({ ...q }));
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "var(--touch-target)",
              padding: "0 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Try again
          </button>
        }
      />
    );
  }

  return (
    <div className="layout-sidebar-left">
      <div className="stack-3">
        {/* Mobile toggle button for filters */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          aria-expanded={isFiltersOpen}
          aria-controls="jobs-filter-sidebar"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "var(--touch-target)",
            padding: "0 16px",
            borderRadius: "var(--radius-md)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            fontWeight: 500,
            cursor: "pointer",
            width: "100%",
          }}
        >
          <span>Filters {active && " (Active)"}</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isFiltersOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <aside 
          id="jobs-filter-sidebar"
          aria-label="Filters" 
          className={`filter-sidebar ${isFiltersOpen ? "open" : ""}`}
        >
          <JobFilters
            query={query}
            onChange={setQuery}
            onReset={() =>
              setQuery({ sort: "newest" })
            }
          />
        </aside>
      </div>
      <JobResults
        jobs={jobs}
        total={total}
        hasActiveFilters={active}
        onClearFilters={() => setQuery({ sort: "newest" })}
      />
    </div>
  );
}

export function JobsBrowserSkeleton() {
  return (
    <div className="layout-sidebar-left">
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
        aria-hidden="true"
        className="filter-sidebar"
      >
        <div className="skeleton" style={{ height: 40 }} />
        <div className="skeleton" style={{ height: 40 }} />
        <div className="skeleton" style={{ height: 40 }} />
        <div className="skeleton" style={{ height: 40 }} />
      </div>
      <JobListSkeleton count={4} />
    </div>
  );
}