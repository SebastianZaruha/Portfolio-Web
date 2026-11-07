"use client";

import { useSite } from "@/components/site-providers";
import type { ThemePreference } from "@/lib/theme";

const OPTIONS: readonly {
  id: ThemePreference;
  es: string;
  en: string;
  esLabel: string;
  enLabel: string;
}[] = [
  { id: "system", es: "Auto", en: "Auto", esLabel: "Usar el tema del sistema", enLabel: "Use the system theme" },
  { id: "light", es: "Claro", en: "Light", esLabel: "Tema claro", enLabel: "Light theme" },
  { id: "dark", es: "Oscuro", en: "Dark", esLabel: "Tema oscuro", enLabel: "Dark theme" },
];

export function ThemeSwitcher() {
  const { locale, themePreference, setTheme } = useSite();
  const english = locale === "en";

  return (
    <div className="segment" role="group" aria-label={english ? "Theme" : "Tema"}>
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={themePreference === option.id}
          aria-label={english ? option.enLabel : option.esLabel}
          onClick={() => setTheme(option.id)}
        >
          <span className="es-only">{option.es}</span>
          <span className="en-only">{option.en}</span>
        </button>
      ))}
    </div>
  );
}
