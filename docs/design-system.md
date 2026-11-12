# mcastillo.dev — Design System

Dirección visual: **Noir Red**. Negro, gris y rojo como única familia cromática, con una estructura editorial: tipografía serif grande, retícula visible y mucho aire. La primera impresión debe ser “este ingeniero tiene criterio”, no “esta plantilla es moderna”.

## Foundations

### Color

| Token         | Valor     | Uso                                                     |
| ------------- | --------- | ------------------------------------------------------- |
| `canvas`      | `#09090a` | Fondo principal                                         |
| `surface`     | `#111113` | Secciones alternas                                      |
| `elevated`    | `#19191c` | Tarjetas y superficies elevadas                         |
| `fg`          | `#f2f1ee` | Texto principal                                         |
| `fg-soft`     | `#c9c7c1` | Texto secundario                                        |
| `muted`       | `#8f8d87` | Labels y metadata (AA sobre canvas, surface y elevated) |
| `line`        | `#2a2a2f` | Bordes hairline                                         |
| `accent`      | `#ff4d3f` | Rojo de marca, foco y énfasis                           |
| `accent-soft` | `#ff8a80` | Rojo claro para texto sobre negro                       |
| `accent-deep` | `#c62318` | Rojo profundo para hover y bordes                       |
| `night`       | `#050506` | Contacto y footer                                       |

Contrastes comprobados: `muted` 6.0:1 sobre `canvas` y 5.3:1 sobre `elevated`; `accent` 6.05:1 sobre `canvas`; `fg` 17.6:1. El texto negro sobre `accent` también cumple AA.

### Tipografía

- **Display:** Fraunces Variable (serif editorial, eje óptico).
- **Cuerpo:** Inter Variable.
- **Labels/metadata:** JetBrains Mono Variable, mayúsculas, tracking `0.16em`.

Escala display: `clamp(3rem, 8.6vw, 7.25rem)`, line-height `0.93`, tracking `-0.045em`. Cuerpo: `1rem–1.125rem`, line-height `1.6–1.7`.

### Layout y ritmo

- Ancho máximo `80rem` (1280 px), padding lateral `20/32/40 px`.
- Retícula de 12 columnas en desktop y líneas verticales sutiles en el hero.
- Secciones con `padding-block: clamp(4.5rem, 9vw, 7.5rem)`.
- Bordes de 1 px; esquinas rectas. Los tags son la única excepción tipo “pill”.
- Alternancia: canvas → surface → canvas → surface → night.

## Componentes

- **Header:** sticky, canvas/90 con blur, monograma rojo con “M” negra, nav mono, switch ES/EN, CTA rojo. En móvil usa `<details>` accesible.
- **Botones:** rectangulares, borde de 1 px, label mono. Primario rojo/negro; hover rojo profundo/texto claro. Secundario transparente; hover blanco/negro. Altura mínima 46 px.
- **Ticker:** banda roja con texto negro y separadores negros translúcidos. Es el momento de color más intenso de la página.
- **Project row:** número, título serif, tagline itálica, descripción, tags, dominio y estado. Hover sobre `surface`; el CTA se vuelve rojo. Toda la fila es enlace cuando hay URL.
- **Section heading:** índice rojo + label gris a la izquierda, título serif, nota a la derecha.
- **Chips:** borde `line`, fondo transparente, mono 11 px; hover rojo con texto negro.
- **Contact:** fondo `night`, borde superior rojo, título enorme, email como acción principal, redes y hora local.

## Motion

- Entrada al hacer scroll: opacity `0 → 1`, translateY `18px → 0`, 700 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 40–70 ms.
- Hover: 180–260 ms.
- Ticker: marquee de 42 s, se pausa al hover.
- `prefers-reduced-motion`: desactiva transforms, marquee y reveals; el contenido queda visible.

## Accesibilidad

- WCAG 2.2 AA: texto normal ≥ 4.5:1; display ≥ 3:1.
- Un solo `h1`, landmarks semánticos, skip link, foco visible rojo.
- Touch targets ≥ 44 px.
- `lang` correcto por página y `hreflang` ES/EN/x-default.
- Nada se comunica solo por color.
- Enlaces externos con texto descriptivo y `rel="noopener noreferrer"`.

## Anti-patrones

- Añadir verdes, azules, amarillos o morados como acentos: la paleta se limita a negro, gris, blanco y rojo.
- Toggle de light mode: el sitio es dark-first por decisión; `night` es una variación más profunda, no un tema alternativo.
- Gradientes, glassmorphism, blobs 3D, parallax, autoplay, carruseles.
- Hex sueltos en componentes; usa tokens.
- Copy genérico de agencia (“innovative solutions”, “passionate developer”).
- Scrollbars personalizados.

## QA

- `npm run check` y `npm run build` pasan.
- Sin overflow horizontal en 320, 360, 390, 768, 1024 y 1440 px.
- Navegación completa con teclado y reduced motion.
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO.
- Enlaces, email y metadatos OG verificados.
