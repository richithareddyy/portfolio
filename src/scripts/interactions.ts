/*
  Site-wide interactions. In-page links use native anchor navigation, so scrolling, history, and focus behave
  as the browser intends; these handlers only add what the browser cannot know.
*/

/* A technology name selects that technology in the skills map; the link itself scrolls there, and Back returns. */
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest<HTMLElement>('[data-tech-link]');
  if (link && document.querySelector('[data-lab]')) {
    document.dispatchEvent(new CustomEvent('lab:select', { detail: link.dataset.techLink }));
  }
});

/* The pen: the dot after the name switches the ink used for every mark and accent. Purely for fun. */
const pens = ['blue', 'red', 'green', 'violet'] as const;
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-pen-toggle]')) {
  const label = (pen: string) => `Change the pen color used across the site (now ${pen})`;
  const current = () => document.documentElement.dataset.pen ?? 'blue';
  button.setAttribute('aria-label', label(current()));
  button.addEventListener('click', () => {
    const next = pens[(pens.indexOf(current() as (typeof pens)[number]) + 1) % pens.length];
    if (next === 'blue') delete document.documentElement.dataset.pen;
    else document.documentElement.dataset.pen = next;
    button.setAttribute('aria-label', label(next));
    try {
      localStorage.setItem('pen', next);
    } catch {
      /* Private browsing: the color simply resets next visit. */
    }
    // Redraw the marks in view, so the switch reads as picking up a different pen.
    for (const mark of document.querySelectorAll<HTMLElement>('.mk.is-drawn')) {
      const box = mark.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      mark.classList.remove('is-drawn');
      void mark.offsetWidth;
      mark.classList.add('is-drawn');
    }
  });
}

/* Pen marks draw once, when they first scroll into view. */
const marks = Array.from(document.querySelectorAll<HTMLElement>('.mk'));
if (marks.length && 'IntersectionObserver' in window) {
  const markObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-drawn');
        markObserver.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  marks.forEach((m) => markObserver.observe(m));
} else {
  marks.forEach((m) => m.classList.add('is-drawn'));
}

/* Copy the email address, with a moment of confirmation. */
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

/* Experience: the entry nearest the middle of the screen gets an accent on its dates. */
const roles = Array.from(document.querySelectorAll<HTMLElement>('[data-role-id]'));
if (roles.length && 'IntersectionObserver' in window) {
  const roleObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-current', entry.isIntersecting);
    },
    { rootMargin: '-40% 0px -45% 0px' },
  );
  roles.forEach((r) => roleObserver.observe(r));
}
