import Link from "next/link";
import { jobsService } from "@/features/jobs/services/jobsService";
import { Badge } from "@/shared/components/Badge";
import { PostedLine } from "@/i18n/Label";
import { T } from "@/i18n/LanguageProvider";
import { JobCategoryLabel, EmploymentTypeLabel } from "@/i18n/Label";

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
          <Badge tone="accent">
            <T k="home.badge" />
          </Badge>
          <h1 style={{ fontSize: 40, lineHeight: 1.1 }}>
            <T k="home.title" />
          </h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 600 }}>
            <T k="home.description" />
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
              <T k="home.browseAll" />
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
              <T k="home.postJob" />
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
              <T k="home.openRoles" />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong style={{ color: "var(--color-text)" }}>{companiesCount}</strong>{" "}
              <T k="home.companies" />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong style={{ color: "var(--color-text)" }}>{categoriesCount}</strong>{" "}
              <T k="home.categories" />
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
          <h2>
            <T k="home.latestRoles" />
          </h2>
          <Link href="/jobs" className="muted" style={{ fontSize: 14 }}>
            <T k="home.seeAll" /> <ArrowIcon />
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
                  <Badge tone="accent">
                    <JobCategoryLabel value={job.category} />
                  </Badge>
                  <Badge>
                    <EmploymentTypeLabel value={job.employmentType} />
                  </Badge>
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
                  <PostedLine value={job.postedAt} />
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ArrowIcon() {
  return (
    <span aria-hidden="true" className="directional-arrow">
      →
    </span>
  );
}
