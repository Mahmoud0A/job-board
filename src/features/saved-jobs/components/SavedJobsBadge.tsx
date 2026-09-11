"use client";

import { useSavedJobsStore } from "../store/savedJobsStore";

export function SavedJobsBadge() {
  const count = useSavedJobsStore((state) => state.ids.length);
  if (count === 0) return null;
  return (
    <span
      aria-label={`${count} saved jobs`}
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