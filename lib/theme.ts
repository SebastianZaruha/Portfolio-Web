import { BANNER_VERSION, CONSENT_STORAGE_KEY, LOCALE_STORAGE_KEY } from "@/lib/ga";

/**
 * Theme state:
 * - ThemePreference is what the person chose: system, light, or dark.
 * - ThemeMode is the resolved appearance written to `data-theme` before paint.
 * Absent storage means system. An explicit choice is stored under `theme`.
 */

export const THEME_STORAGE_KEY = "theme";

export type ThemePreference = "system" | "light" | "dark";

export type ThemeMode = "light" | "dark";

const listeners = new Set<() => void>();

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

export function resolveThemeMode(preference: ThemePreference, systemIsLight: boolean): ThemeMode {
  if (preference === "light" || preference === "dark") return preference;
  return systemIsLight ? "light" : "dark";
}

export function subscribeTheme(callback: () => void): () => void {
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

export function getThemeSnapshot(): ThemePreference {
  const value = localStorage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(value) ? value : "system";
}

export function getServerThemeSnapshot(): ThemePreference {
  return "system";
}

export function saveTheme(preference: ThemePreference): void {
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  for (const listener of listeners) listener();
}

/** Synchronous head script: locale, then theme, before first paint. */
export const THEME_BOOT_SCRIPT = `try{var d=document.documentElement;var l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});if(l==="en"||l==="es")d.lang=l;var p=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var pref=p==="light"||p==="dark"||p==="system"?p:"system";var mode=pref==="light"||pref==="dark"?pref:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");d.dataset.theme=mode;d.dataset.themePref=pref;d.style.colorScheme=mode;var open=true;try{var rec=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||"null");if(rec&&(rec.choice==="accept"||rec.choice==="reject")&&rec.version===${JSON.stringify(BANNER_VERSION)}&&typeof rec.timestamp==="string"&&rec.timestamp.length)open=false;}catch(err){}d.dataset.cookieBanner=open?"open":"closed";}catch(e){}`;
