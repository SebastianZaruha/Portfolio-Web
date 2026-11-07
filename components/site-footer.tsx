"use client";

import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useSite } from "@/components/site-providers";

export function SiteFooter() {
  const { locale, bannerOpen, openBanner } = useSite();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
      <p>© 2026 Sebastian Zaruha</p>
      <nav className="nav" aria-label={locale === "en" ? "Legal" : "Información legal"}>
        <Link href="/aviso-legal">
          <span className="es-only">Aviso legal</span>
          <span className="en-only">Legal notice</span>
        </Link>
        <Link href="/privacidad">
          <span className="es-only">Privacidad</span>
          <span className="en-only">Privacy</span>
        </Link>
        <Link href="/cookies">Cookies</Link>
        <button
          type="button"
          className="link-button"
          aria-expanded={bannerOpen}
          aria-controls="cookie-banner"
          onClick={openBanner}
        >
          <span className="es-only">Configurar cookies</span>
          <span className="en-only">Cookie settings</span>
        </button>
        <LocaleSwitcher />
      </nav>
      </div>
    </footer>
  );
}
