"use client";

import Link from "next/link";
import { EmptyState } from "@/shared/components/EmptyState";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function JobNotFound() {
  const { t } = useLanguage();

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <EmptyState
        title={t("detail.notFoundTitle")}
        description={t("detail.notFoundDescription")}
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
            {t("detail.backToJobs")}
          </Link>
        }
      />
    </div>
  );
}
