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
    __portfolioGaEverLoaded?: boolean;
    __portfolioGaStopped?: boolean;
  }
}

function setDisableFlag(disabled: boolean): void {
  (window as unknown as Record<string, boolean>)[disableFlagKey()] = disabled;
}

function measurementId(): string {
  return resolvedGaMeasurementId();
}

function installGtag(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    if (window.__portfolioGaStopped) return;
    // The gtag loader reads an Arguments object from the queue.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
}

function disableFlagKey(): string {
  return `ga-disable-${measurementId()}`;
}

function isCollectUrl(url: string): boolean {
  return /google-analytics\.com|analytics\.google\.com|googletagmanager\.com\/gtag|\/g\/collect|stats\.g\.doubleclick\.net|google\.com\/ccm/i.test(
    url,
  );
}

let restoreCollectBlock: (() => void) | null = null;
let restoreCookieWrites: (() => void) | null = null;

/** Already-loaded gtag keeps a scroll listener. Swallow its transport after Reject. */
function blockCollectTransport(): void {
  if (restoreCollectBlock) return;

  const nativeFetch = window.fetch.bind(window);
  const nativeBeacon = navigator.sendBeacon?.bind(navigator);
  const nativeOpen = XMLHttpRequest.prototype.open;
  const nativeSend = XMLHttpRequest.prototype.send;
  const imageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");

  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (isCollectUrl(url)) return Promise.resolve(new Response(null, { status: 204 }));
    return nativeFetch(input, init);
  }) as typeof fetch;

  if (nativeBeacon) {
    navigator.sendBeacon = (url: string | URL, data?: BodyInit | null) => {
      if (isCollectUrl(String(url))) return true;
      return nativeBeacon(url, data);
    };
  }

  XMLHttpRequest.prototype.open = function open(
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    (this as XMLHttpRequest & { __collectUrl?: string }).__collectUrl = String(url);
    return nativeOpen.call(this, method, url, async ?? true, username, password);
  };

  XMLHttpRequest.prototype.send = function send(body?: Document | XMLHttpRequestBodyInit | null) {
    const url = (this as XMLHttpRequest & { __collectUrl?: string }).__collectUrl ?? "";
    if (isCollectUrl(url)) return;
    return nativeSend.call(this, body);
  };

  if (imageSrc?.get && imageSrc.set) {
    const setSrc = imageSrc.set;
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: true,
      enumerable: imageSrc.enumerable,
      get: imageSrc.get,
      set(value: string) {
        if (isCollectUrl(value)) return;
        setSrc.call(this, value);
      },
    });
  }

  restoreCollectBlock = () => {
    window.fetch = nativeFetch;
    if (nativeBeacon) navigator.sendBeacon = nativeBeacon;
    XMLHttpRequest.prototype.open = nativeOpen;
    XMLHttpRequest.prototype.send = nativeSend;
    if (imageSrc) Object.defineProperty(HTMLImageElement.prototype, "src", imageSrc);
    restoreCollectBlock = null;
  };
}

function unblockCollectTransport(): void {
  restoreCollectBlock?.();
}

/** Drop new `_ga` writes while rejected, but still allow our Max-Age=0 deletes. */
function blockGaCookieWrites(): void {
  if (restoreCookieWrites) return;
  try {
  const desc =
    Object.getOwnPropertyDescriptor(Document.prototype, "cookie") ??
    Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "cookie");
  if (!desc?.get || !desc.set) return;
  const nativeGet = desc.get;
  const nativeSet = desc.set;

  Object.defineProperty(document, "cookie", {
    configurable: true,
    get() {
      return nativeGet.call(document);
    },
    set(value: string) {
      const name = value.split("=")[0]?.trim() ?? "";
      const isGa = name === "_ga" || name.startsWith("_ga_");
      const isDelete = /max-age=0|expires=thu, 01 jan 1970/i.test(value);
      if (isGa && !isDelete) return;
      nativeSet.call(document, value);
    },
  });

  restoreCookieWrites = () => {
    Reflect.deleteProperty(document, "cookie");
    restoreCookieWrites = null;
  };
  } catch {
    restoreCookieWrites = null;
  }
}

function unblockGaCookieWrites(): void {
  restoreCookieWrites?.();
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
  window.__portfolioGaStopped = false;
  setDisableFlag(false);
  unblockGaCookieWrites();
  unblockCollectTransport();
  installGtag();

  if (!window.__portfolioGaConfigured) {
    if (window.__portfolioGaEverLoaded) {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      gaConfig();
    } else {
      window.gtag?.("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag?.("js", new Date());
      gaConfig();
    }
    window.__portfolioGaConfigured = true;
  } else {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    gaConfig();
  }
  window.__portfolioGaEverLoaded = true;

  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId()}`;
  document.head.appendChild(script);
}

function expireCookie(name: string, domain: string | undefined, path: string): void {
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const domainAttr = domain ? `; Domain=${domain}` : "";
  const base = `${name}=; Expires=${expires}; Max-Age=0; Path=${path}${domainAttr}`;
  document.cookie = base;
  document.cookie = `${base}; Secure`;
  document.cookie = `${base}; SameSite=Lax`;
  document.cookie = `${base}; SameSite=Lax; Secure`;
  document.cookie = `${base}; SameSite=Strict; Secure`;
  document.cookie = `${base}; SameSite=None; Secure`;
}

function domainVariants(host: string): Array<string | undefined> {
  const variants = new Set<string | undefined>([undefined, host, `.${host}`]);
  const labels = host.split(".").filter(Boolean);
  if (labels.length > 2) {
    const parent = labels.slice(1).join(".");
    variants.add(parent);
    variants.add(`.${parent}`);
  }
  if (host === "sebastianzaruha.com" || host.endsWith(".sebastianzaruha.com")) {
    variants.add("sebastianzaruha.com");
    variants.add(".sebastianzaruha.com");
  }
  return [...variants];
}

function visibleGaNames(): string[] {
  return document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0] ?? "")
    .map((name) => {
      try {
        return decodeURIComponent(name);
      } catch {
        return name;
      }
    })
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
}

/** Delete `_ga` / `_ga_*` for this hostname, including Secure and Domain variants. */
export function clearGaCookies(): void {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = domainVariants(host);
  const paths = ["/", window.location.pathname || "/"];
  const names = new Set<string>(visibleGaNames());
  names.add("_ga");
  names.add(`_ga_${measurementId().slice(2)}`);

  for (let pass = 0; pass < 2; pass += 1) {
    for (const name of names) {
      for (const domain of domains) {
        for (const path of paths) expireCookie(name, domain, path);
      }
    }
  }
}

/**
 * Stop every further GA hit, then delete this host's `_ga` cookies.
 * The loaded tag's scroll listener can still emit g/collect with consent granted;
 * the transport block is what keeps that request off the network.
 */
export function rejectGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  setDisableFlag(true);
  blockCollectTransport();
  blockGaCookieWrites();

  if (!window.__portfolioGaStopped && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  window.__portfolioGaStopped = true;
  window.gtag = function gtag() {
    /* Rejected: do not queue page_view, scroll, or config. */
  };
  document.getElementById(SCRIPT_ID)?.remove();
  window.__portfolioGaConfigured = false;

  clearGaCookies();
  queueMicrotask(clearGaCookies);
  window.setTimeout(clearGaCookies, 0);
  window.setTimeout(clearGaCookies, 300);
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
