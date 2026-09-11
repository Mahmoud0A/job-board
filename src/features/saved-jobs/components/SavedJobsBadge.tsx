"use client";

import { useSavedJobsStore } from "../store/savedJobsStore";
import { useLanguage } from "@/i18n/LanguageProvider";

export function SavedJobsBadge() {
  const count = useSavedJobsStore((state) => state.ids.length);
  const { t } = useLanguage();
  if (count === 0) return null;
  return (
    <span
      aria-label={t("nav.savedBadge", { count })}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 20,
        padding: "0 6px",
        borderRadius: 999,
        background: "var(--color-accent)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {count}
    </span>
  );
}
