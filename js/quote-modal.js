/* =========================================================================
   QUOTE MODAL — Interactive Logic
   Uses polling to wait for the modal HTML to be injected by load-includes.js
   ========================================================================= */
(function () {
    'use strict';

    function initQuoteModal() {
        var backdrop = document.getElementById('qm-backdrop');
        var modal = document.getElementById('quote-modal');
        if (!backdrop || !modal) return false; // Not ready yet

        var closeBtn = modal.querySelector('.qm__close');
        var steps = modal.querySelectorAll('.qm__step');
        var dots = modal.querySelectorAll('.qm__step-dot');
        var form = document.getElementById('qm-form');
        var successEl = modal.querySelector('.qm__success');

        var currentStep = 0;

        /* --- Open / Close --- */
        function openModal() {
            backdrop.classList.add('is-active');
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            backdrop.classList.remove('is-active');
            modal.classList.remove('is-active');
            document.body.style.overflow = '';
            setTimeout(function () {
                goToStep(0);
                if (form) form.reset();
                var cards = modal.querySelectorAll('.qm__service-card.is-selected');
                for (var i = 0; i < cards.length; i++) cards[i].classList.remove('is-selected');
                if (successEl) successEl.classList.remove('is-active');
                for (var j = 0; j < steps.length; j++) steps[j].classList.remove('is-active');
                if (steps[0]) steps[0].classList.add('is-active');
            }, 400);
        }

        // Wire up ALL quote triggers on the entire page
        var triggers = document.querySelectorAll('[data-quote-trigger]');
        for (var t = 0; t < triggers.length; t++) {
            triggers[t].addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openModal();
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        // Also allow clicking the modal overlay (outside panel) to close
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal();
        });

        // Prevent clicks inside panel from closing
        var panel = modal.querySelector('.qm__panel');
        if (panel) panel.addEventListener('click', function (e) { e.stopPropagation(); });

        /* --- Step Navigation --- */
        function goToStep(n) {
            currentStep = n;
            for (var i = 0; i < steps.length; i++) {
                if (i === n) steps[i].classList.add('is-active');
                else steps[i].classList.remove('is-active');
            }
            for (var j = 0; j < dots.length; j++) {
                dots[j].classList.remove('is-active');
                dots[j].classList.remove('is-done');
                if (j === n) dots[j].classList.add('is-active');
                else if (j < n) dots[j].classList.add('is-done');
            }
            updateStepHeader(n);
        }

        function updateStepHeader(n) {
            var label = modal.querySelector('.qm__form-step-label');
            var title = modal.querySelector('.qm__form-title');
            var labels = ['Step 1 of 3', 'Step 2 of 3', 'Step 3 of 3'];
            var titles = [
                'What can we help you with?',
                'Tell us about your project',
                'Your contact details'
            ];
            if (label && labels[n]) label.textContent = labels[n];
            if (title && titles[n]) title.textContent = titles[n];
        }

        // Next buttons
        var nextBtns = modal.querySelectorAll('[data-qm-next]');
        for (var n = 0; n < nextBtns.length; n++) {
            nextBtns[n].addEventListener('click', function () {
                if (currentStep < steps.length - 1) goToStep(currentStep + 1);
            });
        }

        // Back buttons
        var backBtns = modal.querySelectorAll('[data-qm-back]');
        for (var b = 0; b < backBtns.length; b++) {
            backBtns[b].addEventListener('click', function () {
                if (currentStep > 0) goToStep(currentStep - 1);
            });
        }

        /* --- Service card selection --- */
        var serviceCards = modal.querySelectorAll('.qm__service-card');
        for (var s = 0; s < serviceCards.length; s++) {
            serviceCards[s].addEventListener('click', function () {
                for (var x = 0; x < serviceCards.length; x++) serviceCards[x].classList.remove('is-selected');
                this.classList.add('is-selected');
                var radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            });
        }

        /* --- Form submission --- */
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                var currentStepEl = steps[currentStep];
                if (!currentStepEl) return;
                var requiredFields = currentStepEl.querySelectorAll('[required]');
                var valid = true;
                for (var r = 0; r < requiredFields.length; r++) {
                    var f = requiredFields[r];
                    if (!f.value.trim()) {
                        f.style.borderColor = 'rgba(252, 3, 1, 0.6)';
                        valid = false;
                        (function (field) {
                            setTimeout(function () { field.style.borderColor = ''; }, 2000);
                        })(f);
                    }
                }

                if (!valid) return;

                // Show success state
                for (var i = 0; i < steps.length; i++) steps[i].classList.remove('is-active');
                for (var j = 0; j < dots.length; j++) {
                    dots[j].classList.remove('is-active');
                    dots[j].classList.add('is-done');
                }
                if (successEl) successEl.classList.add('is-active');

                var label = modal.querySelector('.qm__form-step-label');
                var title = modal.querySelector('.qm__form-title');
                if (label) label.textContent = 'All Done';
                if (title) title.textContent = 'Thank you!';
            });
        }

        return true; // Successfully initialised
    }

    // Poll until modal HTML is in the DOM (loaded by load-includes.js)
    var attempts = 0;
    var maxAttempts = 50; // 5 seconds max
    var pollInterval = setInterval(function () {
        attempts++;
        if (initQuoteModal() || attempts >= maxAttempts) {
            clearInterval(pollInterval);
        }
    }, 100);

})();
