"use client";

import { LANGUAGES } from "./dictionaries";
import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--color-border-strong)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      {LANGUAGES.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            aria-label={
              option.value === "ar"
                ? t("language.switchToArabic")
                : t("language.switchToEnglish")
            }
            title={option.label}
            style={{
              border: "none",
              background: active
                ? "var(--color-accent)"
                : "var(--color-surface)",
              color: active ? "#fff" : "var(--color-text-muted)",
              fontWeight: 600,
              fontSize: 12,
              minHeight: 32,
              padding: "0 12px",
              cursor: "pointer",
            }}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
