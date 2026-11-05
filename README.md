# Portfolio definitivo (WIP)

This branch (`definitivo`) is a work in progress. **Production stays on `main`** until this branch is merged on purpose. Do not merge it yet.

El sitio en [sebastianzaruha.com](https://sebastianzaruha.com) sigue siendo el HTML, CSS y JS estáticos de `main`. Esta rama los sustituye solo aquí, por un esqueleto de Next.js (App Router + TypeScript) en la raíz del repositorio. Fusionar esta rama borra ese sitio estático de `main` y pasa el build de Vercel a Next.js.

## Run locally

```bash
npm install && npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué hay

- `/` — claim: «Analizo antes de construir.»
- `/sobre-mi` — borrador.
- `/aviso-legal`, `/privacidad` y `/cookies` — textos legales (ES + EN). Google Analytics 4 (`G-SZGV9NFPVH`) solo se carga si se acepta el banner. Vercel Web Analytics no usa cookies y permanece activo.
- CSS plano y paleta casi negra. Sin Tailwind, sin Three.js y sin vídeo de fondo.
- Tipografía de sistema, hasta traer fuentes autoalojadas.

La preferencia del banner se guarda en `localStorage` (`cookie_consent`) con la versión `v1-portfolio-2026-11-05`. No usar el property de Hourglass (`G-LEKYE5VYL2`). `NEXT_PUBLIC_GA_ID` es opcional y solo se tiene en cuenta si vale `G-SZGV9NFPVH` (ver `.env.example`).

## Deploy

`vercel.json` en esta rama fija el framework `nextjs`, así un preview de `definitivo` puede construirse como Next.js. `main` conserva su `vercel.json` de sitio estático. Producción no cambia hasta el merge.
