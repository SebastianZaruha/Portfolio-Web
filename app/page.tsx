import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_HREF } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Sebastian V. Zaruha",
  description: "Analizo antes de construir. Junior full stack. Criterio de diseño.",
};

export default function Home() {
  return (
    <main className="home">
      <p className="display-name">Sebastian V. Zaruha</p>
      <h1 className="claim">
        <span className="es-only">Analizo antes de construir.</span>
        <span className="en-only">Think before I ship.</span>
      </h1>
      <p className="role enter">
        <span className="es-only">Junior full stack. Criterio de diseño.</span>
        <span className="en-only">Junior full stack. Design judgment.</span>
      </p>
      <div className="actions enter enter-late">
        <Link className="btn btn-primary" href="/hablemos">
          Hablemos
        </Link>
        <a className="btn" href={CONTACT_HREF}>
          Email
        </a>
      </div>
    </main>
  );
}
