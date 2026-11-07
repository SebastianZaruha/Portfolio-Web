"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useSite } from "@/components/site-providers";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CONTACT_HREF } from "@/lib/contact";

const LINKS = [
  { href: "/", es: "Inicio", en: "Home" },
  { href: "/sobre-mi", es: "Sobre mí", en: "About" },
  { href: "/hablemos", es: "Hablemos", en: "Hablemos" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { locale } = useSite();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="header-brand">
          <Link className="wordmark" href="/">
            Sebastian V. Zaruha
          </Link>
          <nav className="nav" aria-label={locale === "en" ? "Sections" : "Secciones"}>
            {LINKS.map((link) => {
              const current = link.href === "/" ? pathname === "/" : pathname === link.href;
              return (
                <Link key={link.href} href={link.href} aria-current={current ? "page" : undefined}>
                  <span className="es-only">{link.es}</span>
                  <span className="en-only">{link.en}</span>
                </Link>
              );
            })}
            <a href={CONTACT_HREF}>Email</a>
          </nav>
        </div>
        <div className="header-tools">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
