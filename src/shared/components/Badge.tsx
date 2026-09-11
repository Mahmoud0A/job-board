import type { CSSProperties } from "react";
import { cx } from "@/shared/utils/cx";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const tones: Record<Tone, CSSProperties> = {
  neutral: {
    background: "var(--color-surface-2)",
    color: "var(--color-text-muted)",
    borderColor: "var(--color-border)",
  },
  accent: {
    background: "var(--color-accent-soft)",
    color: "var(--color-accent)",
    borderColor: "transparent",
  },
  success: {
    background: "var(--color-success-soft)",
    color: "var(--color-success)",
    borderColor: "transparent",
  },
  warning: {
    background: "var(--color-warning-soft)",
    color: "var(--color-warning)",
    borderColor: "transparent",
  },
  danger: {
    background: "var(--color-danger-soft)",
    color: "var(--color-danger)",
    borderColor: "transparent",
  },
};

export function Badge({
  tone = "neutral",
  children,
  className,
  style,
}: BadgeProps) {
  return (
    <span
      className={cx(className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 22,
        padding: "0 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        border: "1px solid",
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}