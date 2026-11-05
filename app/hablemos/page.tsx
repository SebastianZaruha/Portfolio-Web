import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Hablemos",
  description: "Si encaja lo que buscas, escríbeme.",
};

export default function HablemosPage() {
  return (
    <main className="page">
      <h1>Hablemos</h1>
      <p className="lede">
        <span className="es-only">Si encaja lo que buscas, escríbeme.</span>
        <span className="en-only">If this fits what you need, email me.</span>
      </p>
      <div className="enter">
        <ContactForm />
      </div>
    </main>
  );
}
