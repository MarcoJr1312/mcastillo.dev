# mcastillo.dev — Design System

Dirección visual: **Quiet Editorial**. La tipografía y el contenido hacen el trabajo; los efectos decorativos no. La primera impresión debe ser “este ingeniero tiene criterio”, no “esta plantilla es moderna”.

## Foundations

### Color

| Token          | Valor     | Uso                                             |
| -------------- | --------- | ----------------------------------------------- |
| `paper`        | `#f3efe6` | Fondo principal                                 |
| `paper-deep`   | `#e9e2d4` | Secciones alternas                              |
| `ink`          | `#17150f` | Texto y superficies oscuras                     |
| `ink-soft`     | `#4c4739` | Texto secundario                                |
| `muted`        | `#665f50` | Labels y metadata (AA sobre paper y paper-deep) |
| `line`         | `#d9d1c1` | Bordes hairline                                 |
| `accent`       | `#b23a22` | Acento, foco, énfasis                           |
| `accent-light` | `#e8836b` | Acento sobre fondo oscuro                       |
| `night`        | `#12110d` | Sección de contacto y footer                    |

### Tipografía

- **Display:** Fraunces Variable (serif editorial, eje óptico).
- **Cuerpo:** Inter Variable.
- **Labels/metadata:** JetBrains Mono Variable, mayúsculas, tracking `0.16em`.

Escala display: `clamp(3rem, 8.6vw, 7.25rem)`, line-height `0.93`, tracking `-0.045em`. Cuerpo: `1rem–1.125rem`, line-height `1.6–1.7`.

### Layout y ritmo

- Ancho máximo `80rem` (1280 px), padding lateral `20/32/40 px`.
- Retícula de 12 columnas en desktop.
- Secciones con `padding-block: clamp(4.5rem, 9vw, 7.5rem)`.
- Bordes de 1 px; esquinas rectas. Los tags son la única excepción tipo “pill”.
- Alternancia: paper → paper-deep → paper → paper-deep → night.

## Componentes

- **Header:** sticky, paper/90 con blur, monograma, nav mono, switch ES/EN, CTA. En móvil usa `<details>` accesible.
- **Botones:** rectangulares, borde de 1 px, label mono. Primario ink/paper; hover accent. Secundario transparente; hover ink. Altura mínima 46 px.
- **Project row:** número, título serif, tagline itálica, descripción, tags, dominio y estado. Toda la fila es enlace cuando hay URL.
- **Section heading:** índice + label a la izquierda, título serif, nota a la derecha.
- **Chips:** borde line, fondo transparente, mono 11 px.
- **Contact:** fondo night, título enorme, email como acción principal, redes y hora local.

## Motion

- Entrada al hacer scroll: opacity `0 → 1`, translateY `18px → 0`, 700 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 40–70 ms.
- Hover: 180–260 ms.
- Ticker: marquee de 42 s, se pausa al hover.
- `prefers-reduced-motion`: desactiva transforms, marquee y reveals; el contenido queda visible.

## Accesibilidad

- WCAG 2.2 AA: texto normal ≥ 4.5:1; display ≥ 3:1.
- Un solo `h1`, landmarks semánticos, skip link, foco visible.
- Touch targets ≥ 44 px.
- `lang` correcto por página y `hreflang` ES/EN/x-default.
- Nada se comunica solo por color.
- Enlaces externos con texto descriptivo y `rel="noopener noreferrer"`.

## Anti-patrones

- Toggle de dark mode: el sitio es editorial claro por decisión; la sección night es composición.
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
