/**
 * Portfolio GA4 property only. Do not substitute another measurement id.
 * NEXT_PUBLIC_GA_ID is honored solely when it is this id; anything else is ignored.
 */
export const GA_MEASUREMENT_ID = "G-SZGV9NFPVH";

export const BANNER_VERSION = "v1-portfolio-2026-11-05";

export const CONSENT_STORAGE_KEY = "cookie_consent";

export const LOCALE_STORAGE_KEY = "locale";

/** ~13 months, matching the cookie policy ("hasta ~13 meses"). */
export const GA_COOKIE_EXPIRES_SECONDS = 60 * 60 * 24 * 395;

export function resolvedGaMeasurementId(): string {
  const configured = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (configured === GA_MEASUREMENT_ID) return configured;
  return GA_MEASUREMENT_ID;
}
