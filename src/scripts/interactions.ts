/*
  Site-wide interactions: in-page navigation, technology links into the skills map, and the experience entry being read.
  Everything respects reduced motion.
*/

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Technology names on project cards open the skills map with that technology selected. */
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
  if (!link || link.target) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  event.preventDefault();
  history.pushState(null, '', url.hash);
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
});

/* Experience: the entry nearest the middle of the screen gets an accent on its dates. */
let roleObserver: IntersectionObserver | undefined;
document.addEventListener('astro:page-load', () => {
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
});
