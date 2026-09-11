import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  LanguageProvider,
  T,
  useLanguage,
} from "../LanguageProvider";
import {
  LANGUAGE_STORAGE_KEY,
  translateValidationMessage,
} from "../dictionaries";

function Probe() {
  const { dir, lang, t, toggleLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="dir">{dir}</span>
      <span data-testid="browse">{t("nav.browse")}</span>
      <span>
        <T k="nav.about" />
      </span>
      <button type="button" onClick={toggleLang}>
        toggle
      </button>
    </div>
  );
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );
}

afterEach(() => {
  window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
});

describe("localization", () => {
  it("defaults to English with LTR direction", () => {
    renderProbe();

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("dir")).toHaveTextContent("ltr");
    expect(screen.getByTestId("browse")).toHaveTextContent("Browse Jobs");
    expect(document.documentElement.dir).toBe("ltr");
    expect(document.documentElement.lang).toBe("en");
  });

  it("switches to Arabic with RTL direction and persists the choice", () => {
    renderProbe();

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    expect(screen.getByTestId("lang")).toHaveTextContent("ar");
    expect(screen.getByTestId("dir")).toHaveTextContent("rtl");
    expect(screen.getByTestId("browse")).toHaveTextContent("تصفح الوظائف");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("ar");
  });

  it("switches back to English with LTR direction", () => {
    renderProbe();

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));
    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("browse")).toHaveTextContent("Browse Jobs");
    expect(document.documentElement.dir).toBe("ltr");
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("en");
  });

  it("restores a persisted Arabic choice on load", () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "ar");
    renderProbe();

    expect(screen.getByTestId("lang")).toHaveTextContent("ar");
    expect(screen.getByTestId("browse")).toHaveTextContent("تصفح الوظائف");
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("translates known validation messages to Arabic", () => {
    expect(
      translateValidationMessage("Location is required", "ar")
    ).toBe("الموقع مطلوب");
    expect(
      translateValidationMessage("Location is required", "en")
    ).toBe("Location is required");
  });
});
