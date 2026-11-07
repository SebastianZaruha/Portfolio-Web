"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { composeMailto, CONTACT_HREF, GITHUB_HREF, LINKEDIN_HREF } from "@/lib/contact";

type Errors = {
  name?: boolean;
  email?: boolean;
  message?: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "ready" | "failed">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {
      name: name.length < 2,
      email: !EMAIL.test(email),
      message: message.length < 8,
    };
    setErrors(next);
    if (next.name || next.email || next.message) {
      setStatus("failed");
      return;
    }

    const english = document.documentElement.lang === "en";
    const href = composeMailto({ name, email, message, english });
    const link = document.createElement("a");
    link.href = href;
    link.rel = "nofollow";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setStatus("ready");
  }

  return (
    <>
      <form className="form" action={CONTACT_HREF} method="post" encType="text/plain" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="contact-name">
            <span className="es-only">Nombre</span>
            <span className="en-only">Name</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name || undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            required
          />
          {errors.name ? (
            <p id="contact-name-error" className="field-error">
              <span className="es-only">Escribe tu nombre.</span>
              <span className="en-only">Write your name.</span>
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email || undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
          {errors.email ? (
            <p id="contact-email-error" className="field-error">
              <span className="es-only">Ese email no parece válido.</span>
              <span className="en-only">That email does not look valid.</span>
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-message">
            <span className="es-only">Mensaje</span>
            <span className="en-only">Message</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            aria-invalid={errors.message || undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            required
          />
          {errors.message ? (
            <p id="contact-message-error" className="field-error">
              <span className="es-only">Escribe un mensaje breve.</span>
              <span className="en-only">Write a short message.</span>
            </p>
          ) : null}
        </div>
        <button className="btn btn-primary" type="submit">
          Email
        </button>
        {status === "ready" ? (
          <p className="status" role="status">
            <span className="es-only">Se abrió tu correo con el mensaje. Aún no está enviado.</span>
            <span className="en-only">Your mail app opened with the message. It is not sent yet.</span>
          </p>
        ) : null}
        {status === "failed" ? (
          <p className="status" role="alert">
            <span className="es-only">Revisa los campos marcados.</span>
            <span className="en-only">Check the marked fields.</span>
          </p>
        ) : null}
      </form>
      <p className="note">
        <span className="es-only">
          El mensaje se abre en tu correo. Esta página no lo envía. Responsable: Sebastián Zaruha.
          Finalidad: responderte. Sin envíos comerciales. Derechos en la{" "}
          <Link href="/privacidad">política de privacidad</Link>.
        </span>
        <span className="en-only">
          The message opens in your mail app. This page does not send it. Controller: Sebastián
          Zaruha. Purpose: to reply. No marketing mail. Rights are in the{" "}
          <Link href="/privacidad">privacy policy</Link>.
        </span>
      </p>
      <ul className="links">
        <li>
          <a href={GITHUB_HREF} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </>
  );
}
