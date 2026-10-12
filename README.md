# Portfolio

Personal portfolio of Richitha Rekula: software engineering and applied AI projects, experience, and contact details.

Built with Astro and TypeScript. Static output, no client-side framework, self-hosted fonts.

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

The site runs at http://localhost:4321.

## Build

```bash
npm run build
```

Type-checks the project and writes the static site to `dist/`.

## Content and page generation

The site presents projects as case studies so there is room for implementation choices, evaluation, and limitations alongside screenshots. Astro generates the pages at build time; small TypeScript scripts handle browser interactions without a client-side UI framework.

Most project content lives in `src/data/projects.ts`. `src/pages/work/[slug].astro` generates those case-study pages, while Zoom Lens has a dedicated page at `src/pages/work/zoom-lens.astro`. Profile, experience, and skills have separate data files.

## Structure

| Path | Purpose |
| --- | --- |
| `src/data/` | Shared content: profile, projects, experience, skills |
| `src/styles/tokens.css` | Design tokens: color, type, spacing, radius, borders, shadows, motion |
| `src/components/` | Page sections and reusable pieces |
| `src/pages/` | Home page, project case studies, 404 |
| `public/` | Résumé PDF and favicon |

## Checks

`npm run check` runs Astro's checks; `npm run build` checks and builds; `npm run preview` serves the built site locally. No automated browser test suite is included. Check the home page, project links, résumé download, narrow-screen layout, and keyboard navigation when changing content or components.

## Deploy

Static output works on any static host. On Vercel, import the repository; the Astro preset needs no extra settings.
