"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";

const LINKS = [
  { href: "/", es: "Inicio", en: "Home" },
  { href: "/sobre-mi", es: "Sobre mí", en: "About" },
  { href: "/hablemos", es: "Hablemos", en: "Hablemos" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        Sebastian V. Zaruha
      </Link>
      <div className="header-tools">
        <nav className="nav" aria-label="Secciones">
          {LINKS.map((link) => {
            const current = link.href === "/" ? pathname === "/" : pathname === link.href;
            return (
              <Link key={link.href} href={link.href} aria-current={current ? "page" : undefined}>
                <span className="es-only">{link.es}</span>
                <span className="en-only">{link.en}</span>
              </Link>
            );
          })}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
