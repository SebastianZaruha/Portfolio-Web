import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Borrador de la política de privacidad. No sustituye al texto publicado.",
};

export default function PrivacidadPage() {
  return (
    <main className="page">
      <p className="eyebrow">Borrador</p>
      <h1>Privacidad</h1>
      <p>
        Texto pendiente. La política de privacidad vigente sigue publicada en el
        sitio estático de la rama main, hasta que esta versión se fusione a
        propósito.
      </p>
    </main>
  );
}
