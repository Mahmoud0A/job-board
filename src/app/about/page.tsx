import type { Metadata } from "next";
import { Card } from "@/shared/components/Card";

export const metadata: Metadata = {
  title: "About · JobBoard",
  description: "About this Scalable Job Board project.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <header style={{ marginBottom: "var(--space-6)" }}>
        <h1>About this project</h1>
        <p
          className="muted"
          style={{ fontSize: 16, maxWidth: 640, marginTop: "var(--space-2)" }}
        >
          A Session 5 hands-on project demonstrating scalable frontend
          architecture with Next.js.
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
          <h2>Stack</h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            Next.js (App Router), React, TypeScript, React Hook Form, Zod,
            Zustand. No Redux, no heavy UI library.
          </p>
        </Card>

        <Card>
          <h2>Architecture</h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            Feature-based folders. Server Components by default; Client
            Components only where interactivity is required.
          </p>
        </Card>

        <Card>
          <h2>Data</h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            Jobs are served by Next.js Route Handlers backed by an in-memory
            repository, swapping in a real DB later is a one-file change.
          </p>
        </Card>

        <Card>
          <h2>Forms</h2>
          <p className="muted" style={{ marginTop: "var(--space-2)" }}>
            Posting a job uses React Hook Form with a Zod schema for both
            in-browser and server-side validation.
          </p>
        </Card>
      </div>
    </div>
  );
}