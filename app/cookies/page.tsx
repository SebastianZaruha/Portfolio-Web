import type { Metadata } from "next";
import Link from "next/link";
import { GA_MEASUREMENT_ID } from "@/lib/ga";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de sebastianzaruha.com. Google Analytics solo con consentimiento.",
};

export default function CookiesPage() {
  return (
    <main className="page">
      <section className="lang-block" lang="es">
        <p className="eyebrow">ES</p>
        <h1>Política de cookies</h1>
        <p className="updated">Última actualización: 5 de noviembre de 2026</p>
        <p>
          Responsable: Sebastián Zaruha, Madrid (España). Contacto:{" "}
          <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>
        </p>

        <h2>Qué son</h2>
        <p>
          Las cookies y tecnologías similares almacenan o leen información en tu dispositivo cuando
          visitas sebastianzaruha.com.
        </p>

        <h2>Tipos que usamos</h2>
        <ol>
          <li>
            <strong>Necesarias / técnicas</strong> (no requieren consentimiento): guardar tu elección
            de cookies (<code>cookie_consent</code> o similar) y, si aplica, preferencias básicas de
            interfaz.
          </li>
          <li>
            <strong>Analítica con cookies — Google Analytics 4</strong> (solo con consentimiento):
            cookies <code>_ga</code>, <code>_ga_*</code> (titular Google), finalidad medir visitas,
            páginas y uso; duración típica hasta ~13 meses (según configuración). Measurement ID:{" "}
            {GA_MEASUREMENT_ID}.
          </li>
          <li>
            <strong>Vercel Web Analytics</strong>: no usa cookies de seguimiento; estadísticas
            agregadas del propio sitio. No requiere el consentimiento de cookies; se informa aquí por
            transparencia.
          </li>
        </ol>

        <h2>Transferencias</h2>
        <p>
          Google Analytics puede implicar tratamiento en Estados Unidos. Google LLC está certificado
          en el EU-U.S. Data Privacy Framework:{" "}
          <a href="https://www.dataprivacyframework.gov/list" target="_blank" rel="noopener noreferrer">
            https://www.dataprivacyframework.gov/list
          </a>
        </p>

        <h2>Cómo gestionarlas</h2>
        <p>
          En el banner: Aceptar o Rechazar. Puedes cambiar tu elección en cualquier momento con{" "}
          <strong>«Configurar cookies»</strong> en el pie de página, o borrar cookies desde tu
          navegador.
        </p>
        <p>
          Más detalle de tratamientos: <Link href="/privacidad">Política de privacidad</Link>.
        </p>
      </section>

      <section className="lang-block" lang="en">
        <p className="eyebrow">EN</p>
        <h1>Cookie policy</h1>
        <p className="updated">Last updated: 5 November 2026</p>
        <p>
          Controller: Sebastián Zaruha, Madrid, Spain. Contact:{" "}
          <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>
        </p>

        <h2>What they are</h2>
        <p>
          Cookies and similar technologies store or read information on your device when you visit
          sebastianzaruha.com.
        </p>

        <h2>Types we use</h2>
        <ol>
          <li>
            <strong>Necessary / technical</strong> (no consent required): store your cookie choice (
            <code>cookie_consent</code> or similar) and, if any, basic UI preferences.
          </li>
          <li>
            <strong>Analytics cookies — Google Analytics 4</strong> (consent only): <code>_ga</code>,{" "}
            <code>_ga_*</code> (Google), to measure visits, pages and use; typical lifetime up to ~13
            months. Measurement ID: {GA_MEASUREMENT_ID}.
          </li>
          <li>
            <strong>Vercel Web Analytics</strong>: no tracking cookies; aggregate first-party stats.
            Not cookie-consent based; listed for transparency.
          </li>
        </ol>

        <h2>Transfers</h2>
        <p>
          Google Analytics may involve processing in the United States. Google LLC is certified under
          the EU-U.S. Data Privacy Framework:{" "}
          <a href="https://www.dataprivacyframework.gov/list" target="_blank" rel="noopener noreferrer">
            https://www.dataprivacyframework.gov/list
          </a>
        </p>

        <h2>How to manage</h2>
        <p>
          Use Accept or Decline on the banner. Change anytime via <strong>Cookie settings</strong> in
          the footer, or clear cookies in your browser.
        </p>
        <p>
          Details: <Link href="/privacidad">Privacy policy</Link>.
        </p>
      </section>
    </main>
  );
}
