import type { MetadataRoute } from "next";

const routes = ["", "/sobre-mi", "/hablemos", "/aviso-legal", "/privacidad", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-07");
  return routes.map((route) => ({
    url: `https://sebastianzaruha.com${route || "/"}`,
    lastModified,
  }));
}
