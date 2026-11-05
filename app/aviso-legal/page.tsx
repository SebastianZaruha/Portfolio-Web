import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Borrador del aviso legal. No sustituye al texto publicado.",
};

export default function AvisoLegalPage() {
  return (
    <main className="page">
      <p className="eyebrow">Borrador</p>
      <h1>Aviso legal</h1>
      <p>
        Texto pendiente. El aviso legal vigente sigue publicado en el sitio
        estático de la rama main, hasta que esta versión se fusione a propósito.
      </p>
    </main>
  );
}
