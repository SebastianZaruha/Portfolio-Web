# sebastianzaruha.com

Portfolio personal (en construcción). Web estática (HTML/CSS/JS, sin framework) desplegada en Vercel desde la rama `main`.

## Estructura

```
index.html          Home (vídeo de fondo + panel + iconos sociales + pie)
aviso-legal.html    /aviso-legal  (Aviso legal, LSSI art. 10) — ES/EN
privacidad.html     /privacidad   (Política de privacidad, RGPD/LOPDGDD) — ES/EN
assets/site-v4.css  Estilos compartidos
assets/site-v4.js   Idioma ES/EN (localStorage) + reproducción del vídeo
fonts/              Instrument Serif + Manrope (woff2, self-hosted)
media/              Vídeo de fondo (mp4 + webm) y póster
favicon.svg
vercel.json         cleanUrls, caché larga para media/fonts/assets, redirects
```

## Notas

- `media/`, `fonts/` y `assets/` se sirven con caché de 1 año (`immutable`): si cambias uno de esos ficheros, **cambia también su nombre** (p. ej. `site-v5.css`) y actualiza las referencias en los HTML.
- Textos traducibles: atributos `data-i18n` + objeto `window.I18N` en cada página; los bloques largos usan `data-lang="es|en"`.
- Vercel Web Analytics: script `/_vercel/insights/script.js` incluido en todas las páginas (activar Analytics en el proyecto de Vercel).
