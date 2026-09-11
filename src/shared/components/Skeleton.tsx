import type { CSSProperties } from "react";
import { cx } from "@/shared/utils/cx";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  width = "100%",
  height = 16,
  radius = "var(--radius-sm)",
  className,
  style,
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cx("skeleton", className)}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}