import type { Metadata } from "next";
import { JobForm } from "@/features/job-posting/components/JobForm";

export const metadata: Metadata = {
  title: "Post a Job · JobBoard",
  description: "Publish a new role to the JobBoard.",
};

export default function CreateJobPage() {
  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <header
        style={{
          marginBottom: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          maxWidth: 640,
        }}
      >
        <h1>Post a new job</h1>
        <p className="muted" style={{ fontSize: 15, margin: 0 }}>
          Share the role with the community. All fields marked required must be
          filled in. Validation runs in the browser and on the server.
        </p>
      </header>

      <div style={{ maxWidth: 720 }}>
        <JobForm />
      </div>
    </div>
  );
}