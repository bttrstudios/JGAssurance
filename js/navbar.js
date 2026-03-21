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

/* ── Active link on scroll (optional — uses IntersectionObserver) ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a, .navbar__mobile a');

if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
        }
    });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
}
