import { LOCALE_STORAGE_KEY } from "@/lib/ga";

export type Locale = "es" | "en";

const listeners = new Set<() => void>();

export function subscribeLocale(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== LOCALE_STORAGE_KEY) return;
    callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function getLocaleSnapshot(): Locale {
  const value = localStorage.getItem(LOCALE_STORAGE_KEY);
  return value === "en" ? "en" : "es";
}

export function getServerLocaleSnapshot(): Locale {
  return "es";
}

export function saveLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  for (const listener of listeners) listener();
}
