import type { Metadata } from "next";
import Link from "next/link";
import { GA_MEASUREMENT_ID } from "@/lib/ga";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de sebastianzaruha.com. Google Analytics solo con consentimiento; Vercel Web Analytics sin cookies.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <main className="page">
      <section className="lang-block" lang="es">
        <p className="eyebrow">ES</p>
        <h1>Política de privacidad</h1>
        <p className="updated">Última actualización: 5 de noviembre de 2026</p>

        <h2>Responsable del tratamiento</h2>
        <p>Sebastián Zaruha, Madrid (España).</p>
        <p>
          Contacto: <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>
        </p>

        <h2>Resumen</h2>
        <p>
          Este sitio es el portfolio personal de Sebastián Zaruha. No hay registro de usuarios. La
          navegación no exige datos identificativos. La <strong>analítica con cookies (Google Analytics)</strong>{" "}
          solo se activa si lo aceptas en el banner.
        </p>

        <h2>Analítica y cookies</h2>
        <ol>
          <li>
            <strong>Vercel Web Analytics</strong> (Vercel Inc.): estadísticas agregadas del propio
            sitio (p. ej. visitas, páginas, país o tipo de dispositivo a nivel agregado),{" "}
            <strong>sin cookies</strong> de seguimiento entre sitios. Base jurídica: interés legítimo
            en conocer el uso del sitio de forma agregada (art. 6.1.f RGPD), en la medida en que no
            identifique a personas concretas ni haga seguimiento cross-site.
          </li>
          <li>
            <strong>Google Analytics 4</strong> (Google Ireland Limited / Google LLC),{" "}
            <strong>solo con tu consentimiento</strong> (art. 6.1.a RGPD; art. 22.2 LSSI): cookies e
            identificadores para medir visitas, páginas y uso. Puedes rechazar y seguir navegando;
            puedes retirar el consentimiento en «Configurar cookies» del pie. Detalle de cookies:{" "}
            <Link href="/cookies">Política de cookies</Link>. Measurement ID: {GA_MEASUREMENT_ID}.
          </li>
        </ol>
        <p>
          Los datos de Google pueden tratarse en <strong>Estados Unidos</strong>. Google LLC figura en
          el EU-U.S. Data Privacy Framework (
          <a href="https://www.dataprivacyframework.gov/list" target="_blank" rel="noopener noreferrer">
            https://www.dataprivacyframework.gov/list
          </a>
          ). También pueden aplicar las cláusulas contractuales tipo de Google.
        </p>

        <h2>Alojamiento</h2>
        <p>
          El sitio está alojado en Vercel Inc. (EE. UU.). Como cualquier servidor web, Vercel puede
          tratar datos técnicos (p. ej. dirección IP) en registros para entregar la web y garantizar
          su seguridad. Transferencias: Cláusulas Contractuales Tipo y/o Data Privacy Framework, según
          corresponda.
        </p>

        <h2>Recursos propios</h2>
        <p>
          Las tipografías y las imágenes están autoalojadas en el propio sitio, sin cargar Google
          Fonts ni otros proveedores externos de contenido por defecto.
        </p>

        <h2>Formulario de contacto</h2>
        <p>
          Cuando el sitio disponga de un formulario de contacto, los datos que envíes (nombre, email y
          mensaje) se usarán únicamente para responderte. Base jurídica: tu solicitud / medidas
          precontractuales o consentimiento, según el texto junto al formulario. Se conservarán el
          tiempo necesario para atender la consulta (orientativo: hasta 12 meses tras cerrarla) y no
          se usarán para envíos comerciales ni se cederán a terceros salvo obligación legal. El
          proveedor técnico que transporte el mensaje actuará como encargado.
        </p>
        <h3>Primera capa junto al formulario</h3>
        <p>
          Responsable: Sebastián Zaruha. Finalidad: atender tu mensaje. Derechos: acceso,
          rectificación, supresión y demás ante sebastianzaruha@gmail.com. Más info: Política de
          privacidad. No usaremos tus datos para envíos comerciales.
        </p>

        <h2>Derechos</h2>
        <p>
          Puedes ejercer acceso, rectificación, supresión, limitación, portabilidad y oposición, y
          retirar el consentimiento de analítica, escribiendo a{" "}
          <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>.
        </p>
        <p>
          También puedes reclamar ante la Agencia Española de Protección de Datos:{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            https://www.aepd.es
          </a>
        </p>

        <h2>Normativa</h2>
        <p>
          RGPD (UE) 2016/679, LOPDGDD y LSSI-CE. Esta política puede actualizarse; la fecha figura
          arriba.
        </p>
      </section>

      <section className="lang-block" lang="en">
        <p className="eyebrow">EN</p>
        <h1>Privacy policy</h1>
        <p className="updated">Last updated: 5 November 2026</p>

        <h2>Data controller</h2>
        <p>Sebastián Zaruha, Madrid, Spain.</p>
        <p>
          Contact: <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>
        </p>

        <h2>Summary</h2>
        <p>
          This site is Sebastián Zaruha&apos;s personal portfolio. There are no user accounts.
          Browsing does not require identifying data.{" "}
          <strong>Cookie-based analytics (Google Analytics)</strong> only runs if you accept on the
          banner.
        </p>

        <h2>Analytics and cookies</h2>
        <ol>
          <li>
            <strong>Vercel Web Analytics</strong> (Vercel Inc.): aggregate first-party stats (e.g.
            visits, pages, country or device type at aggregate level), <strong>without</strong>{" "}
            cross-site tracking cookies. Legal basis: legitimate interest in understanding site use in
            aggregate (GDPR art. 6(1)(f)), insofar as it does not identify individuals or track across
            sites.
          </li>
          <li>
            <strong>Google Analytics 4</strong> (Google Ireland Limited / Google LLC),{" "}
            <strong>only with your consent</strong> (GDPR art. 6(1)(a); ePrivacy / LSSI): cookies and
            identifiers to measure visits, pages and use. You may decline and keep browsing; withdraw
            anytime via Cookie settings in the footer. Details:{" "}
            <Link href="/cookies">Cookie policy</Link>. Measurement ID: {GA_MEASUREMENT_ID}.
          </li>
        </ol>
        <p>
          Google data may be processed in the <strong>United States</strong>. Google LLC is listed
          under the EU-U.S. Data Privacy Framework (
          <a href="https://www.dataprivacyframework.gov/list" target="_blank" rel="noopener noreferrer">
            https://www.dataprivacyframework.gov/list
          </a>
          ). Google&apos;s Standard Contractual Clauses may also apply.
        </p>

        <h2>Hosting</h2>
        <p>
          Hosted on Vercel Inc. (USA). Server logs may include technical data (e.g. IP) to deliver and
          secure the site. Transfers: SCCs and/or the Data Privacy Framework, as applicable.
        </p>

        <h2>Self-hosted resources</h2>
        <p>
          Fonts and images are self-hosted on this site, with no Google Fonts or other external
          content providers by default.
        </p>

        <h2>Contact form</h2>
        <p>
          When a contact form is available, data you send (name, email, message) is used only to
          reply. Legal basis: your request / pre-contractual steps or consent, as stated next to the
          form. Kept as long as needed to handle the query (indicative: up to 12 months after closing)
          and not used for marketing or shared except where required by law. Any message-transport
          provider acts as a processor.
        </p>
        <h3>First-layer notice by the form</h3>
        <p>
          Controller: Sebastián Zaruha. Purpose: reply to your message. Rights: access, rectification,
          erasure and others via sebastianzaruha@gmail.com. More: Privacy policy. We will not use your
          data for marketing emails.
        </p>

        <h2>Your rights</h2>
        <p>
          You may request access, rectification, erasure, restriction, portability and objection, and
          withdraw analytics consent, at{" "}
          <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>.
        </p>
        <p>
          You may also complain to the Spanish DPA (AEPD):{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            https://www.aepd.es
          </a>
        </p>

        <h2>Law</h2>
        <p>GDPR, Spanish LOPDGDD and LSSI-CE. This policy may change; the date is above.</p>
      </section>
    </main>
  );
}
