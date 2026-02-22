/* ══════════════════════════════════════════════
   MEGASRM2026 — Main JavaScript
   js/main.js
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. NAVBAR — scroll effect
  ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ──────────────────────────────────────────
     2. HAMBURGER — mobile nav toggle
  ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ──────────────────────────────────────────
     3. SCROLL REVEAL — sections fade in
  ────────────────────────────────────────── */
  const revealTargets = document.querySelectorAll('section');

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once revealed
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     4. ACTIVE NAV LINK — highlight on scroll
  ────────────────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === `#${id}`) {
              a.style.color = 'var(--gold-light)';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ──────────────────────────────────────────
     5. SMOOTH SCROLL POLYFILL (for older browsers)
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 8;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     6. THEME CARDS — staggered entrance
  ────────────────────────────────────────── */
  const themeCards = document.querySelectorAll('.theme-card');

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.theme-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity  = '1';
              card.style.transform = 'translateY(0)';
            }, i * 60);
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Set initial hidden state
  themeCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const themesSection = document.getElementById('themes');
  if (themesSection) cardObserver.observe(themesSection);

  /* ──────────────────────────────────────────
     7. COMMITTEE CARDS — staggered entrance
  ────────────────────────────────────────── */
  const committeeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.committee-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0)';
            }, i * 80);
          });
          committeeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  document.querySelectorAll('.committee-card').forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });

  const committeeSection = document.getElementById('committee');
  if (committeeSection) committeeObserver.observe(committeeSection);

  /* ──────────────────────────────────────────
     8. FEE TABLE ROWS — highlight on hover
       (handled in CSS, but JS adds class)
  ────────────────────────────────────────── */
  console.log('MEGASRM2026 — scripts loaded ✅');

});
