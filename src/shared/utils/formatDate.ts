import type { Language } from "@/i18n/dictionaries";

const dateLocales: Record<Language, string> = {
  en: "en-US",
  ar: "ar",
};

export function formatDate(
  input: string | Date,
  locale: Language = "en"
): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat(dateLocales[locale], {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function relativeDaysAr(diffDay: number): string {
  if (diffDay <= 0) return "اليوم";
  if (diffDay === 1) return "أمس";
  if (diffDay === 2) return "منذ يومين";
  if (diffDay < 11) return `منذ ${diffDay} أيام`;
  return `منذ ${diffDay} يومًا`;
}

function relativeWeeksAr(weeks: number): string {
  if (weeks <= 1) return "منذ أسبوع";
  if (weeks === 2) return "منذ أسبوعين";
  if (weeks < 11) return `منذ ${weeks} أسابيع`;
  return `منذ ${weeks} أسبوعًا`;
}

export function formatRelative(
  input: string | Date,
  locale: Language = "en"
): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const diffMs = Date.now() - date.getTime();
  const diffDay = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (locale === "ar") {
    if (diffDay < 7) return relativeDaysAr(diffDay);
    if (diffDay < 30) return relativeWeeksAr(Math.floor(diffDay / 7));
    return formatDate(date, locale);
  }

  if (diffDay <= 0) return "Today";
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} weeks ago`;
  return formatDate(date, locale);
}
