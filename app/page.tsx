import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_HREF } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "Sebastian V. Zaruha" },
  description: "Desarrollador full stack junior. DAM, especialidad full stack. Practico Next.js.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="display-name">Sebastian V. Zaruha</p>
        <h1 className="claim">
          <span className="es-only">Desarrollador full stack junior.</span>
          <span className="en-only">Junior full stack developer.</span>
        </h1>
        <p className="role">
          <span className="es-only">Terminé el DAM con especialidad full stack. Busco oportunidades.</span>
          <span className="en-only">
            I finished a DAM with a full stack specialization. Looking for opportunities.
          </span>
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
      <section className="think enter" aria-labelledby="now-title">
        <h2 id="now-title">
          <span className="es-only">Ahora</span>
          <span className="en-only">Now</span>
        </h2>
        <ol className="steps">
          <li>
            <span className="step-index">01</span>
            <h3>DAM</h3>
            <p>
              <span className="es-only">Especialidad full stack, terminada.</span>
              <span className="en-only">Full stack specialization, completed.</span>
            </p>
          </li>
          <li>
            <span className="step-index">02</span>
            <h3>React</h3>
            <p>
              <span className="es-only">Algo de práctica.</span>
              <span className="en-only">Some practice.</span>
            </p>
          </li>
          <li>
            <span className="step-index">03</span>
            <h3>Next.js</h3>
            <p>
              <span className="es-only">Lo estoy practicando.</span>
              <span className="en-only">I&apos;m practicing it.</span>
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}
