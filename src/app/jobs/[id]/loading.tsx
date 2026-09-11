import { Card } from "@/shared/components/Card";
import { Skeleton } from "@/shared/components/Skeleton";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "var(--space-8) 0" }}>
      <Skeleton width={140} height={14} style={{ marginBottom: "var(--space-4)" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 280px",
          gap: "var(--space-6)",
        }}
      >
        <div className="stack-6">
          <div className="stack-3">
            <Skeleton width="40%" height={20} />
            <Skeleton width="70%" height={36} />
            <Skeleton width="50%" height={16} />
          </div>
          <Card>
            <Skeleton width="40%" height={20} style={{ marginBottom: 12 }} />
            <Skeleton height={14} />
            <Skeleton height={14} width="95%" style={{ marginTop: 8 }} />
            <Skeleton height={14} width="85%" style={{ marginTop: 8 }} />
          </Card>
          <Card>
            <Skeleton width="40%" height={20} style={{ marginBottom: 12 }} />
            <Skeleton height={14} width="80%" />
            <Skeleton height={14} width="75%" style={{ marginTop: 8 }} />
          </Card>
        </div>
        <Card>
          <Skeleton height={14} width="50%" />
          <Skeleton height={36} style={{ marginTop: 12 }} />
        </Card>
      </div>
    </div>
  );
}