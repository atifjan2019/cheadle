// ============================================================
// FEATURED SERVICES SLIDER — Homepage
// ============================================================

(function () {
    'use strict';

    var track = document.getElementById('slider-track');
    var slides = document.querySelectorAll('.hp-slide');
    var dots = document.querySelectorAll('.hp-slider__dot');
    var thumbs = document.querySelectorAll('.hp-slider__thumb');
    var prevBtn = document.getElementById('slider-prev');
    var nextBtn = document.getElementById('slider-next');

    if (!track || slides.length === 0) return;

    var current = 0;
    var total = slides.length;
    var autoTimer = null;
    var AUTO_DELAY = 5000; // ms between auto-advances

    // ── Go to slide ─────────────────────────────────────────────
    function goTo(index) {
        // Wrap around
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;

        // Remove active from current slide
        slides[current].classList.remove('is-active');

        current = index;

        // Move track
        track.style.transform = 'translateX(-' + (current * 100) + '%)';

        // Activate new slide (triggers Ken-Burns)
        slides[current].classList.add('is-active');

        // Update dots
        dots.forEach(function (d, i) {
            d.classList.toggle('hp-slider__dot--active', i === current);
            d.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });

        // Update thumbnails
        thumbs.forEach(function (t, i) {
            t.classList.toggle('hp-slider__thumb--active', i === current);
        });
    }

    // ── Auto-play ───────────────────────────────────────────────
    function startAuto() {
        stopAuto();
        autoTimer = setInterval(function () {
            goTo(current + 1);
        }, AUTO_DELAY);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
    }

    // ── Event listeners ─────────────────────────────────────────
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            goTo(current - 1);
            stopAuto();
            startAuto();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            goTo(current + 1);
            stopAuto();
            startAuto();
        });
    }

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goTo(parseInt(this.getAttribute('data-slide'), 10));
            stopAuto();
            startAuto();
        });
    });

    thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            goTo(parseInt(this.getAttribute('data-slide'), 10));
            stopAuto();
            startAuto();
        });
    });

    // ── Touch/Swipe support ─────────────────────────────────────
    var touchStartX = 0;
    var trackWrap = document.getElementById('slider-track-wrap');

    if (trackWrap) {
        trackWrap.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        trackWrap.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) {
                goTo(dx < 0 ? current + 1 : current - 1);
                stopAuto();
                startAuto();
            }
        }, { passive: true });
    }

    // ── Pause on hover ──────────────────────────────────────────
    var sliderEl = document.getElementById('featured-services');
    if (sliderEl) {
        sliderEl.addEventListener('mouseenter', stopAuto);
        sliderEl.addEventListener('mouseleave', startAuto);
    }

    // ── Keyboard navigation ─────────────────────────────────────
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { goTo(current - 1); stopAuto(); startAuto(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); stopAuto(); startAuto(); }
    });

    // ── Init ────────────────────────────────────────────────────
    goTo(0);
    startAuto();

})();
