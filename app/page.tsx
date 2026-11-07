import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_HREF } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "Sebastian V. Zaruha" },
  description: "Analizo antes de construir. Junior full stack. Criterio de diseño.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="display-name">Sebastian V. Zaruha</p>
        <h1 className="claim">
          <span className="es-only">Analizo antes de construir.</span>
          <span className="en-only">Think before I ship.</span>
        </h1>
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
      </section>
      <section className="think enter" aria-labelledby="think-title">
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
          <li>
            <span className="step-index">03</span>
            <h3>
              <span className="es-only">Construyo</span>
              <span className="en-only">Build</span>
            </h3>
            <p>
              <span className="es-only">Ahí entran React o Python. El orden es el criterio.</span>
              <span className="en-only">Then React or Python. The order is the judgment.</span>
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}
