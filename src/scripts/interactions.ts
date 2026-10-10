/*
  Site-wide interactions: quick scroll reveals and technology links into the Data Lab.
  Everything respects reduced motion.
*/

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Reveal: hide only what starts below the fold, then reveal it quickly as it enters. */
let revealObserver: IntersectionObserver | undefined;
function setupReveal() {
  revealObserver?.disconnect();
  if (reduceMotion() || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('reveal-pending');
        revealObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('reveal-pending');
      revealObserver.observe(el);
    }
  }
}

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

document.addEventListener('astro:page-load', () => {
  setupReveal();
});
