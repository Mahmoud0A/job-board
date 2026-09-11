"use client";

import Link from "next/link";
import type { Job } from "../types/job";
import { Badge } from "@/shared/components/Badge";
import { Card } from "@/shared/components/Card";
import { formatRelative } from "@/shared/utils/formatDate";
import { localizedCategoryLabel, localizedEmploymentTypeLabel } from "@/i18n/labels";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SaveJobButton } from "@/features/saved-jobs/components/SaveJobButton";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { lang, t } = useLanguage();

  return (
    <Card
      as="article"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          flexWrap: "wrap",
        }}
      >
        <div className="stack-1" style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: 0, wordBreak: "break-word" }}>
            <Link
              href={`/jobs/${job.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {job.title}
            </Link>
          </h3>
          <p className="muted" style={{ fontSize: 14 }}>
            {job.company} · {job.location}
            {job.remote && (
              <>
                {" "}
                <span style={{ color: "var(--color-text-subtle)" }}>
                  · {t("jobCard.remote")}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="row" style={{ flexWrap: "wrap", gap: "var(--space-2)" }}>
          <Badge tone="accent">{localizedCategoryLabel(job.category, lang)}</Badge>
          <Badge>{localizedEmploymentTypeLabel(job.employmentType, lang)}</Badge>
        </div>
      </header>

      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: 14,
          lineHeight: 1.55,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {job.description}
      </p>

      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          flexWrap: "wrap",
          paddingTop: "var(--space-3)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="row" style={{ flexWrap: "wrap" }}>
          {job.salary && (
            <span style={{ fontSize: 14, fontWeight: 500 }}>
              {job.salary}
            </span>
          )}
          <span style={{ fontSize: 13, color: "var(--color-text-subtle)" }}>
            {t("jobCard.posted", { relative: formatRelative(job.postedAt, lang) })}
          </span>
        </div>

        <div className="row" style={{ flexWrap: "wrap" }}>
          <SaveJobButton jobId={job.id} size="sm" />
          <Link
            href={`/jobs/${job.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "var(--touch-target, 36px)",
              padding: "0 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-strong)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {t("jobCard.viewDetails")}
          </Link>
        </div>
      </footer>
    </Card>
  );
}
