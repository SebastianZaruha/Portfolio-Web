import {
  BANNER_VERSION,
  CONSENT_STORAGE_KEY,
  GA_COOKIE_EXPIRES_SECONDS,
  resolvedGaMeasurementId,
} from "@/lib/ga";

export type ConsentChoice = "accept" | "reject";

export type ConsentRecord = {
  choice: ConsentChoice;
  timestamp: string;
  version: string;
};

const SCRIPT_ID = "portfolio-ga4";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __portfolioGaConfigured?: boolean;
  }
}

function measurementId(): string {
  return resolvedGaMeasurementId();
}

function installGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;
  window.gtag = function gtag() {
    // The gtag loader reads an Arguments object from the queue.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
}

function gaConfig(): void {
  window.gtag?.("config", measurementId(), {
    cookie_domain: "none",
    cookie_flags: "SameSite=Lax;Secure",
    cookie_expires: GA_COOKIE_EXPIRES_SECONDS,
  });
}

/**
 * Load gtag only after an explicit accept.
 * Consent is granted before the script request, so there is no denied ping.
 * cookie_domain "none" is host-only: no Domain attribute, so the cookie is not
 * sent to hourglass.sebastianzaruha.com.
 */
export function loadGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  installGtag();

  if (!window.__portfolioGaConfigured) {
    window.gtag?.("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag?.("js", new Date());
    gaConfig();
    window.__portfolioGaConfigured = true;
  } else {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    gaConfig();
  }

  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId()}`;
  document.head.appendChild(script);
}

function expireCookie(name: string, domain?: string): void {
  const domainAttr = domain ? `; Domain=${domain}` : "";
  const base = `${name}=; Max-Age=0; Path=/${domainAttr}`;
  document.cookie = `${base}; SameSite=Lax`;
  document.cookie = `${base}; SameSite=Lax; Secure`;
}

/** Delete `_ga` / `_ga_*` for this host. Also expire a parent-domain cookie if one was set. */
export function clearGaCookies(): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0] ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const host = window.location.hostname;
  const domains: Array<string | undefined> = [undefined];
  if (host === "sebastianzaruha.com" || host.endsWith(".sebastianzaruha.com")) {
    domains.push("sebastianzaruha.com", ".sebastianzaruha.com");
  }

  for (const name of names) {
    for (const domain of domains) expireCookie(name, domain);
  }
}

/** Stop analytics if the tag was loaded, and always drop this host's `_ga*` cookies. */
export function rejectGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
  clearGaCookies();
}

export function readConsent(): ConsentRecord | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Partial<ConsentRecord>;
    if (record.choice !== "accept" && record.choice !== "reject") return null;
    if (record.version !== BANNER_VERSION) return null;
    if (typeof record.timestamp !== "string" || record.timestamp.length === 0) return null;
    return {
      choice: record.choice,
      timestamp: record.timestamp,
      version: record.version,
    };
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = {
    choice,
    timestamp: new Date().toISOString(),
    version: BANNER_VERSION,
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}

/** Server and the first hydration render. Not a stored choice. */
export const CONSENT_UNKNOWN = "unknown" as const;

export type ConsentState = ConsentRecord | null | typeof CONSENT_UNKNOWN;

const consentListeners = new Set<() => void>();
let consentRaw: string | null | undefined;
let consentCache: ConsentRecord | null = null;

export function subscribeConsent(callback: () => void): () => void {
  consentListeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
    consentRaw = undefined;
    callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    consentListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function getConsentSnapshot(): ConsentRecord | null {
  const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === consentRaw) return consentCache;
  consentRaw = raw;
  consentCache = readConsent();
  return consentCache;
}

export function getServerConsentSnapshot(): ConsentState {
  return CONSENT_UNKNOWN;
}

export function saveConsent(choice: ConsentChoice): void {
  const record = writeConsent(choice);
  consentRaw = localStorage.getItem(CONSENT_STORAGE_KEY);
  consentCache = record;
  for (const listener of consentListeners) listener();
}
