import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/shared/utils/cx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: "var(--radius-md)",
  fontWeight: 500,
  transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  whiteSpace: "nowrap",
};

function variantStyles(variant: Variant): React.CSSProperties {
  switch (variant) {
    case "primary":
      return {
        background: "var(--color-accent)",
        color: "#fff",
      };
    case "secondary":
      return {
        background: "var(--color-surface)",
        color: "var(--color-text)",
        borderColor: "var(--color-border-strong)",
      };
    case "ghost":
      return {
        background: "transparent",
        color: "var(--color-text)",
        borderColor: "transparent",
      };
    case "danger":
      return {
        background: "var(--color-danger-soft)",
        color: "var(--color-danger)",
        borderColor: "transparent",
      };
  }
}

function sizeStyles(size: Size): React.CSSProperties {
  return size === "sm"
    ? { minHeight: "var(--touch-target, 36px)", padding: "0 12px", fontSize: 13 }
    : { minHeight: "var(--touch-target, 44px)", padding: "0 16px", fontSize: 14 };
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", fullWidth, className, style, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cx(className)}
        style={{
          ...baseStyle,
          ...variantStyles(variant),
          ...sizeStyles(size),
          ...(fullWidth ? { width: "100%" } : null),
          ...style,
        }}
        {...rest}
      />
    );
  }
);