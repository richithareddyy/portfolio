/*
  Site-wide interactions. Each one answers a question for the visitor: what can I interact with,
  what just happened, or where am I. Everything respects reduced motion, and pointer effects run
  only on devices with a fine pointer that can hover.
*/

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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

/* Magnetic pull for the main calls to action: a few pixels toward the pointer. */
function setupMagnetic() {
  if (reduceMotion() || !finePointer()) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
    if (el.dataset.magneticReady) continue;
    el.dataset.magneticReady = 'true';
    let frame = 0;
    el.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.setProperty('--mx', `${(dx * 4).toFixed(2)}px`);
        el.style.setProperty('--my', `${(dy * 3).toFixed(2)}px`);
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  }
}

/* Pointer-aware project screenshots: the image shifts up to 4px with the pointer, then settles. */
function setupDepth() {
  if (reduceMotion() || !finePointer()) return;
  for (const frame of document.querySelectorAll<HTMLElement>('[data-depth]')) {
    if (frame.dataset.depthReady) continue;
    frame.dataset.depthReady = 'true';
    let raf = 0;
    frame.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = frame.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.setProperty('--px', `${(x * 8).toFixed(2)}px`);
        frame.style.setProperty('--py', `${(y * 8).toFixed(2)}px`);
      });
    });
    frame.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      frame.style.setProperty('--px', '0px');
      frame.style.setProperty('--py', '0px');
    });
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
  setupMagnetic();
  setupDepth();
});
