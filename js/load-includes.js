// ============================================================
// HEADER & FOOTER INCLUDES LOADER
// Loads header.html and footer.html from /includes/ folder
// so changes only need to be made in one place.
// ============================================================

(function () {
    'use strict';

    // Load an include file into a placeholder element
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

    // Initialize navigation (same logic as nav.js)
    function initNav() {
        var toggle = document.querySelector('.nav-toggle');
        var nav = document.querySelector('.nav');
        if (!toggle || !nav) return;

        // Create overlay if not exists
        var overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        function openNav() {
            nav.classList.add('nav--open');
            overlay.classList.add('nav-overlay--active');
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            nav.classList.remove('nav--open');
            overlay.classList.remove('nav-overlay--active');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', function () {
            nav.classList.contains('nav--open') ? closeNav() : openNav();
        });

        overlay.addEventListener('click', closeNav);

        // Mobile dropdown toggle
        document.querySelectorAll('.nav__item').forEach(function (item) {
            var link = item.querySelector('.nav__link');
            var dropdown = item.querySelector('.nav__dropdown, .nav__mega');
            if (link && dropdown) {
                link.addEventListener('click', function (e) {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        item.classList.toggle('open');
                    }
                });
            }
        });
    }

    // Detect home page and add class for transparent header
    function detectHomePage() {
        var path = window.location.pathname;
        if (path === '/' || path === '/index.html' || path.endsWith('/index.html') || path === '') {
            document.body.classList.add('home-page');
        }
    }

    // Scroll handler for transparent-to-solid header transition
    function initHeaderScroll() {
        var header = document.querySelector('.header');
        if (!header || !document.body.classList.contains('home-page')) return;

        function onScroll() {
            if (window.scrollY > 80) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
    }

    // Load header, then init nav + scroll
    detectHomePage();
    loadInclude('header-root', 'includes/header.html', function () {
        initNav();
        initHeaderScroll();
    });
})();
