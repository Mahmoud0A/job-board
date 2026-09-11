import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/shared/components/Navbar";

export const metadata: Metadata = {
  title: "Scalable Job Board",
  description:
    "A modern job board built with Next.js, TypeScript, and feature-based architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "32px 0",
            marginTop: "64px",
            color: "var(--color-text-muted)",
            fontSize: 14,
          }}
        >
          <div className="container row" style={{ justifyContent: "space-between" }}>
            <span>© {new Date().getFullYear()} Scalable Job Board</span>
            <span>Built with Next.js · TypeScript · Feature-Based Architecture</span>
          </div>
        </footer>
      </body>
    </html>
  );
}