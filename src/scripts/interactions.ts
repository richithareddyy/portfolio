// In-page links use native anchor navigation, so scrolling, history, and focus are left to the browser.

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
const pens = ['rose', 'blue', 'violet', 'red', 'forest'];
const root = document.documentElement;
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-pen-toggle]')) {
  const label = (pen: string) => `Change the pen color used across the site (now ${pen})`;
  button.setAttribute('aria-label', label(root.dataset.pen ?? 'rose'));
  button.addEventListener('click', () => {
    const next = pens[(pens.indexOf(root.dataset.pen ?? 'rose') + 1) % pens.length];
    if (next === 'rose') delete root.dataset.pen;
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

// While the page scrolls, cards passing under the pointer shouldn't lift and drop; hover comes back once scrolling stops.
if (matchMedia('(hover: hover)').matches) {
  let scrollTimer: number | undefined;
  addEventListener(
    'scroll',
    () => {
      if (!root.classList.contains('is-scrolling')) root.classList.add('is-scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => root.classList.remove('is-scrolling'), 150);
    },
    { passive: true },
  );
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const idle = button.textContent;
  let timer: number | undefined;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy!);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Couldn’t copy. Select it instead';
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
