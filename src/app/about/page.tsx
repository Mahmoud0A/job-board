import type { Metadata } from "next";
import { Card } from "@/shared/components/Card";
import { T } from "@/i18n/LanguageProvider";

export const metadata: Metadata = {
  title: "About · JobBoard",
  description: "About this Scalable Job Board project.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <header style={{ marginBottom: "var(--space-6)" }}>
        <h1>
          <T k="about.title" />
        </h1>
        <p
          className="muted"
          style={{ fontSize: 16, maxWidth: 640, marginTop: "var(--space-2)" }}
        >
          <T k="about.description" />
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        <Card>
          <h2>
            <T k="about.stackTitle" />
          </h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            <T k="about.stackBody" />
          </p>
        </Card>

        <Card>
          <h2>
            <T k="about.archTitle" />
          </h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            <T k="about.archBody" />
          </p>
        </Card>

        <Card>
          <h2>
            <T k="about.dataTitle" />
          </h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            <T k="about.dataBody" />
          </p>
        </Card>

        <Card>
          <h2>
            <T k="about.formsTitle" />
          </h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            <T k="about.formsBody" />
          </p>
        </Card>
      </div>
    </div>
  );
}
