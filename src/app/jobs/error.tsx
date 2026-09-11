"use client";

import { useEffect } from "react";
import { EmptyState } from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function JobsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error reporting service in a real app.
    console.error("Jobs error boundary:", error);
  }, [error]);

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <EmptyState
        title="We couldn't load jobs"
        description="Something went wrong on our side. Please try again in a moment."
        action={
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
        }
      />
    </div>
  );
}