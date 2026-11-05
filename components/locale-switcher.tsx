"use client";

import { useSite } from "@/components/site-providers";
import type { Locale } from "@/lib/locale";

const LOCALES: Locale[] = ["es", "en"];

export function LocaleSwitcher() {
  const { locale, setLocale } = useSite();

  return (
    <div className="locale-switcher" role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
      {LOCALES.map((code, index) => (
        <span key={code} className="locale-switcher-item">
          {index > 0 ? (
            <span className="locale-sep" aria-hidden="true">
              /
            </span>
          ) : null}
          <button
            type="button"
            aria-pressed={locale === code}
            onClick={() => setLocale(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
