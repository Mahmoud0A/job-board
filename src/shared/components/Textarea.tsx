import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, id, ...rest }, ref) {
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
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "12px",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border-strong)"}`,
            background: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: 14,
            fontFamily: "inherit",
            resize: "vertical",
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
  }
);