import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sebastian V. Zaruha",
    template: "%s · Sebastian V. Zaruha",
  },
  description: "Portfolio de Sebastian V. Zaruha. En construcción.",
};

export const viewport: Viewport = {
  themeColor: "#141311",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="site">
          <header className="site-header">
            <Link className="wordmark" href="/">
              Sebastian V. Zaruha
            </Link>
            <nav className="nav" aria-label="Secciones">
              <Link href="/sobre-mi">Sobre mí</Link>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <p>© 2026 Sebastian Zaruha</p>
            <nav className="nav" aria-label="Legal">
              <Link href="/aviso-legal">Aviso legal</Link>
              <Link href="/privacidad">Privacidad</Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
