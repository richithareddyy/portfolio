# Portfolio

Personal portfolio of Richitha Rekula: software engineering and applied AI projects, experience, and contact details.

Built with Astro and TypeScript. Static output, no client-side framework, self-hosted fonts.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The site runs at http://localhost:4321.

## Build

```bash
npm run build
```

Type-checks the project and writes the static site to `dist/`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/data/` | All site content: profile, projects, experience, skills |
| `src/styles/tokens.css` | Design tokens: color, type, spacing, radius, borders, shadows, motion |
| `src/components/` | Page sections and reusable pieces |
| `src/pages/` | Home page, project case studies, 404 |
| `public/` | Résumé PDF and favicon |

## Deploy

Static output works on any static host. On Vercel, import the repository; the Astro preset needs no extra settings.
