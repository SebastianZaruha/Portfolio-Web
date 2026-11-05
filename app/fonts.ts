import localFont from "next/font/local";

/** UI face. Swap so the claim is readable before the file arrives. */
export const sans = localFont({
  src: [
    { path: "./fonts/OpenSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans-file",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

/**
 * Name only. Optional: use it when it is already there, otherwise keep the
 * serif fallback for the whole visit so a slow font cannot move the claim.
 */
export const display = localFont({
  src: "./fonts/Ephesis-Regular.woff2",
  variable: "--font-display-file",
  weight: "400",
  style: "normal",
  display: "optional",
  preload: false,
  fallback: ["Iowan Old Style", "Palatino", "Georgia", "serif"],
});
