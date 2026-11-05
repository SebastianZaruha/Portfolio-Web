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
 * Name only, in the header and the hero. Swap (not optional) so both places
 * resolve to Ephesis together instead of one staying on the serif fallback.
 */
export const display = localFont({
  src: "./fonts/Ephesis-Regular.woff2",
  variable: "--font-display-file",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["Iowan Old Style", "Palatino", "Georgia", "serif"],
});
