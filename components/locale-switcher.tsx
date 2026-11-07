"use client";

import { useSite } from "@/components/site-providers";
import type { Locale } from "@/lib/locale";

const LOCALES: readonly { code: Locale; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

export function LocaleSwitcher() {
  const { locale, setLocale } = useSite();

  return (
    <div className="segment" role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
      {LOCALES.map((item) => (
        <button
          key={item.code}
          type="button"
          aria-pressed={locale === item.code}
          aria-label={item.label}
          onClick={() => setLocale(item.code)}
        >
          {item.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
