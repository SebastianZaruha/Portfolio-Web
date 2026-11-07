export const THEME_STORAGE_KEY = "theme";

export const THEME_COLORS = {
  light: { bg: "#F3EEE6", text: "#3A2428" },
  dark: { bg: "#4A2030", text: "#F7F2EA" },
} as const;

export type ThemeChoice = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function isThemeChoice(value: string | null): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(choice: ThemeChoice, systemDark: boolean): ResolvedTheme {
  if (choice === "light") return "light";
  if (choice === "dark") return "dark";
  return systemDark ? "dark" : "light";
}
