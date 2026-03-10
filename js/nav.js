/* =========================================================================
   NAV.JS — Cheadle Construction
   Glass header · Scroll-aware topbar · Mobile drawer · Accordion subs
   ========================================================================= */

(function () {
    'use strict';

    const header = document.getElementById('header');
    const topbar = document.getElementById('header-topbar');
    const toggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-nav-close');
    const backdrop = document.getElementById('mobile-nav-backdrop');

    /* -----------------------------------------------------------------
       SCROLL-AWARE HEADER
       - Hides the topbar after scrolling past 80px
       - Adds .header--scrolled class for glass effect swap
    ----------------------------------------------------------------- */
    let lastScrollY = 0;

    function onScroll() {
        const scrollY = window.scrollY;

        // Toggle scrolled glass state
        if (header) {
            if (scrollY > 60) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }

        // Hide topbar on scroll down, reveal on scroll up
        if (topbar) {
            if (scrollY > 80) {
                topbar.classList.add('is-hidden');
                // Header moves up to fill topbar gap
                if (header) header.style.top = '0';
            } else {
                topbar.classList.remove('is-hidden');
                if (header) header.style.top = '';
            }
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    /* -----------------------------------------------------------------
       MOBILE DRAWER — open / close
    ----------------------------------------------------------------- */
    function openDrawer() {
        if (!mobileNav || !backdrop) return;
        mobileNav.classList.add('is-open');
        mobileNav.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
        if (!mobileNav || !backdrop) return;
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('is-visible');
        document.body.style.overflow = '';
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle) toggle.addEventListener('click', openDrawer);
    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Close drawer on Esc key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
            closeDrawer();
        }
    });

    /* -----------------------------------------------------------------
       MOBILE ACCORDION — group buttons toggle sub-menus
    ----------------------------------------------------------------- */
    document.querySelectorAll('.mobile-nav__group-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            const sub = this.nextElementSibling;

            // Close all other open groups
            document.querySelectorAll('.mobile-nav__group-btn[aria-expanded="true"]').forEach(function (other) {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherSub = other.nextElementSibling;
                    if (otherSub) otherSub.classList.remove('is-open');
                }
            });

            // Toggle this one
            this.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
            if (sub) sub.classList.toggle('is-open', !isOpen);
        });
    });

    // Close drawer when any mobile nav link is clicked
    document.querySelectorAll('.mobile-nav__link, .mobile-nav__sub-link, .mobile-nav__cta, .mobile-nav__phone').forEach(function (link) {
        link.addEventListener('click', closeDrawer);
    });

    /* -----------------------------------------------------------------
       ACTIVE NAV LINK — highlight current page
    ----------------------------------------------------------------- */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav__link, .nav__dropdown-link').forEach(function (link) {
        const href = (link.getAttribute('href') || '').split('/').pop();
        if (href && href === currentPath) {
            link.classList.add('nav__link--active');
            link.setAttribute('aria-current', 'page');
        }
    });

})();
