import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { jobsService } from "@/features/jobs/services/jobsService";
import { Badge } from "@/shared/components/Badge";
import { Card } from "@/shared/components/Card";
import { SaveJobButton } from "@/features/saved-jobs/components/SaveJobButton";
import { formatDate, formatRelative } from "@/shared/utils/formatDate";
import {
  employmentTypeLabel,
  jobCategoryLabel,
} from "@/features/jobs/types/constants";

interface Params {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const job = await jobsService.findById(params.id);
  if (!job) {
    return { title: "Job not found · JobBoard" };
  }
  return {
    title: `${job.title} · ${job.company} · JobBoard`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: Params) {
  const job = await jobsService.findById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-4)" }}>
        <Link href="/jobs" className="muted" style={{ fontSize: 14 }}>
          ← Back to all jobs
        </Link>
      </nav>

      <article className="layout-sidebar-right">
        <div className="stack-6">
          <header className="stack-3">
            <div className="row" style={{ flexWrap: "wrap", gap: "var(--space-2)" }}>
              <Badge tone="accent">{jobCategoryLabel(job.category)}</Badge>
              <Badge>{employmentTypeLabel(job.employmentType)}</Badge>
              {job.remote && <Badge tone="success">Remote friendly</Badge>}
            </div>
            <h1 style={{ margin: 0, wordBreak: "break-word" }}>{job.title}</h1>
            <p className="muted" style={{ fontSize: 16, margin: 0 }}>
              {job.company} · {job.location}
            </p>
            <p style={{ fontSize: 13, color: "var(--color-text-subtle)" }}>
              Posted {formatRelative(job.postedAt)} ({formatDate(job.postedAt)})
            </p>
          </header>

          <Card>
            <h2 style={{ marginBottom: "var(--space-3)" }}>About the role</h2>
            <p style={{ whiteSpace: "pre-line", margin: 0, wordBreak: "break-word" }}>{job.description}</p>
          </Card>

          <Card>
            <h2 style={{ marginBottom: "var(--space-3)" }}>Requirements</h2>
            <ul style={{ margin: 0, paddingLeft: "1.2em", lineHeight: 1.7, wordBreak: "break-word" }}>
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </Card>
        </div>

        <aside
          aria-label="Job actions"
          className="job-detail-aside"
          style={{
            position: "sticky",
            top: 88,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}
        >
          <Card>
            <div className="stack-3">
              <div className="stack-1">
                <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
                  Compensation
                </span>
                <span style={{ fontWeight: 500 }}>
                  {job.salary ?? "Not specified"}
                </span>
              </div>
              <SaveJobButton jobId={job.id} />
            </div>
          </Card>
        </aside>
      </article>
    </div>
  );
}