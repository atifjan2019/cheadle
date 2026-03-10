// ============================================================
// HEADER & FOOTER INCLUDES LOADER
// Loads header.html from /includes/ and initialises the new
// glass header: topbar scroll-hide, mobile drawer, accordions.
// ============================================================

(function () {
    'use strict';

    /* ---------- Utility: load HTML into element by ID ---------- */
    function loadInclude(elementId, filePath, callback) {
        var el = document.getElementById(elementId);
        if (!el) return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                el.outerHTML = xhr.responseText;
                if (callback) callback();
            }
        };
        xhr.send();
    }

    /* ---------- Detect home page (transparent hero header) ---------- */
    function detectHomePage() {
        var path = window.location.pathname;
        if (path === '/' || path === '' ||
            path.endsWith('/index.html') ||
            path.endsWith('/cheadle-main/') ||
            path === '/cheadle-main') {
            document.body.classList.add('home-page');
        }
    }

    /* ---------- Full nav / header initialisation ---------- */
    function initNav() {
        var header = document.getElementById('header');
        var topbar = document.getElementById('header-topbar');
        var toggle = document.getElementById('nav-toggle');
        var mobileNav = document.getElementById('mobile-nav');
        var mobileClose = document.getElementById('mobile-nav-close');
        var backdrop = document.getElementById('mobile-nav-backdrop');

        /* ---- Scroll-aware header ---- */
        function onScroll() {
            var scrollY = window.scrollY || window.pageYOffset;

            if (header) {
                header.classList.toggle('header--scrolled', scrollY > 60);
            }

            if (topbar) {
                if (scrollY > 80) {
                    topbar.classList.add('is-hidden');
                    if (header) header.style.top = '0';
                } else {
                    topbar.classList.remove('is-hidden');
                    if (header) header.style.top = '';
                }
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* ---- Mobile drawer open / close ---- */
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

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
                closeDrawer();
            }
        });

        /* ---- Mobile accordion ---- */
        document.querySelectorAll('.mobile-nav__group-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var isOpen = this.getAttribute('aria-expanded') === 'true';

                // Close all others
                document.querySelectorAll('.mobile-nav__group-btn[aria-expanded="true"]').forEach(function (other) {
                    if (other !== btn) {
                        other.setAttribute('aria-expanded', 'false');
                        var otherSub = other.nextElementSibling;
                        if (otherSub) otherSub.classList.remove('is-open');
                    }
                });

                this.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
                var sub = this.nextElementSibling;
                if (sub) sub.classList.toggle('is-open', !isOpen);
            });
        });

        // Close drawer on nav link click
        document.querySelectorAll(
            '.mobile-nav__link, .mobile-nav__sub-link, .mobile-nav__cta, .mobile-nav__phone'
        ).forEach(function (link) {
            link.addEventListener('click', closeDrawer);
        });

        /* ---- Active nav link highlight ---- */
        var currentFile = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav__link, .nav__dropdown-link').forEach(function (link) {
            var href = (link.getAttribute('href') || '').split('/').pop();
            if (href && href === currentFile) {
                link.classList.add('nav__link--active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    /* ---------- Boot ---------- */
    detectHomePage();
    loadInclude('header-root', 'includes/header.html?v=2', function () {
        initNav();
        // Fire event so quote-modal.js can initialise after header is in DOM
        document.dispatchEvent(new CustomEvent('headerLoaded'));
    });

})();
