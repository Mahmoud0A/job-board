"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SavedJobsBadge } from "@/features/saved-jobs/components/SavedJobsBadge";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.brand} aria-label={t("nav.home")}>
            <span className={styles.brandMark} aria-hidden="true">
              ◆
            </span>
            <span>JobBoard</span>
          </Link>
          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={t("nav.toggle")}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`} aria-label="Primary">
          <Link href="/jobs" className={styles.link}>
            {t("nav.browse")}
          </Link>
          <Link href="/saved-jobs" className={styles.link} aria-label={t("nav.saved")}>
            <span className={styles.linkText}>{t("nav.saved")}</span>
            <SavedJobsBadge />
          </Link>
          <Link href="/jobs/create" className={styles.link}>
            {t("nav.post")}
          </Link>
          <Link href="/about" className={styles.link}>
            {t("nav.about")}
          </Link>
          <span className={styles.switcher}>
            <LanguageSwitcher />
          </span>
        </nav>
      </div>
    </header>
  );
}
