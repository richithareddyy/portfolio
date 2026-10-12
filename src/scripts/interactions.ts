// In-page links use native anchor navigation, so scrolling, history, and focus are left to the browser.

// The link itself scrolls to the skills map; this just selects the technology there.
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest<HTMLElement>('[data-tech-link]');
  if (link && document.querySelector('[data-lab]')) {
    document.dispatchEvent(new CustomEvent('lab:select', { detail: link.dataset.techLink }));
  }
});

/** Adds `className` to each element the first time it scrolls into view. */
function onFirstView(elements: Iterable<Element>, className: string, rootMargin: string) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin },
  );
  for (const el of elements) observer.observe(el);
}

// The dot after the name: cycles the pen color used for every mark and accent.
const pens = ['blue', 'red', 'green', 'violet'];
const root = document.documentElement;
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-pen-toggle]')) {
  const label = (pen: string) => `Change the pen color used across the site (now ${pen})`;
  button.setAttribute('aria-label', label(root.dataset.pen ?? 'blue'));
  button.addEventListener('click', () => {
    const next = pens[(pens.indexOf(root.dataset.pen ?? 'blue') + 1) % pens.length];
    if (next === 'blue') delete root.dataset.pen;
    else root.dataset.pen = next;
    button.setAttribute('aria-label', label(next));
    try {
      localStorage.setItem('pen', next);
    } catch {
      // Storage can be blocked (private browsing); the color just won't persist.
    }
    // Redraw the marks on screen so the switch reads as picking up a different pen.
    for (const mark of document.querySelectorAll<HTMLElement>('.mk.is-drawn')) {
      const box = mark.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      mark.classList.remove('is-drawn');
      void mark.offsetWidth;
      mark.classList.add('is-drawn');
    }
  });
}

onFirstView(document.querySelectorAll('.mk'), 'is-drawn', '0px 0px -12% 0px');

// Content below the first screen fades up once as it arrives. Each group staggers its siblings by `step` ms.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const groups: [string, number][] = [
    ['.section-heading', 0],
    ['.featured .text, .featured .media', 90],
    ['.more-head, .rows .row', 60],
    ['.timeline .role, .edu li', 70],
    ['.skill-groups > div, .map-disclosure', 50],
    ['#about .prose, #about .margin', 90],
    ['#contact .invite, #contact .email, #contact .others', 70],
    ['.case-section, .lead-visual', 0],
  ];
  const arriving: HTMLElement[] = [];
  for (const [selector, step] of groups) {
    const all = Array.from(document.querySelectorAll<HTMLElement>(selector));
    for (const el of all) {
      // Anything already on screen at load stays put.
      if (el.getBoundingClientRect().top < innerHeight) continue;
      const siblings = all.filter((x) => x.parentElement === el.parentElement);
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 4) * step}ms`);
      el.classList.add('reveal');
      arriving.push(el);
    }
  }
  onFirstView(arriving, 'is-in', '0px 0px -8% 0px');
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const idle = button.textContent;
  let timer: number | undefined;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy!);
      button.textContent = 'copied ✓';
    } catch {
      button.textContent = 'couldn’t copy. select it instead';
    }
    clearTimeout(timer);
    timer = window.setTimeout(() => (button.textContent = idle), 1800);
  });
}

// Experience: the entry nearest the middle of the screen gets an accent on its dates.
const roleObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) entry.target.classList.toggle('is-current', entry.isIntersecting);
  },
  { rootMargin: '-40% 0px -45% 0px' },
);
document.querySelectorAll('[data-role-id]').forEach((role) => roleObserver.observe(role));
