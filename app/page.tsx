import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_HREF, GITHUB_HREF, LINKEDIN_HREF } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "Sebastian V. Zaruha" },
  description: "Analizo antes de construir. Junior full stack. Criterio de diseño.",
  alternates: { canonical: "/" },
  openGraph: {
    images: [
      {
        url: "/painting/selected.jpg",
        width: 2160,
        height: 2700,
        alt: "Fondo visual del portfolio de Sebastian V. Zaruha",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <section className="plate plate-intro">
          <div className="plate-copy">
            <h1 className="intro-name">Sebastian V. Zaruha</h1>
            <p className="role">
              <span className="es-only">Junior full stack. Criterio de diseño.</span>
              <span className="en-only">Junior full stack. Design judgment.</span>
            </p>
            <p className="claim">
              <span className="es-only">Analizo antes de construir.</span>
              <span className="en-only">Think before I ship.</span>
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href="/hablemos">
                Hablemos
              </Link>
              <a className="btn" href={CONTACT_HREF}>
                Email
              </a>
            </div>
            <p className="fresco-note">
              <span className="es-only">El fresco es un fondo visual. No lo pinté yo.</span>
              <span className="en-only">The fresco is a visual backdrop. I did not paint it.</span>
            </p>
          </div>
        </section>

        <section className="plate plate-architect" aria-labelledby="architect-title">
          <div className="plate-copy">
            <p className="chapter-kicker">01</p>
            <h2 id="architect-title">
              <span className="es-only">Arquitectura</span>
              <span className="en-only">Architecture</span>
            </h2>
            <p className="lede">
              <span className="es-only">
                Antes de programar me formé en arquitectura. Me dejó el hábito: analizar antes de
                construir, cuidar el diseño y pensar en quién lo usa de verdad. Trabajo con React y
                Python. Soy junior: lo digo sin rodeos.
              </span>
              <span className="en-only">
                Before I started coding, I studied architecture. It left a habit: think before I build,
                care about design, and remember who actually uses it. I work with React and Python. I’m
                junior — I say that plainly.
              </span>
            </p>
          </div>
        </section>

        <section className="plate plate-thinker" aria-labelledby="think-title">
          <div className="plate-copy">
            <p className="chapter-kicker">02</p>
            <h2 id="think-title">
              <span className="es-only">Cómo pienso</span>
              <span className="en-only">How I think</span>
            </h2>
            <ol className="steps">
              <li>
                <span className="step-index">01</span>
                <h3>
                  <span className="es-only">Observo</span>
                  <span className="en-only">Observe</span>
                </h3>
                <p>
                  <span className="es-only">
                    Antes del editor miro el flujo: qué se lee primero y qué estorba.
                  </span>
                  <span className="en-only">
                    Before the editor I look at the flow: what is read first, and what gets in the way.
                  </span>
                </p>
              </li>
              <li>
                <span className="step-index">02</span>
                <h3>
                  <span className="es-only">Decido</span>
                  <span className="en-only">Decide</span>
                </h3>
                <p>
                  <span className="es-only">
                    Si no cabe en la primera pantalla, se recorta. El claim va delante del nombre.
                  </span>
                  <span className="en-only">
                    If it does not fit the first screen, it gets cut. The claim leads the name.
                  </span>
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="plate plate-builder" aria-labelledby="build-title">
          <div className="plate-copy">
            <p className="chapter-kicker">03</p>
            <h2 id="build-title">
              <span className="es-only">Construyo</span>
              <span className="en-only">Build</span>
            </h2>
            <p className="lede">
              <span className="es-only">Ahí entran React o Python. El orden es el criterio.</span>
              <span className="en-only">Then React or Python. The order is the judgment.</span>
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href="/hablemos">
                Hablemos
              </Link>
              <a className="btn" href={CONTACT_HREF}>
                Email
              </a>
            </div>
          </div>
        </section>

      <section className="resolve" aria-labelledby="resolve-title">
        <div className="resolve-inner">
          <p className="chapter-kicker">Sebastian V. Zaruha</p>
          <h2 id="resolve-title">Hablemos</h2>
          <p className="lede">
            <span className="es-only">Si encaja lo que buscas, escríbeme.</span>
            <span className="en-only">If this fits what you need, email me.</span>
          </p>
          <p className="role">
            <span className="es-only">Junior full stack. Criterio de diseño.</span>
            <span className="en-only">Junior full stack. Design judgment.</span>
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/hablemos">
              Hablemos
            </Link>
            <a className="btn" href={CONTACT_HREF}>
              Email
            </a>
          </div>
          <ul className="links">
            <li>
              <a href={GITHUB_HREF} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
