"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SavedJobsBadge } from "@/features/saved-jobs/components/SavedJobsBadge";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.brand} aria-label="Home">
            <span className={styles.brandMark} aria-hidden="true">
              ◆
            </span>
            <span>JobBoard</span>
          </Link>
          <button 
            className={styles.menuToggle} 
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
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
            Browse Jobs
          </Link>
          <Link href="/saved-jobs" className={styles.link} aria-label="Saved jobs">
            <span className={styles.linkText}>Saved</span>
            <SavedJobsBadge />
          </Link>
          <Link href="/jobs/create" className={styles.link}>
            Post a Job
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}