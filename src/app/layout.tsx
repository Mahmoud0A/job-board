import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/shared/components/Navbar";
import { LanguageProvider, T } from "@/i18n/LanguageProvider";
import { LANGUAGE_STORAGE_KEY } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Scalable Job Board",
  description:
    "A modern job board built with Next.js, TypeScript, and feature-based architecture.",
};

// Runs before hydration so a persisted Arabic choice renders RTL immediately.
const dirInitScript = `(function(){try{var l=localStorage.getItem('${LANGUAGE_STORAGE_KEY}');var a=l==='ar';document.documentElement.lang=a?'ar':'en';document.documentElement.dir=a?'rtl':'ltr';}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: dirInitScript }} />
        <LanguageProvider>
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
              <span>
                <T k="footer.tagline" />
              </span>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
