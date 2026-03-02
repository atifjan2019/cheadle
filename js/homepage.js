/* =========================================================================
   HOMEPAGE.JS — Cheadle Construction
   - Elegant header scroll behaviour (darkens on scroll)
   - Mobile hamburger open/close for new hp-nav
   - Stats counter animation on scroll
   ========================================================================= */

(function () {
  'use strict';

  /* ----- Header scroll behaviour ----- */
  const header = document.querySelector('.hp-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ----- Mobile hamburger toggle for hp-nav ----- */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Animate bars
      toggle.classList.toggle('active', isOpen);
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.hp-nav__link, .hp-nav__dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      }
    });
  }

  /* ----- Animated hamburger bars ----- */
  const style = document.createElement('style');
  style.textContent = `
    .nav-toggle.active .nav-toggle__bar:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .nav-toggle.active .nav-toggle__bar:nth-child(2){opacity:0;}
    .nav-toggle.active .nav-toggle__bar:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
  `;
  document.head.appendChild(style);

  /* ----- Stats counter animation ----- */
  const counters = document.querySelectorAll('.hp-stats__num[data-target]');

  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800; // ms
          const step   = Math.ceil(target / (duration / 16));
          let current  = 0;

          el.classList.add('counting');
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current;
          }, 16);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* ----- Fade-in-on-scroll for sections ----- */
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll(
      '.hp-why__card, .hp-trust-badge, .hp-showcase__card, .hp-showcase__banner, .hp-stats__item'
    );

    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0)';
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
      fadeObs.observe(el);
    });
  }

})();
