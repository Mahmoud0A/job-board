import { Skeleton } from "@/shared/components/Skeleton";
import { Card } from "@/shared/components/Card";

export function JobListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <Card>
            <div className="stack-3">
              <Skeleton width="60%" height={22} />
              <Skeleton width="40%" height={14} />
              <Skeleton height={14} />
              <Skeleton height={14} width="90%" />
              <div className="row" style={{ marginTop: 8 }}>
                <Skeleton width={80} height={22} radius={999} />
                <Skeleton width={90} height={22} radius={999} />
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}