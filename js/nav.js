// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

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

    if (toggle) {
        toggle.addEventListener('click', function () {
            nav.classList.contains('nav--open') ? closeNav() : openNav();
        });
    }

    overlay.addEventListener('click', closeNav);

    // Mobile dropdown toggle
    document.querySelectorAll('.nav__item').forEach(function (item) {
        const link = item.querySelector('.nav__link');
        const dropdown = item.querySelector('.nav__dropdown, .nav__mega');
        if (link && dropdown) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
});
