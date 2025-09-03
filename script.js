// 1) AUTO-YEAR IN FOOTER

(function setYear(){
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// 2) SMOOTH SCROLL FOR IN-PAGE ANCHORS

(function smoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start'});
            }
        });
    });
})();

// 3) ACTIVE NAV LINK SYNCING (INTERSECTION OBSERVER)

(function activeNav(){
    const sections = document.querySelectorAll('main > section[id]');
    const navLinks = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
    if (!('IntersectionObserver' in window) || sections.length === 0 || navLinks.length ===0) return;

    const byHref = (id) => navLinks.find(a => a.getAttribute('href') === `#${id}`);

      const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => { a.removeAttribute('aria-current'); a.dataset.active = "false"; });
      const current = byHref(id);
      if (current) { current.setAttribute('aria-current', 'page'); current.dataset.active = "true"; }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.1, 0.5, 1] });

  sections.forEach(sec => io.observe(sec));
})();

// 4) (Optional) Simple hash-focus for accessibility

(function hashFocus(){
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) el.setAttribute('tabindex', '-1');
  }
  window.addEventListener('hashchange', () => {
    const el = document.querySelector(location.hash);
    if (el) { el.setAttribute('tabindex', '-1'); el.focus(); }
  });
})();