"use client";

import { useEffect } from "react";
import { EmptyState } from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <EmptyState
        title="Something went wrong"
        description="Please try again. If the issue persists, refresh the page."
        action={
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
        }
      />
    </div>
  );
}