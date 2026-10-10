/*
  Cross-section exploration: the portfolio treated as connected data.
  - Domain filter (and the hero constellation) emphasize matching projects without hiding any.
  - A skill selected in the Data Lab marks the projects that are evidence for it.
  - Readout items in the hero jump to, or highlight, the content they count.
  - The experience entry being read is highlighted.
  The page reads normally without any of this.
*/

type FilterId = 'all' | 'demo' | string;

const domainLabels: Record<string, string> = {
  all: 'All',
  demo: 'Live demo',
  'applied-ai': 'Applied AI',
  ml: 'ML',
  nlp: 'NLP',
  data: 'Data',
  software: 'Software',
  systems: 'Systems',
};

function projectArticles() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-project-id]'));
}

export function applyFilter(id: FilterId) {
  const articles = projectArticles();
  if (!articles.length) return;
  let matches = 0;
  for (const el of articles) {
    const domains = (el.dataset.domains ?? '').split(' ');
    const hit = id === 'all' || (id === 'demo' ? el.dataset.demo === 'true' : domains.includes(id));
    if (hit) matches++;
    el.classList.toggle('is-muted', !hit);
  }
  for (const b of document.querySelectorAll<HTMLElement>('[data-domain-filter]')) {
    b.setAttribute('aria-pressed', String(b.dataset.domainFilter === id));
  }
  for (const n of document.querySelectorAll<HTMLElement>('[data-domain-node]')) {
    n.classList.toggle('is-active', n.dataset.domainNode === id);
  }
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  if (status) {
    status.textContent =
      id === 'all' ? '' : `Showing ${matches} of ${articles.length} projects: ${domainLabels[id] ?? id}. Others are faded, not hidden.`;
  }
}

function scrollToId(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;

  const filterBtn = t.closest<HTMLElement>('[data-domain-filter]');
  if (filterBtn) {
    applyFilter(filterBtn.dataset.domainFilter!);
    return;
  }

  const go = t.closest<HTMLElement>('[data-explore]');
  if (go) {
    e.preventDefault();
    const action = go.dataset.explore!;
    if (action === 'projects') {
      applyFilter('all');
      scrollToId('work');
    } else if (action === 'demos') {
      applyFilter('demo');
      scrollToId('work');
    } else if (action === 'skills') {
      scrollToId('skills');
    } else if (action === 'experience') {
      scrollToId('experience');
    } else if (action.startsWith('domain:')) {
      applyFilter(action.slice(7));
      scrollToId('work');
    }
  }
});

/* Skill → evidence: the Data Lab announces which projects connect to its selection. */
document.addEventListener('lab:change', ((e: CustomEvent<{ ids: string[] }>) => {
  const ids = new Set(e.detail.ids);
  for (const el of projectArticles()) el.classList.toggle('is-evidence', ids.has(el.dataset.projectId!));
  for (const role of document.querySelectorAll<HTMLElement>('[data-role-id]')) {
    role.classList.toggle('is-evidence', ids.has(role.dataset.roleId!));
  }
}) as EventListener);

/* Experience: highlight the entry nearest the middle of the screen. */
let roleObserver: IntersectionObserver | undefined;
function setupExperience() {
  roleObserver?.disconnect();
  const roles = Array.from(document.querySelectorAll<HTMLElement>('[data-role-id]'));
  if (!roles.length || !('IntersectionObserver' in window)) return;
  roleObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-current', entry.isIntersecting);
    },
    { rootMargin: '-40% 0px -45% 0px' },
  );
  roles.forEach((r) => roleObserver!.observe(r));
}

document.addEventListener('astro:page-load', () => {
  setupExperience();
  if (projectArticles().length) applyFilter('all');
});
