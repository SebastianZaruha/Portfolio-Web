"use client";

import Link from "next/link";
import { useSite } from "@/components/site-providers";

export function SiteFooter() {
  const { locale, bannerOpen, openBanner } = useSite();
  const english = locale === "en";

  return (
    <footer className="site-footer">
      <p>© 2026 Sebastian Zaruha</p>
      <nav className="nav" aria-label={english ? "Legal" : "Legal"}>
        <Link href="/aviso-legal">{english ? "Legal notice" : "Aviso legal"}</Link>
        <Link href="/privacidad">{english ? "Privacy" : "Privacidad"}</Link>
        <button
          type="button"
          className="link-button"
          aria-expanded={bannerOpen}
          aria-controls="cookie-banner"
          onClick={openBanner}
        >
          {english ? "Cookie settings" : "Configurar cookies"}
        </button>
      </nav>
    </footer>
  );
}
