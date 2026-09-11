"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  dictionaries,
  LANGUAGE_STORAGE_KEY,
} from "./dictionaries";
import type { Dictionary, Language } from "./dictionaries";

export type { Language };
export type { Dictionary };

interface LanguageContextValue {
  lang: Language;
  dir: "ltr" | "rtl";
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** Translate a dot-path key, e.g. t("nav.browse"). Supports {placeholders}. */
  t: (key: string, values?: Record<string, string | number>) => string;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function lookup(dict: Dictionary, key: string): string | undefined {
  return key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        typeof acc === "object" && acc !== null
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      dict
    ) as string | undefined;
}

function interpolate(
  template: string,
  values?: Record<string, string | number>
): string {
  if (!values) return template;
  return Object.entries(values).reduce(
    (acc, [name, value]) => acc.replace(`{${name}}`, String(value)),
    template
  );
}

function readStoredLang(): Language {
  if (typeof window === "undefined") return "en";
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "ar"
      ? "ar"
      : "en";
  } catch {
    return "en";
  }
}

function applyDocumentAttributes(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLang);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // Persistence is a nice-to-have; the UI works without it.
    }
    applyDocumentAttributes(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next: Language = current === "en" ? "ar" : "en";
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        // ignore
      }
      applyDocumentAttributes(next);
      return next;
    });
  }, []);

  useEffect(() => {
    applyDocumentAttributes(readStoredLang());
  }, []);

  const t = useCallback(
    (key: string, values?: Record<string, string | number>) => {
      const template =
        lookup(dictionaries[lang], key) ?? lookup(dictionaries.en, key) ?? key;
      return interpolate(template, values);
    },
    [lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang,
      t,
      dict: dictionaries[lang],
    }),
    [lang, setLang, toggleLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

const fallbackTranslate = (key: string, values?: Record<string, string | number>) => {
  const template = lookup(dictionaries.en, key) ?? key;
  return interpolate(template, values);
};

const fallbackContextValue: LanguageContextValue = {
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  toggleLang: () => {},
  t: fallbackTranslate,
  dict: dictionaries.en,
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (ctx) {
    return ctx;
  }
  // Safe fallback for unit tests and isolated components rendered without LanguageProvider
  return fallbackContextValue;
}

/** Leaf component for translated strings inside Server Components. */
export function T({
  k,
  values,
}: {
  k: string;
  values?: Record<string, string | number>;
}) {
  const { t } = useLanguage();
  return <>{t(k, values)}</>;
}
