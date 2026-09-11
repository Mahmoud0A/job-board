"use client";

import { formatDate, formatRelative } from "@/shared/utils/formatDate";
import { useLanguage } from "./LanguageProvider";

/** Locale-aware relative time for use inside Server Components. */
export function RelativeTime({ value }: { value: string }) {
  const { lang } = useLanguage();
  return <>{formatRelative(value, lang)}</>;
}

/** Locale-aware absolute date for use inside Server Components. */
export function LocalizedDate({ value }: { value: string }) {
  const { lang } = useLanguage();
  return <>{formatDate(value, lang)}</>;
}
