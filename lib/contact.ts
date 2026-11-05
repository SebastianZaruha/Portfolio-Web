/** Destination is only used inside mailto URLs, never rendered as text. */
export const CONTACT_HREF = "mailto:sebastianzaruha+web@gmail.com";

export const GITHUB_HREF = "https://github.com/SebastianZaruha";
export const LINKEDIN_HREF = "https://www.linkedin.com/in/sebastianzaruha";

export function composeMailto(input: {
  name: string;
  email: string;
  message: string;
  english: boolean;
}): string {
  const subject = input.english ? `Let's talk — ${input.name}` : `Hablemos — ${input.name}`;
  const body = input.english
    ? `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`
    : `Nombre: ${input.name}\nEmail: ${input.email}\n\n${input.message}`;
  return `${CONTACT_HREF}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
