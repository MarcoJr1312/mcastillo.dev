# mcastillo.dev

Sitio personal y hub de proyectos de **Marco Castillo**, software engineer en Barrie, Canadá. Incluye un manifiesto sobre ingeniería en la era de la IA, además del perfil, la experiencia y los proyectos; cada proyecto vivirá en su propio subdominio.

- **Stack:** Astro 7, Tailwind CSS 4, TypeScript.
- **Idiomas:** español en `/`, inglés en `/en/`.
- **Diseño:** “Noir Red” — negro, gris y rojo, con Fraunces + Inter + JetBrains Mono.
- **Deploy previsto:** estático en Vercel o Cloudflare Pages.

## Requisitos

- Node.js `>=22.12` (probado con Node 26).
- npm 11+.

## Empezar

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ en local
npm run check      # Astro + TypeScript
npm run format     # Prettier
npm run og         # regenera public/og.svg y public/og.png
```

## Estructura

```text
mcastillo.dev/
├── public/                 # favicon, OG, robots, manifest
├── scripts/                # generador de la imagen OG
├── src/
│   ├── components/         # secciones y piezas de la landing
│   ├── i18n/content.ts     # todo el copy ES/EN + datos de proyectos
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro     # español
│   │   ├── en/index.astro  # inglés
│   │   └── 404.astro
│   └── styles/global.css   # tokens, componentes y utilidades
├── docs/                   # sistema de diseño y skills de referencia
├── astro.config.mjs
├── .orkai.yaml
└── package.json
```

## Editar contenido

Casi todo el contenido vive en `src/i18n/content.ts`:

- `site`: nombre, email, GitHub, LinkedIn, ubicación.
- `meta`: title y description por idioma.
- `philosophy`: manifiesto, párrafos, cita y principios de trabajo.
- `hero`, `work`, `about`, `stack`, `experience`, `contact`, `footer`: copy bilingüe.
- `work.projects`: proyectos, dominio previsto, tags, estado y URL.

Al añadir un proyecto, actualiza **ambos idiomas** y el array de proyectos del idioma correspondiente. Los enlaces externos deben llevar `target="_blank"` y `rel="noopener noreferrer"` (el componente `ProjectRow` ya lo hace).

## Rutas y SEO

| Ruta                 | Contenido                               |
| -------------------- | --------------------------------------- |
| `/`                  | Landing en español                      |
| `/en/`               | Landing en inglés                       |
| `/404.html`          | Página no encontrada bilingüe           |
| `/sitemap-index.xml` | Sitemap generado por `@astrojs/sitemap` |
| `/robots.txt`        | Reglas de rastreo                       |
| `/og.png`            | Imagen social 1200×630                  |

`BaseLayout.astro` genera canonical, `hreflang` ES/EN/x-default, Open Graph, Twitter Card y JSON-LD de tipo `Person`. El dominio canónico se define en `astro.config.mjs` con `site: 'https://mcastillo.dev'`.

## Diseño

La dirección visual y las reglas de implementación están documentadas en:

- `docs/design-system.md` — tokens, tipografía, componentes, motion y accesibilidad.
- `docs/design-skills/` — copias de referencia de las skills **Editorial** y **Minimal** de [awesome-design-skills](https://github.com/bergside/awesome-design-skills) (MIT), con su licencia y atribución.

Reglas rápidas:

- Usa tokens semánticos (`canvas`, `surface`, `fg`, `accent`, `line`); no hex sueltos en componentes.
- El rojo (`accent`) es el único acento cromático; el resto es negro, gris y blanco.
- Fraunces para display, Inter para cuerpo, JetBrains Mono para etiquetas y metadata.
- Sin gradientes, glassmorphism, blobs 3D ni carruseles.
- Respeta `prefers-reduced-motion` y los contrastes WCAG AA.

## Orkai

El proyecto está registrado en Orkai con la categoría **mcastillo.dev** (`71732804c3018b24de97815d479ce199`) y el workflow **FrontendDev** (`cbbda627-98f1-4078-8c55-78d4a29d931d`).

Skills del proyecto:

- `Design Skill: Editorial (TypeUI)`
- `Design Skill: Minimal (TypeUI)`
- `mcastillo.dev Design System`

`.orkai.yaml` mantiene el proyecto scopeado. Para trabajar una sección nueva, sigue el workflow `FrontendDev`: cargar skills → encuadrar copy ES/EN → tokens → implementar → responsive → accesibilidad → build/QA → documentar.

> Nota: el contenido de las skills se guardó en el campo `raw` porque el proveedor de embeddings de Orkai devolvió un 401 al crear entidades con texto indexado. Si la búsqueda semántica falla, configura un proveedor válido con `orkai config embedding`, reinicia el daemon y reindexa. El workflow y las skills siguen siendo accesibles con `orkai get <id>`.

## Subdominios

Objetivo:

```text
mcastillo.dev                 landing principal (este repo)
├── haven.mcastillo.dev       Haven — case study / demo
├── aba.mcastillo.dev         AI Business Analyst
├── lab.mcastillo.dev         experimentos (opcional)
└── <proyecto>.mcastillo.dev  un deploy por proyecto
```

Recomendación: **un deployment independiente por subdominio**, no rutas dentro de la landing. Así cada proyecto puede tener su propio stack, CI/CD, variables y rollback sin acoplar el dominio principal.

### DNS

Cada subdominio se resuelve con un `CNAME` hacia el host que aloja ese proyecto. Ejemplo con Vercel:

| Host    | Tipo      | Valor                       |
| ------- | --------- | --------------------------- |
| `@`     | A / ALIAS | el valor que indique Vercel |
| `www`   | CNAME     | `cname.vercel-dns.com`      |
| `haven` | CNAME     | `cname.vercel-dns.com`      |
| `aba`   | CNAME     | `cname.vercel-dns.com`      |

En Cloudflare Pages el destino suele ser `<proyecto>.pages.dev`. Los valores exactos los entrega el proveedor al añadir el dominio.

### Vercel

1. Importa este repo y despliega la landing.
2. Framework: **Astro**. Build: `npm run build`. Output: `dist`.
3. Añade `mcastillo.dev` y redirige `www` al dominio principal.
4. Para cada proyecto, crea otro proyecto de Vercel, despliega su repo y añade `proyecto.mcastillo.dev` como dominio.
5. Configura el `CNAME` en tu proveedor de DNS.

### Cloudflare Pages

1. Conecta el repo, build `npm run build`, output `dist`.
2. Añade `mcastillo.dev` como custom domain.
3. Repite por proyecto y añade el subdominio correspondiente.

### Self-hosting (opcional)

Si más adelante quieres un solo servidor, un reverse proxy (Caddy/Traefik) puede enrutar por `Host` a contenedores separados. Mantén igualmente cada app en su propio contenedor y pipeline.

### ¿Monorepo?

No hace falta todavía. Con 3+ proyectos que compartan componentes o tokens, considera `pnpm workspaces` + Turborepo y extrae un paquete de diseño. Hasta entonces, duplicar tokens es más barato que acoplar deploys.

## QA antes de publicar

- [ ] `npm run check` y `npm run build` sin errores.
- [ ] Sin scroll horizontal en 320, 360, 390, 768, 1024 y 1440 px.
- [ ] Navegación completa con teclado y foco visible.
- [ ] Menú móvil abre/cierra y los enlaces funcionan.
- [ ] ES/EN cambia de ruta, `lang` y `hreflang` correctos.
- [ ] Todos los enlaces externos abren en pestaña nueva con `rel` seguro.
- [ ] Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO.
- [ ] `public/og.png` actualizado si cambia el mensaje principal.

## Roadmap

1. Publicar la landing en `mcastillo.dev`.
2. Crear el case study de Haven en `haven.mcastillo.dev`.
3. Publicar AI Business Analyst en `aba.mcastillo.dev`.
4. Añadir analytics privacy-first (por ejemplo, Plausible o Umami) si hace falta.
5. Evaluar `notes.mcastillo.dev` para escribir sobre infraestructura y QA.
