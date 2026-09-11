import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/app/globals.css";
import { LanguageProvider, useLanguage } from "../src/i18n/LanguageProvider";
import type { Language } from "../src/i18n/dictionaries";

function LocaleSync({ locale }: { locale: Language }) {
  const { lang, setLang } = useLanguage();
  useEffect(() => {
    if (locale !== lang) setLang(locale);
  }, [locale, lang, setLang]);
  return null;
}

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Language and text direction",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English (LTR)" },
          { value: "ar", title: "العربية (RTL)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <LanguageProvider>
        <LocaleSync locale={(context.globals.locale as Language) ?? "en"} />
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </LanguageProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
