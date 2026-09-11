import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      style={{
        textAlign: "center",
        padding: "48px 16px",
        border: "1px dashed var(--color-border-strong)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface)",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {description && (
        <p
          style={{
            color: "var(--color-text-muted)",
            maxWidth: 420,
            margin: "0 auto 16px",
          }}
        >
          {description}
        </p>
      )}
      {action}
    </div>
  );
}