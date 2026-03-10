/**
 * Hero Dual-Video Sequential Playback
 * Plays Video A (Drone House Zoom Out), then crossfades into Video B (Drone Pull Away),
 * then loops back to Video A — endlessly.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const vidA = document.getElementById('hero-vid-a');
        const vidB = document.getElementById('hero-vid-b');

        if (!vidA || !vidB) return;

        const FADE_DURATION_MS = 1200; // must match CSS transition duration

        // Start with Video A active
        function activateA() {
            vidA.classList.add('hp-hero__video--active');
            vidB.classList.remove('hp-hero__video--active');
            vidA.currentTime = 0;
            vidA.play().catch(() => { });
        }

        function activateB() {
            vidB.classList.add('hp-hero__video--active');
            vidA.classList.remove('hp-hero__video--active');
            vidB.currentTime = 0;
            vidB.play().catch(() => { });
        }

        // When A ends, crossfade to B
        vidA.addEventListener('ended', function () {
            activateB();
        });

        // When B ends, crossfade back to A
        vidB.addEventListener('ended', function () {
            activateA();
        });

        // Also preload B in the background as A plays
        vidB.load();

        // Kick it off — try to autoplay A immediately
        vidA.play().then(function () {
            vidA.classList.add('hp-hero__video--active');
        }).catch(function () {
            // Browsers that block autoplay: show poster via opacity still 0 on both.
            // Add active class anyway to reveal the poster image of vidA.
            vidA.classList.add('hp-hero__video--active');
        });
    });
})();
