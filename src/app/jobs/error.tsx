"use client";

import { useEffect } from "react";
import { EmptyState } from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/Button";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function JobsError({ error, reset }: ErrorProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log to your error reporting service in a real app.
    console.error("Jobs error boundary:", error);
  }, [error]);

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <EmptyState
        title={t("errors.jobsTitle")}
        description={t("errors.jobsDescription")}
        action={
          <Button onClick={reset} variant="primary">
            {t("errors.tryAgain")}
          </Button>
        }
      />
    </div>
  );
}
