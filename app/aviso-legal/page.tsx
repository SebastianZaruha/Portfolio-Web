import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal del sitio web de Sebastian Zaruha.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <main className="page">
      <section className="lang-block" lang="es">
        <p className="eyebrow">ES</p>
        <h1>Aviso legal</h1>
        <p className="updated">Última actualización: 23 de octubre de 2026</p>

        <h2>Titular del sitio</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web,
          sebastianzaruha.com, es titularidad de <strong>Sebastian Zaruha</strong>, Madrid (España).
        </p>
        <p>
          Contacto: <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>
        </p>

        <h2>Finalidad</h2>
        <p>
          Este sitio es el portfolio personal de Sebastian Zaruha. Su objetivo es presentar su perfil
          y su trabajo. No se venden productos ni servicios a través de él.
        </p>

        <h2>Propiedad intelectual</h2>
        <p>
          Salvo que se indique lo contrario, todos los contenidos del sitio (textos, vídeo, imágenes,
          diseño y código) son © Sebastian Zaruha. No está permitida su reproducción, distribución o
          transformación, total o parcial, sin autorización previa por escrito.
        </p>
        <p>
          Las marcas y logotipos de terceros que aparecen (por ejemplo, GitHub, LinkedIn o X)
          pertenecen a sus respectivos titulares.
        </p>

        <h2>Enlaces a otros sitios</h2>
        <p>
          El sitio incluye enlaces a perfiles en plataformas de terceros (
          <a href="https://github.com/SebastianZaruha" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          ,{" "}
          <a href="https://www.linkedin.com/in/sebastianzaruha" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          y{" "}
          <a href="https://x.com/sebastianzaruha" target="_blank" rel="noopener noreferrer">
            X
          </a>
          ). Sebastian Zaruha no controla esos sitios y no se hace responsable de sus contenidos,
          políticas ni prácticas de privacidad.
        </p>

        <h2>Responsabilidad</h2>
        <p>
          Se procura que la información del sitio sea correcta y esté actualizada, pero no se garantiza
          la ausencia de errores ni la disponibilidad continua del servicio.
        </p>

        <h2>Legislación aplicable</h2>
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes
          se someterán a los juzgados y tribunales que correspondan conforme a la ley.
        </p>
      </section>

      <section className="lang-block" lang="en">
        <p className="eyebrow">EN</p>
        <h1>Legal notice</h1>
        <p className="updated">Last updated: 23 October 2026</p>

        <h2>Site owner</h2>
        <p>
          In accordance with article 10 of Spanish Law 34/2002 on Information Society Services and
          Electronic Commerce (LSSI-CE), this website, sebastianzaruha.com, is owned by{" "}
          <strong>Sebastian Zaruha</strong>, Madrid, Spain.
        </p>
        <p>
          Contact: <a href="mailto:sebastianzaruha@gmail.com">sebastianzaruha@gmail.com</a>
        </p>

        <h2>Purpose</h2>
        <p>
          This site is Sebastian Zaruha&apos;s personal portfolio. Its purpose is to present his
          profile and work. No products or services are sold through it.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise noted, all content on this site (texts, video, images, design and code) is
          © Sebastian Zaruha. It may not be reproduced, distributed or modified, in whole or in part,
          without prior written permission.
        </p>
        <p>
          Third-party trademarks and logos shown (e.g. GitHub, LinkedIn or X) belong to their
          respective owners.
        </p>

        <h2>Links to other sites</h2>
        <p>
          This site links to profiles on third-party platforms (
          <a href="https://github.com/SebastianZaruha" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          ,{" "}
          <a href="https://www.linkedin.com/in/sebastianzaruha" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          and{" "}
          <a href="https://x.com/sebastianzaruha" target="_blank" rel="noopener noreferrer">
            X
          </a>
          ). Sebastian Zaruha has no control over those sites and is not responsible for their
          content, policies or privacy practices.
        </p>

        <h2>Liability</h2>
        <p>
          Reasonable care is taken to keep the information on this site accurate and up to date, but it
          is not guaranteed to be error-free or continuously available.
        </p>

        <h2>Applicable law</h2>
        <p>
          This legal notice is governed by Spanish law. Any dispute will be submitted to the competent
          courts in accordance with applicable law.
        </p>
      </section>
    </main>
  );
}
