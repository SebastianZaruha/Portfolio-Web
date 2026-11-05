import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Antes de programar me formé en arquitectura. Trabajo con React y Python. Soy junior.",
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
          Antes de programar me formé en arquitectura. Me dejó el hábito: analizar antes de
          construir, cuidar el diseño y pensar en quién lo usa de verdad. Trabajo con React y Python.
          Soy junior: lo digo sin rodeos.
        </span>
        <span className="en-only">
          Before code, I studied architecture. It left a habit: think before I build, care about
          design, and remember who actually uses it. I work with React and Python. I’m junior — I say
          that plainly.
        </span>
      </p>
    </main>
  );
}
