import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Desarrollador full stack junior. DAM con especialidad full stack. Algo de React. Practico Next.js y busco oportunidades.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return (
    <main className="page">
      <h1>
        <span className="es-only">Sobre mí</span>
        <span className="en-only">About</span>
      </h1>
      <p className="lede enter">
        <span className="es-only">
          Soy desarrollador full stack junior. Terminé el DAM con especialidad en full stack. Tengo
          algo de React y estoy practicando Next.js. Busco oportunidades.
        </span>
        <span className="en-only">
          I&apos;m a junior full stack developer. I finished a DAM with a full stack specialization.
          I have some React and I&apos;m practicing Next.js. I&apos;m looking for opportunities.
        </span>
      </p>
    </main>
  );
}
