import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CookieBanner } from "@/components/cookie-banner";
import { PaintingBackdrop } from "@/components/painting-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteProviders } from "@/components/site-providers";
import { display, sans } from "@/app/fonts";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const siteUrl = new URL("https://sebastianzaruha.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Sebastian V. Zaruha",
    template: "%s · Sebastian V. Zaruha",
  },
  description: "Analizo antes de construir. Junior full stack. Criterio de diseño.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Sebastian V. Zaruha",
    title: "Sebastian V. Zaruha",
    description: "Analizo antes de construir. Junior full stack. Criterio de diseño.",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFE6DA" },
    { media: "(prefers-color-scheme: dark)", color: "#1A120E" },
  ],
  colorScheme: "light dark",
};

const criticalThemeCss =
  "html{background:#1A120E;color:#F3ECE4;color-scheme:dark}html[data-theme=light]{background:#EFE6DA;color:#1A120E;color-scheme:light}@media (prefers-color-scheme:light){html:not([data-theme=dark]){background:#EFE6DA;color:#1A120E;color-scheme:light}}";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: criticalThemeCss }} />
        <link
          rel="preload"
          as="image"
          href="/painting/selected.avif"
          type="image/avif"
          fetchPriority="high"
        />
        <PaintingBackdrop />
        <a className="skip" href="#contenido">
          <span className="es-only">Saltar al contenido</span>
          <span className="en-only">Skip to content</span>
        </a>
        <SiteProviders>
          <div className="site">
            <SiteHeader />
            <div className="site-main" id="contenido">
              {children}
            </div>
            <SiteFooter />
          </div>
          <CookieBanner />
        </SiteProviders>
        <Analytics />
      </body>
    </html>
  );
}
