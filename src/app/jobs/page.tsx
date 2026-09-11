import type { Metadata } from "next";
import { JobsBrowser } from "@/features/jobs/components/JobsBrowser";
import { jobsService } from "@/features/jobs/services/jobsService";

export const metadata: Metadata = {
  title: "Browse Jobs · JobBoard",
  description: "Browse and filter open roles across engineering, design, and more.",
};

export default async function JobsPage() {
  // Server-side data fetch — no API round trip needed for the initial render.
  const { jobs, total } = await jobsService.list({ sort: "newest" });

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <header
        style={{
          marginBottom: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
        }}
      >
        <h1>Browse jobs</h1>
        <p className="muted" style={{ fontSize: 15, margin: 0 }}>
          Discover open roles across product teams. Use the filters to narrow
          down by keyword, location, category, or employment type.
        </p>
      </header>

      <JobsBrowser
        initialJobs={jobs}
        initialTotal={total}
        initialQuery={{ sort: "newest" }}
      />
    </div>
  );
}