"use client";

import { useEffect } from "react";
import { EmptyState } from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/Button";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <EmptyState
        title={t("errors.globalTitle")}
        description={t("errors.globalDescription")}
        action={
          <Button onClick={reset} variant="primary">
            {t("errors.tryAgain")}
          </Button>
        }
      />
    </div>
  );
}
