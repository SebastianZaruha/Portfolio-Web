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
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sebastian V. Zaruha",
    template: "%s · Sebastian V. Zaruha",
  },
  description: "Analizo antes de construir. Junior full stack. Criterio de diseño.",
};

export const viewport: Viewport = {
  themeColor: "#161311",
  colorScheme: "dark",
};

const localeScript = `try{var l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});if(l==="en"||l==="es")document.documentElement.lang=l;}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${display.variable}`}
      style={{ backgroundColor: "#161311", color: "#f4eee6" }}
    >
      <body>
        <Script id="locale-early" strategy="beforeInteractive">
          {localeScript}
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
