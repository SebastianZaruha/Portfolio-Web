# Portfolio definitivo (WIP)

This branch (`definitivo`) is a work in progress. **Production stays on `main`** until this branch is merged on purpose. Do not merge it yet.

El sitio en [sebastianzaruha.com](https://sebastianzaruha.com) sigue siendo el HTML, CSS y JS estáticos de `main`. Esta rama los sustituye solo aquí, por un esqueleto de Next.js (App Router + TypeScript) en la raíz del repositorio. Fusionar esta rama borra ese sitio estático de `main` y pasa el build de Vercel a Next.js.

## Run locally

```bash
npm install && npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué hay

- `/` — claim: «Analizo antes de construir.» El cambio a inglés queda para más adelante.
- `/sobre-mi`, `/aviso-legal` y `/privacidad` — contenido de relleno. No sustituyen los textos legales publicados.
- CSS plano y paleta casi negra (fondo cálido, neutros, un acento). Sin Tailwind, sin Three.js y sin vídeo de fondo.
- Tipografía de sistema, hasta traer fuentes autoalojadas.

## Deploy

`vercel.json` en esta rama fija el framework `nextjs`, así un preview de `definitivo` puede construirse como Next.js. `main` conserva su `vercel.json` de sitio estático. Producción no cambia hasta el merge.
