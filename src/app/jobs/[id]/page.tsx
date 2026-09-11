import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { jobsService } from "@/features/jobs/services/jobsService";
import { Badge } from "@/shared/components/Badge";
import { Card } from "@/shared/components/Card";
import { SaveJobButton } from "@/features/saved-jobs/components/SaveJobButton";
import { T } from "@/i18n/LanguageProvider";
import {
  EmploymentTypeLabel,
  JobCategoryLabel,
  PostedStamp,
} from "@/i18n/Label";

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
          <span aria-hidden="true" className="directional-arrow-back">
            ←
          </span>{" "}
          <T k="detail.back" />
        </Link>
      </nav>

      <article className="layout-sidebar-right">
        <div className="stack-6">
          <header className="stack-3">
            <div className="row" style={{ flexWrap: "wrap", gap: "var(--space-2)" }}>
              <Badge tone="accent">
                <JobCategoryLabel value={job.category} />
              </Badge>
              <Badge>
                <EmploymentTypeLabel value={job.employmentType} />
              </Badge>
              {job.remote && (
                <Badge tone="success">
                  <T k="detail.remoteFriendly" />
                </Badge>
              )}
            </div>
            <h1 style={{ margin: 0, wordBreak: "break-word" }}>{job.title}</h1>
            <p className="muted" style={{ fontSize: 16, margin: 0 }}>
              {job.company} · {job.location}
            </p>
            <p style={{ fontSize: 13, color: "var(--color-text-subtle)" }}>
              <PostedStamp value={job.postedAt} />
            </p>
          </header>

          <Card>
            <h2 style={{ marginBottom: "var(--space-3)" }}>
              <T k="detail.aboutRole" />
            </h2>
            <p style={{ whiteSpace: "pre-line", margin: 0, wordBreak: "break-word" }}>{job.description}</p>
          </Card>

          <Card>
            <h2 style={{ marginBottom: "var(--space-3)" }}>
              <T k="detail.requirements" />
            </h2>
            <ul className="detail-list">
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
                  <T k="detail.compensation" />
                </span>
                <span style={{ fontWeight: 500 }}>
                  {job.salary ?? <T k="detail.notSpecified" />}
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
