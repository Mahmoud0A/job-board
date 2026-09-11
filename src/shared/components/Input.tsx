import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "@/shared/utils/cx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, ...rest },
  ref
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
    ? `${inputId}-hint`
    : undefined;

  return (
    <div className="stack-1">
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-text)",
          }}
        >
          {label}
          {rest.required && (
            <span style={{ color: "var(--color-danger)", marginLeft: 2 }} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={cx(className)}
        style={{
          width: "100%",
          minHeight: "var(--touch-target, 44px)",
          padding: "0 12px",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border-strong)"}`,
          background: "var(--color-surface)",
          color: "var(--color-text)",
          fontSize: 14,
        }}
        {...rest}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          style={{ fontSize: 13, color: "var(--color-danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${inputId}-hint`}
          style={{ fontSize: 13, color: "var(--color-text-muted)" }}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
});