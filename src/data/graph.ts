import { projects } from './projects';
import { experience } from './experience';

/** Different spellings of the same technology across project and résumé data. */
const aliases: Record<string, string> = {
  'Gemini API': 'Google Gemini API',
};
const canonical = (name: string) => aliases[name] ?? name;
export const techId = (name: string) => `tech:${canonical(name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

export type SourceNode = {
  id: string;
  kind: 'project' | 'role';
  label: string;
  /** Where the node links to on the site. */
  href: string;
  tech: string[];
};

export type TechNode = { id: string; label: string; count: number };

export const sources: SourceNode[] = [
  ...experience.map((role) => ({
    id: `role:${role.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    kind: 'role' as const,
    label: role.title,
    href: '#experience',
    tech: [...new Set(role.tech.map(canonical))],
  })),
  ...projects.map((p) => ({
    id: `project:${p.slug}`,
    kind: 'project' as const,
    label: p.title,
    href: p.caseStudy ? `/work/${p.slug}` : `#project-${p.slug}`,
    tech: [...new Set((p.stack ?? p.tech).map(canonical))],
  })),
];

const counts = new Map<string, number>();
for (const s of sources) for (const t of s.tech) counts.set(t, (counts.get(t) ?? 0) + 1);

/** Most-connected first, then alphabetical. */
export const techs: TechNode[] = [...counts.entries()]
  .map(([label, count]) => ({ id: techId(label), label, count }))
  .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

export const edges = sources.flatMap((s) => s.tech.map((t) => ({ from: s.id, to: techId(t) })));

/** Lookup used by the client script: node id -> connected node ids, labels, and links. */
export const graphData = {
  nodes: Object.fromEntries([
    ...sources.map((s) => [s.id, { label: s.label, kind: s.kind, href: s.href }]),
    ...techs.map((t) => [t.id, { label: t.label, kind: 'tech', count: t.count }]),
  ]),
  links: Object.fromEntries([
    ...sources.map((s) => [s.id, s.tech.map(techId)]),
    ...techs.map((t) => [t.id, edges.filter((e) => e.to === t.id).map((e) => e.from)]),
  ]),
};
