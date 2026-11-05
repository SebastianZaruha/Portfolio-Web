import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Perfil de Sebastian V. Zaruha. Texto pendiente.",
};

export default function SobreMiPage() {
  return (
    <main className="page">
      <p className="eyebrow">Borrador</p>
      <h1>Sobre mí</h1>
      <p>
        El perfil se escribirá aquí. Mientras tanto, el sitio publicado sigue
        siendo el HTML estático de la rama main.
      </p>
    </main>
  );
}
