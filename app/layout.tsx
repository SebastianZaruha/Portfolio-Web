import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteProviders } from "@/components/site-providers";
import { display, sans } from "@/app/fonts";
import { LOCALE_STORAGE_KEY } from "@/lib/ga";
import { THEME_COLORS, THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const siteUrl = new URL("https://sebastianzaruha.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Sebastian V. Zaruha",
    template: "%s · Sebastian V. Zaruha",
  },
  description: "Desarrollador full stack junior. DAM, especialidad full stack. Practico Next.js.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Sebastian V. Zaruha",
    title: "Sebastian V. Zaruha",
    description: "Desarrollador full stack junior. DAM, especialidad full stack. Practico Next.js.",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light.bg },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark.bg },
  ],
  colorScheme: "light dark",
};

const bootScript = `try{var l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});if(l==="en"||l==="es")document.documentElement.lang=l;}catch(e){}try{var c=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var dark=c==="dark"||(c!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var root=document.documentElement;root.dataset.theme=dark?"dark":"light";root.style.colorScheme=dark?"dark":"light";root.style.backgroundColor=dark?"${THEME_COLORS.dark.bg}":"${THEME_COLORS.light.bg}";root.style.color=dark?"${THEME_COLORS.dark.text}":"${THEME_COLORS.light.text}";}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${display.variable}`}
      data-theme="light"
      style={{ backgroundColor: THEME_COLORS.light.bg, color: THEME_COLORS.light.text }}
    >
      <body>
        <Script id="boot" strategy="beforeInteractive">
          {bootScript}
        </Script>
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
