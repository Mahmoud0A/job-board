import type { Metadata } from "next";
import { JobsBrowser } from "@/features/jobs/components/JobsBrowser";
import { jobsService } from "@/features/jobs/services/jobsService";
import { T } from "@/i18n/LanguageProvider";

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
        <h1>
          <T k="jobs.title" />
        </h1>
        <p className="muted" style={{ fontSize: 15, margin: 0 }}>
          <T k="jobs.description" />
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
