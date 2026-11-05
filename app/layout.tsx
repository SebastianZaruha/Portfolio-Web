import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CookieBanner } from "@/components/cookie-banner";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteProviders } from "@/components/site-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sebastian V. Zaruha",
    template: "%s · Sebastian V. Zaruha",
  },
  description: "Portfolio de Sebastian V. Zaruha. En construcción.",
};

export const viewport: Viewport = {
  themeColor: "#141311",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SiteProviders>
          <div className="site">
            <header className="site-header">
              <Link className="wordmark" href="/">
                Sebastian V. Zaruha
              </Link>
              <div className="header-tools">
                <LocaleSwitcher />
                <nav className="nav" aria-label="Secciones">
                  <Link href="/sobre-mi">Sobre mí</Link>
                </nav>
              </div>
            </header>
            {children}
            <SiteFooter />
          </div>
          <CookieBanner />
        </SiteProviders>
        <Analytics />
      </body>
    </html>
  );
}
