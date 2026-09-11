import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, id, options, placeholder, ...rest },
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
      <select
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${inputId}-error`} style={{ fontSize: 13, color: "var(--color-danger)" }} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{hint}</p>
      ) : null}
    </div>
  );
});