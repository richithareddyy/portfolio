import { projects, zoomLens } from './projects';

/** Case-study order, used for previous/next navigation. */
export const caseStudies = [
  { slug: zoomLens.slug, title: zoomLens.title },
  ...projects.map((p) => ({ slug: p.slug, title: p.title })),
];

export function neighbors(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  const n = caseStudies.length;
  return {
    prev: caseStudies[(i - 1 + n) % n]!,
    next: caseStudies[(i + 1) % n]!,
  };
}
