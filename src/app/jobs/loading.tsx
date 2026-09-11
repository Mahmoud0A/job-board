import { JobsBrowserSkeleton } from "@/features/jobs/components/JobsBrowser";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <header style={{ marginBottom: "var(--space-6)" }}>
        <h1>Browse jobs</h1>
        <p className="muted" style={{ fontSize: 15 }}>
          Discover open roles across product teams.
        </p>
      </header>
      <JobsBrowserSkeleton />
    </div>
  );
}