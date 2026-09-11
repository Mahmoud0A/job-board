import Link from "next/link";
import { jobsService } from "@/features/jobs/services/jobsService";
import { Badge } from "@/shared/components/Badge";
import { formatRelative } from "@/shared/utils/formatDate";
import {
  employmentTypeLabel,
  jobCategoryLabel,
} from "@/features/jobs/types/constants";

export default async function HomePage() {
  const { jobs } = await jobsService.list({ sort: "newest" });
  const featured = jobs.slice(0, 4);
  const categoriesCount = new Set(jobs.map((j) => j.category)).size;
  const companiesCount = new Set(jobs.map((j) => j.company)).size;

  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--color-accent-soft) 0%, var(--color-bg) 100%)",
          padding: "64px 0 48px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container stack-4" style={{ maxWidth: 760 }}>
          <Badge tone="accent">Session 5 · Feature-Based Architecture</Badge>
          <h1 style={{ fontSize: 40, lineHeight: 1.1 }}>
            A modern job board, built to teach architecture.
          </h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 600 }}>
            Browse curated roles, filter by keyword and category, save your
            favorites, and post a new opportunity — all backed by a clean
            Next.js App Router architecture with deliberate Server and Client
            component boundaries.
          </p>
          <div className="row" style={{ flexWrap: "wrap" }}>
            <Link
              href="/jobs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 44,
                padding: "0 20px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-accent)",
                color: "#fff",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Browse all jobs
            </Link>
            <Link
              href="/jobs/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 44,
                padding: "0 20px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border-strong)",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Post a job
            </Link>
          </div>

          <div
            className="row"
            style={{
              flexWrap: "wrap",
              paddingTop: "var(--space-4)",
              color: "var(--color-text-muted)",
              fontSize: 14,
            }}
          >
            <span>
              <strong style={{ color: "var(--color-text)" }}>{jobs.length}</strong>{" "}
              open roles
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong style={{ color: "var(--color-text)" }}>{companiesCount}</strong>{" "}
              companies
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong style={{ color: "var(--color-text)" }}>{categoriesCount}</strong>{" "}
              categories
            </span>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "var(--space-8) 0" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-4)",
            gap: "var(--space-3)",
          }}
        >
          <h2>Latest roles</h2>
          <Link href="/jobs" className="muted" style={{ fontSize: 14 }}>
            See all →
          </Link>
        </header>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-3)",
          }}
        >
          {featured.map((job) => (
            <li key={job.id}>
              <article
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-4)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                }}
              >
                <div className="row" style={{ flexWrap: "wrap" }}>
                  <Badge tone="accent">{jobCategoryLabel(job.category)}</Badge>
                  <Badge>{employmentTypeLabel(job.employmentType)}</Badge>
                </div>
                <h3 style={{ margin: 0 }}>
                  <Link
                    href={`/jobs/${job.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {job.title}
                  </Link>
                </h3>
                <p
                  className="muted"
                  style={{ margin: 0, fontSize: 14 }}
                >
                  {job.company} · {job.location}
                </p>
                <p
                  style={{
                    color: "var(--color-text-subtle)",
                    fontSize: 13,
                    margin: 0,
                  }}
                >
                  Posted {formatRelative(job.postedAt)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}