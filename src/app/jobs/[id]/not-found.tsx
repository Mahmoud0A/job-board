import Link from "next/link";
import { EmptyState } from "@/shared/components/EmptyState";

export default function JobNotFound() {
  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <EmptyState
        title="Job not found"
        description="The role you're looking for may have been filled or removed."
        action={
          <Link
            href="/jobs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 40,
              padding: "0 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Back to all jobs
          </Link>
        }
      />
    </div>
  );
}