import type { Metadata } from "next";
import { SavedJobsList } from "@/features/saved-jobs/components/SavedJobsList";

export const metadata: Metadata = {
  title: "Saved Jobs · JobBoard",
  description: "Jobs you saved for later.",
};

export default function SavedJobsPage() {
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
        <h1>Saved jobs</h1>
        <p className="muted" style={{ fontSize: 15, margin: 0 }}>
          Your shortlist. Saved jobs live in your browser and stay available
          across sessions.
        </p>
      </header>

      <SavedJobsList />
    </div>
  );
}