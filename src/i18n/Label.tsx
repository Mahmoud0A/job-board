"use client";

import { formatDate, formatRelative } from "@/shared/utils/formatDate";
import { localizedCategoryLabel, localizedEmploymentTypeLabel } from "./labels";
import { useLanguage } from "./LanguageProvider";
import type {
  EmploymentType,
  JobCategory,
} from "@/features/jobs/types/job";

/** Localized job-category label leaf for Server Components. */
export function JobCategoryLabel({ value }: { value: JobCategory }) {
  const { lang } = useLanguage();
  return <>{localizedCategoryLabel(value, lang)}</>;
}

/** Localized employment-type label leaf for Server Components. */
export function EmploymentTypeLabel({ value }: { value: EmploymentType }) {
  const { lang } = useLanguage();
  return <>{localizedEmploymentTypeLabel(value, lang)}</>;
}

/** Localized "Posted X ago" line for Server Components. */
export function PostedLine({ value }: { value: string }) {
  const { lang, t } = useLanguage();
  return <>{t("jobCard.posted", { relative: formatRelative(value, lang) })}</>;
}

/** Localized "Posted X ago (date)" stamp for the job detail page. */
export function PostedStamp({ value }: { value: string }) {
  const { lang, t } = useLanguage();
  return (
    <>
      {t("detail.posted", {
        relative: formatRelative(value, lang),
        date: formatDate(value, lang),
      })}
    </>
  );
}
