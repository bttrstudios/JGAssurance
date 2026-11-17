const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Hamburger toggle ── */
hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
});

/* ── Close menu on mobile link click ── */
function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
}

/* ── Close menu if window resized above breakpoint ── */
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
});

/* ── Active nav link ──
   Nav hrefs are absolute ("/index.html#about", "/services.html"), so compare
   normalized pathname + hash rather than raw attribute strings. */
const normalizePath = (p) => (p === '/' ? '/index.html' : p);
const currentPath   = normalizePath(window.location.pathname);
const navLinks      = document.querySelectorAll('.navbar__links a, .navbar__mobile a:not(.navbar__cta)');

function setActive(matchFn) {
    navLinks.forEach(link => {
        const url = new URL(link.href, window.location.origin);
        link.classList.toggle('active', matchFn(normalizePath(url.pathname), url.hash));
    });
}

// Page-level highlight (e.g. "Meet the Team" on biography.html)
setActive((path, hash) => path === currentPath && !hash);

// Section-level highlight while scrolling the homepage
if (currentPath === '/index.html') {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive((path, hash) => path === currentPath && hash === '#' + entry.target.id);
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
}

/* ── Footer copyright range: "2026" → "2026–2027" automatically ── */
const SITE_LAUNCH_YEAR = 2026;
const thisYear = new Date().getFullYear();
document.querySelectorAll('.js-year-range').forEach(el => {
    if (thisYear > SITE_LAUNCH_YEAR) el.textContent = '–' + thisYear;
});
