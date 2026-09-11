import type { Metadata } from "next";
import { SavedJobsList } from "@/features/saved-jobs/components/SavedJobsList";
import { T } from "@/i18n/LanguageProvider";

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
        <h1>
          <T k="saved.title" />
        </h1>
        <p className="muted" style={{ fontSize: 15, margin: 0 }}>
          <T k="saved.description" />
        </p>
      </header>

      <SavedJobsList />
    </div>
  );
}
