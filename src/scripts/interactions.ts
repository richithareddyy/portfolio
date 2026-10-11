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
