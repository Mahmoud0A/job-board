"use client";

import { useId } from "react";
import type { JobsQuery, JobCategory, EmploymentType } from "../types/job";
import {
  EMPLOYMENT_TYPES,
  JOB_CATEGORIES,
} from "../types/constants";
import { localizedCategoryLabel, localizedEmploymentTypeLabel } from "@/i18n/labels";
import { useLanguage } from "@/i18n/LanguageProvider";
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
  const { lang, t } = useLanguage();

  const categoryOptions = [
    { value: "all", label: t("filters.allCategories") },
    ...JOB_CATEGORIES.map((c) => ({
      value: c.value,
      label: localizedCategoryLabel(c.value, lang),
    })),
  ];

  const employmentOptions = [
    { value: "all", label: t("filters.allTypes") },
    ...EMPLOYMENT_TYPES.map((emp) => ({
      value: emp.value,
      label: localizedEmploymentTypeLabel(emp.value, lang),
    })),
  ];

  const sortOptions = [
    { value: "newest", label: t("filters.newest") },
    { value: "oldest", label: t("filters.oldest") },
  ];

  return (
    <form
      role="search"
      aria-label={t("filters.title")}
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
        label={t("filters.keyword")}
        placeholder={t("filters.keywordPlaceholder")}
        value={query.search ?? ""}
        onChange={(e) =>
          onChange({ ...query, search: e.target.value || undefined })
        }
      />
      <Input
        id={locationId}
        label={t("filters.location")}
        placeholder={t("filters.locationPlaceholder")}
        value={query.location ?? ""}
        onChange={(e) =>
          onChange({ ...query, location: e.target.value || undefined })
        }
      />
      <Select
        label={t("filters.category")}
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
        label={t("filters.employmentType")}
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
        label={t("filters.sort")}
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
        <span>{t("filters.remoteOnly")}</span>
      </label>

      <div className="row" style={{ justifyContent: "flex-end" }}>
        <Button type="button" variant="ghost" onClick={onReset}>
          {t("filters.clear")}
        </Button>
      </div>
    </form>
  );
}
