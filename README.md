# Portfolio definitivo (WIP)

This branch (`definitivo`) is a work in progress. **Production stays on `main`** until this branch is merged on purpose. Do not merge it yet.

El sitio en [sebastianzaruha.com](https://sebastianzaruha.com) sigue siendo el HTML, CSS y JS estáticos de `main`. Esta rama los sustituye solo aquí, por un esqueleto de Next.js (App Router + TypeScript) en la raíz del repositorio. Fusionar esta rama borra ese sitio estático de `main` y pasa el build de Vercel a Next.js.

## Run locally

```bash
npm install && npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué hay

- `/` — nombre, «Desarrollador full stack junior.» / «Junior full stack developer.», y tres datos: DAM, React, Next.js. Acciones «Hablemos» y «Email». Marfil por defecto, ciruela en oscuro.
- `/sobre-mi` y `/hablemos` — texto corto, ES/EN con el selector. `/contacto` redirige a `/hablemos`.
- `/aviso-legal`, `/privacidad` y `/cookies` — textos legales. En privacidad, tipografías e imágenes autoalojadas; no se afirma vídeo. Google Analytics 4 (`G-SZGV9NFPVH`) solo tras aceptar. Vercel Web Analytics sigue activo.
- Tokens en `app/styles/tokens.css`: marfil y ciruela, escala, espacio, radio, duraciones 160–360ms. Nombre en Ephesis. UI en Open Sans.
- Sin Tailwind, sin Three.js, sin vídeo de fondo.

La preferencia del banner se guarda en `localStorage` (`cookie_consent`) con la versión `v1-portfolio-2026-11-05`. No usar el property de Hourglass (`G-LEKYE5VYL2`). `NEXT_PUBLIC_GA_ID` es opcional y solo se tiene en cuenta si vale `G-SZGV9NFPVH` (ver `.env.example`).

## Deploy

`vercel.json` en esta rama fija el framework `nextjs`, así un preview de `definitivo` puede construirse como Next.js. `main` conserva su `vercel.json` de sitio estático. Producción no cambia hasta el merge.
