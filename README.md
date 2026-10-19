# Portfolio

My personal site for software engineering, applied AI, and data-science projects, with case studies, experience, and contact details.

**Astro · TypeScript · Static output**

[Visit the site](https://richitharekula.vercel.app)

## Run locally

Requires Node.js 22+.

```bash
npm ci
npm run dev
```

Open http://localhost:4321. `npm run build` checks the project and writes the site to `dist/`; `npm run preview` serves that build locally.

## Editing content

Most project content lives in `src/data/projects.ts`. Profile, experience, and skills have separate files in `src/data/`. Astro generates case-study pages from that content; ZoomLens has its own dedicated page.

Components live in `src/components/`, pages in `src/pages/`, and shared visual tokens in `src/styles/tokens.css`. Fonts are self-hosted. Small TypeScript scripts handle browser interactions without a client-side UI framework.

## Checks and deployment

Run `npm run check` for Astro checks. There is no automated browser test suite, so also check project links, the résumé download, narrow-screen layouts, and keyboard navigation after changes.

The static output can run on a static host. Vercel’s Astro preset handles the current deployment.

[Content structure and deployment notes](GUIDE.md)
