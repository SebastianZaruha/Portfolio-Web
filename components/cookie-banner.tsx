"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSite } from "@/components/site-providers";

export function CookieBanner() {
  const { locale, bannerOpen, focusToken, accept, reject } = useSite();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerOpen || focusToken === 0) return;
    titleRef.current?.focus();
  }, [bannerOpen, focusToken]);

  useEffect(() => {
    const panel = panelRef.current;
    const root = document.documentElement;
    if (!panel || !bannerOpen) {
      root.style.removeProperty("--cookie-banner-height");
      return;
    }
    const apply = () => {
      root.style.setProperty("--cookie-banner-height", `${panel.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(panel);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-banner-height");
    };
  }, [bannerOpen, locale]);

  const english = locale === "en";

  return (
    <div
      id="cookie-banner"
      ref={panelRef}
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
      hidden={!bannerOpen}
    >
      <div className="cookie-banner-inner">
        <h2 id="cookie-banner-title" ref={titleRef} tabIndex={-1}>
          {english ? "Cookies and analytics" : "Cookies y analítica"}
        </h2>
        <div id="cookie-banner-body">
          {english ? (
            <>
              <p>
                We use <strong>Google Analytics 4</strong> (Google) only if you agree, to measure
                visits and site use. This involves cookies and identifiers; data may be transferred
                to the United States under the Data Privacy Framework.
              </p>
              <p>
                <strong>Vercel Web Analytics</strong> measures visits in aggregate{" "}
                <strong>without cookies</strong> and may still run if you decline GA.
              </p>
              <p>
                You can decline GA and keep browsing. More:{" "}
                <Link href="/privacidad">Privacy policy</Link>
                {" · "}
                <Link href="/cookies">Cookies</Link>
              </p>
            </>
          ) : (
            <>
              <p>
                Usamos <strong>Google Analytics 4</strong> (Google) solo si lo aceptas, para medir
                visitas y uso del sitio. Eso implica cookies e identificadores; puede haber
                transferencia a Estados Unidos bajo el Data Privacy Framework.
              </p>
              <p>
                <strong>Vercel Web Analytics</strong> mide visitas de forma agregada{" "}
                <strong>sin cookies</strong> y puede funcionar aunque rechaces GA.
              </p>
              <p>
                Puedes rechazar GA y seguir navegando igual. Más info:{" "}
                <Link href="/privacidad">Política de privacidad</Link>
                {" · "}
                <Link href="/cookies">Cookies</Link>
              </p>
            </>
          )}
        </div>
        <div className="cookie-actions">
          <button type="button" data-choice="reject" onClick={reject}>
            {english ? "Decline" : "Rechazar"}
          </button>
          <button type="button" className="accept" data-choice="accept" onClick={accept}>
            {english ? "Accept" : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}
