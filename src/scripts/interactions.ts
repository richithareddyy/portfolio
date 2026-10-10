import { applyFilter } from './explore';

/*
  Site-wide interactions: navigation and technology links into the Data Lab.
  Everything respects reduced motion.
*/

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Technology names on project cards open the Data Lab with that technology selected. */
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-tech-link]');
  if (!btn) return;
  const id = btn.dataset.techLink!;
  const lab = document.querySelector<HTMLElement>('[data-lab]');
  if (!lab) {
    window.location.href = `/?tech=${encodeURIComponent(id)}#skills`;
    return;
  }
  document.dispatchEvent(new CustomEvent('lab:select', { detail: id }));
  lab.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
});


// Smooth intentional navigation; native focus and control scrolling stay immediate.
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
  if (!link || link.target || link.hasAttribute('data-explore')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  event.preventDefault();
  if (target.hidden && target.matches('[data-project-id]')) applyFilter('all');
  history.pushState(null, '', url.hash);
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
});
