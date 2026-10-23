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

// The dot after the name: cycles the pen color used for every mark and accent. The new ink floods the screen from
// the dot, and the page underneath has taken the color by the time it clears.
const pens = { rose: '#c2386e', blue: '#2563eb', violet: '#8343cc', red: '#d64527', forest: '#25603e' };
type Pen = keyof typeof pens;
const order = Object.keys(pens) as Pen[];
const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let flood: HTMLElement | null = null;
let landInk: (() => void) | null = null;

const setPen = (pen: Pen) => {
  if (pen === 'rose') delete root.dataset.pen;
  else root.dataset.pen = pen;
  try {
    localStorage.setItem('pen', pen);
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
};

function inkFlood(from: Element, pen: Pen, land: () => void) {
  if (!flood) {
    flood = document.createElement('div');
    flood.className = 'ink-flood';
    flood.setAttribute('aria-hidden', 'true');
    document.body.append(flood);
  }
  const r = from.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const reach = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
  flood.style.background = pens[pen];
  flood.getAnimations().forEach((a) => a.cancel());
  landInk = land;
  const spread = flood.animate(
    [{ clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${reach}px at ${cx}px ${cy}px)` }],
    { duration: 520, easing: 'cubic-bezier(0.6, 0, 0.3, 1)', fill: 'forwards' },
  );
  spread.onfinish = () => {
    landInk?.();
    landInk = null;
    flood!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 480, delay: 60, easing: 'ease-out', fill: 'forwards' });
  };
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-pen-toggle]')) {
  const label = (pen: string) => `Change the pen color used across the site (now ${pen})`;
  button.setAttribute('aria-label', label(root.dataset.pen ?? 'rose'));
  button.addEventListener('click', () => {
    // A second click mid-flood lands the first color right away.
    landInk?.();
    landInk = null;
    const next = order[(order.indexOf((root.dataset.pen ?? 'rose') as Pen) + 1) % order.length];
    button.setAttribute('aria-label', label(next));
    if (reduceMotion.matches) setPen(next);
    else inkFlood(button, next, () => setPen(next));
  });
}

onFirstView(document.querySelectorAll('.mk'), 'is-drawn', '0px 0px -12% 0px');

if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const blocks = document.querySelectorAll('[data-reveal]');
  // Anything already above the fold (a reload partway down, or a jump to an anchor) starts revealed.
  for (const el of blocks) if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in');
  root.classList.add('reveal-on');
  onFirstView(blocks, 'is-in', '0px 0px -8% 0px');
}

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

// Home page on desktop: when scrolling stops with the next page more than halfway up the screen, glide the rest of the
// way so the page sits under the header. Nothing listens to the wheel and nothing is blocked; it only acts once the
// page is still, and any new scroll simply takes over.
const pages = [...document.querySelectorAll<HTMLElement>('[data-snap]')];
const settleScreen = matchMedia('(min-width: 64rem) and (min-height: 42rem)');
if (pages.length && !reduceMotion.matches) {
  const header = document.querySelector('.site-header');
  let lastY = scrollY;
  let settling = false;
  let timer: number | undefined;

  const settle = () => {
    const y = scrollY;
    const down = y > lastY;
    lastY = y;
    if (settling) {
      settling = false;
      return;
    }
    if (!settleScreen.matches || document.documentElement.classList.contains('hello')) return;
    const top = header?.getBoundingClientRect().bottom ?? 0;
    const view = innerHeight - top;
    const offsets = pages.map((p) => p.getBoundingClientRect().top - top);
    let i = -1;
    if (down) i = offsets.findIndex((d) => d > 2 && d <= view * 0.5);
    else {
      i = offsets.findIndex((d) => d < -2 && d >= -view * 0.5);
      // Most of the previous page is back on screen: return to its top, if it fits.
      if (i < 0) {
        const next = offsets.findIndex((d) => d >= view * 0.5 && d < view);
        if (next > 0 && pages[next - 1].offsetHeight <= view) i = next - 1;
      }
    }
    if (i < 0) return;
    settling = true;
    scrollTo({ top: y + offsets[i], behavior: 'smooth' });
  };

  if ('onscrollend' in window) addEventListener('scrollend', settle);
  else
    addEventListener(
      'scroll',
      () => {
        clearTimeout(timer);
        timer = window.setTimeout(settle, 140);
      },
      { passive: true },
    );
  // Jumps from links land exactly where the anchor says; don't settle those.
  addEventListener('hashchange', () => (settling = true));
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
