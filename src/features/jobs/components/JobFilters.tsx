"use client";

import { useId } from "react";
import type { JobsQuery, JobCategory, EmploymentType } from "../types/job";
import {
  EMPLOYMENT_TYPES,
  JOB_CATEGORIES,
} from "../types/constants";
import { Input } from "@/shared/components/Input";
import { Select } from "@/shared/components/Select";
import { Button } from "@/shared/components/Button";

interface JobFiltersProps {
  query: JobsQuery;
  onChange: (next: JobsQuery) => void;
  onReset: () => void;
}

export function JobFilters({ query, onChange, onReset }: JobFiltersProps) {
  const searchId = useId();
  const locationId = useId();

  const categoryOptions = [
    { value: "all", label: "All categories" },
    ...JOB_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
  ];

  const employmentOptions = [
    { value: "all", label: "All types" },
    ...EMPLOYMENT_TYPES.map((t) => ({ value: t.value, label: t.label })),
  ];

  const sortOptions = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
  ];

  return (
    <form
      role="search"
      aria-label="Filter jobs"
      onSubmit={(e) => e.preventDefault()}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      <Input
        id={searchId}
        label="Keyword"
        placeholder="Search title, company, skill…"
        value={query.search ?? ""}
        onChange={(e) =>
          onChange({ ...query, search: e.target.value || undefined })
        }
      />
      <Input
        id={locationId}
        label="Location"
        placeholder="City or country"
        value={query.location ?? ""}
        onChange={(e) =>
          onChange({ ...query, location: e.target.value || undefined })
        }
      />
      <Select
        label="Category"
        options={categoryOptions}
        value={(query.category as string) ?? "all"}
        onChange={(e) =>
          onChange({
            ...query,
            category: e.target.value as JobCategory | "all",
          })
        }
      />
      <Select
        label="Employment type"
        options={employmentOptions}
        value={(query.employmentType as string) ?? "all"}
        onChange={(e) =>
          onChange({
            ...query,
            employmentType: e.target.value as EmploymentType | "all",
          })
        }
      />
      <Select
        label="Sort"
        options={sortOptions}
        value={query.sort ?? "newest"}
        onChange={(e) =>
          onChange({
            ...query,
            sort: e.target.value as JobsQuery["sort"],
          })
        }
      />

      <label
        className="row"
        style={{
          fontSize: 14,
          color: "var(--color-text)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={Boolean(query.remote)}
          onChange={(e) =>
            onChange({ ...query, remote: e.target.checked || undefined })
          }
        />
        <span>Remote only</span>
      </label>

      <div className="row" style={{ justifyContent: "flex-end" }}>
        <Button type="button" variant="ghost" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </form>
  );
}