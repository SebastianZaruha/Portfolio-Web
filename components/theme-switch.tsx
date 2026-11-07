"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useSite } from "@/components/site-providers";
import {
  isThemeChoice,
  resolveTheme,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  type ThemeChoice,
} from "@/lib/theme";

const CHOICES: ThemeChoice[] = ["light", "dark", "system"];

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
    callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function readChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeChoice(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function getServerChoice(): ThemeChoice {
  return "system";
}

export function applyTheme(choice: ThemeChoice) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = resolveTheme(choice, systemDark);
  const colors = THEME_COLORS[resolved];
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themeChoice = choice;
  root.style.colorScheme = resolved;
  root.style.backgroundColor = colors.bg;
  root.style.color = colors.text;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", colors.bg);
}

function saveChoice(choice: ThemeChoice) {
  localStorage.setItem(THEME_STORAGE_KEY, choice);
  applyTheme(choice);
  emit();
}

const LABELS: Record<ThemeChoice, { es: string; en: string }> = {
  light: { es: "Marfil", en: "Ivory" },
  dark: { es: "Ciruela", en: "Plum" },
  system: { es: "Auto", en: "Auto" },
};

export function ThemeSwitch() {
  const choice = useSyncExternalStore(subscribe, readChoice, getServerChoice);
  const { locale } = useSite();

  useEffect(() => {
    applyTheme(choice);
    if (choice !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [choice]);

  return (
    <div className="theme-switch" role="group" aria-label={locale === "en" ? "Theme" : "Tema"}>
      {CHOICES.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={choice === item}
          onClick={() => saveChoice(item)}
        >
          <span className="es-only">{LABELS[item].es}</span>
          <span className="en-only">{LABELS[item].en}</span>
        </button>
      ))}
    </div>
  );
}
