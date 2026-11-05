"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  CONSENT_UNKNOWN,
  getConsentSnapshot,
  getServerConsentSnapshot,
  loadGoogleAnalytics,
  rejectGoogleAnalytics,
  saveConsent,
  subscribeConsent,
  type ConsentState,
} from "@/lib/consent";
import {
  getLocaleSnapshot,
  getServerLocaleSnapshot,
  saveLocale,
  subscribeLocale,
  type Locale,
} from "@/lib/locale";

type SiteContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  consent: ConsentState;
  bannerOpen: boolean;
  focusToken: number;
  openBanner: () => void;
  accept: () => void;
  reject: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error("useSite must be used within SiteProviders");
  }
  return value;
}

export function SiteProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getServerLocaleSnapshot);
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [focusToken, setFocusToken] = useState(0);
  const trackedPath = useRef<string | null>(null);

  const bannerOpen = settingsOpen || consent === null;

  useEffect(() => {
    if (consent === CONSENT_UNKNOWN || consent?.choice !== "accept") return;
    loadGoogleAnalytics();
    if (trackedPath.current === pathname) return;
    const first = trackedPath.current === null;
    trackedPath.current = pathname;
    if (first) return;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consent, pathname]);

  useEffect(() => {
    if (consent === CONSENT_UNKNOWN || consent?.choice !== "reject") return;
    trackedPath.current = null;
    rejectGoogleAnalytics();
  }, [consent]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.cookieBanner = bannerOpen ? "open" : "closed";
  }, [locale, bannerOpen]);

  const setLocale = useCallback((next: Locale) => {
    saveLocale(next);
  }, []);

  const accept = useCallback(() => {
    saveConsent("accept");
    setSettingsOpen(false);
  }, []);

  const reject = useCallback(() => {
    saveConsent("reject");
    setSettingsOpen(false);
  }, []);

  const openBanner = useCallback(() => {
    setSettingsOpen(true);
    setFocusToken((token) => token + 1);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      consent,
      bannerOpen,
      focusToken,
      openBanner,
      accept,
      reject,
    }),
    [locale, setLocale, consent, bannerOpen, focusToken, openBanner, accept, reject],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
