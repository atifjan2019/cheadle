/* =========================================================================
   PROJECTS-MAP.JS — Cheadle Construction
   Robust Leaflet interactive map of current live projects.
   Waits for full window load so Leaflet + DOM are both ready.
   ========================================================================= */

window.addEventListener('load', function () {
    'use strict';

    var mapEl = document.getElementById('projects-map');
    if (!mapEl || typeof L === 'undefined') {
        console.warn('Projects map: Leaflet not available or #projects-map missing.');
        return;
    }

    /* ------------------------------------------------------------------
       PROJECT DATA  — real GPS for Cheadle/Stockport/Manchester area
    ------------------------------------------------------------------ */
    var projects = [
        {
            id: 'p1',
            title: 'Belmont Road Extension',
            type: 'Double-Storey Extension',
            location: 'Cheadle, Stockport SK8',
            lat: 53.3781, lng: -2.2058,
            status: 'In Progress', statusClass: 'status--active',
            pct: 65,
            desc: 'A stunning two-storey rear extension transforming a 1960s semi-detached into a contemporary family home. Features open-plan kitchen-diner, master bedroom suite and bi-fold garden doors.',
            photos: ['images/project-extension-cheadle.png'],
            facts: [
                { label: 'Client', value: 'Private Residential' },
                { label: 'Value', value: '£85,000' },
                { label: 'Duration', value: '16 weeks' },
                { label: 'Start Date', value: 'Jan 2026' }
            ]
        },
        {
            id: 'p2',
            title: 'Maple Grove Loft Conversion',
            type: 'Full Dormer Loft Conversion',
            location: 'Bramhall, Stockport SK7',
            lat: 53.3556, lng: -2.1652,
            status: 'In Progress', statusClass: 'status--active',
            pct: 40,
            desc: 'Full dormer loft conversion creating two additional bedrooms and an en-suite. Velux windows flood the new space with natural light. Structural steels installed, plasterboarding underway.',
            photos: ['images/project-loft-bramhall.png'],
            facts: [
                { label: 'Client', value: 'Private Residential' },
                { label: 'Value', value: '£48,000' },
                { label: 'Duration', value: '12 weeks' },
                { label: 'Start Date', value: 'Feb 2026' }
            ]
        },
        {
            id: 'p3',
            title: 'Hawthorn Business Park',
            type: 'Commercial Office Fit-Out',
            location: 'Wilmslow, Cheshire SK9',
            lat: 53.3268, lng: -2.2302,
            status: 'Starting Soon', statusClass: 'status--upcoming',
            pct: 15,
            desc: 'Ground-floor commercial office fit-out for a growing tech firm. Open-plan layout with glass partitions, server room, breakout pods and full M&E installation across 4,200 sq ft.',
            photos: ['images/project-commercial-wilmslow.png'],
            facts: [
                { label: 'Client', value: 'Commercial Tenant' },
                { label: 'Value', value: '£210,000' },
                { label: 'Duration', value: '20 weeks' },
                { label: 'Start Date', value: 'Mar 2026' }
            ]
        },
        {
            id: 'p4',
            title: 'The Grange — New Build',
            type: 'Luxury New Build Detached',
            location: 'Alderley Edge, Cheshire SK9',
            lat: 53.3043, lng: -2.2383,
            status: 'In Progress', statusClass: 'status--active',
            pct: 80,
            desc: 'A bespoke 5-bedroom detached home in one of Cheshire\'s most prestigious postcodes. Red brick and stone facade with slate roof, triple garage and landscaped 0.5-acre plot. Finishing touches underway.',
            photos: ['images/project-newbuild-alderley.png'],
            facts: [
                { label: 'Client', value: 'Private Developer' },
                { label: 'Value', value: '£1.2M' },
                { label: 'Duration', value: '52 weeks' },
                { label: 'Start Date', value: 'Mar 2025' }
            ]
        },
        {
            id: 'p5',
            title: 'Victoria Terrace Kitchen',
            type: 'Full Kitchen Renovation',
            location: 'Didsbury, Manchester M20',
            lat: 53.4195, lng: -2.2328,
            status: 'Finishing', statusClass: 'status--finishing',
            pct: 92,
            desc: 'High-end kitchen renovation in a Victorian terraced property. Custom navy shaker units, Calacatta marble worktops, Lacanche range cooker and bi-fold doors opening onto a newly landscaped garden.',
            photos: ['images/project-kitchen-didsbury.png'],
            facts: [
                { label: 'Client', value: 'Private Residential' },
                { label: 'Value', value: '£32,000' },
                { label: 'Duration', value: '6 weeks' },
                { label: 'Start Date', value: 'Feb 2026' }
            ]
        }
    ];

    /* ------------------------------------------------------------------
       MAP INITIALISATION
    ------------------------------------------------------------------ */
    var map = L.map('projects-map', {
        center: [53.366, -2.205],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true
    });

    // Primary: CartoDB Dark Matter (dark, stylish)
    // Fallback: OpenStreetMap (always works)
    var cartoDB = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
            attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OSM contributors',
            subdomains: 'abcd',
            maxZoom: 19,
            errorTileUrl: ''
        }
    );

    var osm = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 19
        }
    );

    // Try CartoDB first; if a tile errors, switch to OSM
    var cartodBFailed = false;
    cartoDB.on('tileerror', function () {
        if (!cartodBFailed) {
            cartodBFailed = true;
            map.removeLayer(cartoDB);
            osm.addTo(map);
        }
    });
    cartoDB.addTo(map);

    // Force size recalculation (fixes "grey tiles" on hidden-then-shown containers)
    setTimeout(function () { map.invalidateSize(); }, 100);
    setTimeout(function () { map.invalidateSize(); }, 500);

    /* ------------------------------------------------------------------
       CUSTOM PIN ICON
    ------------------------------------------------------------------ */
    function makeIcon(isActive) {
        var colour = isActive ? '#fc0301' : '#cc2200';
        var glow = isActive ? 'drop-shadow(0 0 8px rgba(252,3,1,0.9))' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))';
        return L.divIcon({
            className: '',
            html:
                '<div style="position:relative;display:inline-block;filter:' + glow + ';' +
                (isActive ? 'transform:scale(1.2);' : '') + 'transition:all 0.25s ease;">' +
                '<svg width="30" height="38" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M15 0C8.373 0 3 5.373 3 12c0 8 12 26 12 26S27 20 27 12C27 5.373 21.627 0 15 0z" fill="' + colour + '"/>' +
                '<circle cx="15" cy="12" r="5" fill="rgba(255,255,255,0.95)"/>' +
                (isActive ? '<circle cx="15" cy="12" r="2.5" fill="' + colour + '"/>' : '') +
                '</svg>' +
                (isActive ?
                    '<div style="position:absolute;top:3px;left:50%;transform:translateX(-50%);' +
                    'width:18px;height:18px;border-radius:50%;border:2px solid rgba(252,3,1,0.5);' +
                    'animation:proj-pulse 1.4s ease-out infinite;pointer-events:none;"></div>' : '') +
                '</div>',
            iconSize: [30, 38],
            iconAnchor: [15, 38],
            popupAnchor: [0, -42]
        });
    }

    // Inject pulse keyframes once
    if (!document.getElementById('proj-pulse-style')) {
        var st = document.createElement('style');
        st.id = 'proj-pulse-style';
        st.textContent =
            '@keyframes proj-pulse {' +
            '0%   { transform: translateX(-50%) scale(1); opacity: 0.8; }' +
            '100% { transform: translateX(-50%) scale(3); opacity: 0; }' +
            '}';
        document.head.appendChild(st);
    }

    /* ------------------------------------------------------------------
       PANEL ELEMENTS
    ------------------------------------------------------------------ */
    var panelCard = document.getElementById('proj-panel-card');
    var projPhoto = document.getElementById('proj-photo');
    var projPhotoCount = document.getElementById('proj-photo-count');
    var projPhotoPrev = document.getElementById('proj-photo-prev');
    var projPhotoNext = document.getElementById('proj-photo-next');
    var projStatusBadge = document.getElementById('proj-status-badge');
    var projType = document.getElementById('proj-type');
    var projTitle = document.getElementById('proj-title');
    var projLocationText = document.getElementById('proj-location-text');
    var projDesc = document.getElementById('proj-desc');
    var projFacts = document.getElementById('proj-facts');
    var projPct = document.getElementById('proj-pct');
    var projFill = document.getElementById('proj-progress-fill');

    var currentPhotos = [];
    var currentPhotoIdx = 0;
    var markersMap = {};

    function updatePhoto() {
        if (!currentPhotos.length) return;
        projPhoto.src = currentPhotos[currentPhotoIdx];
        projPhotoCount.textContent = (currentPhotoIdx + 1) + ' / ' + currentPhotos.length;
        projPhotoPrev.style.opacity = currentPhotoIdx === 0 ? '0.3' : '1';
        projPhotoNext.style.opacity = currentPhotoIdx === currentPhotos.length - 1 ? '0.3' : '1';
    }

    if (projPhotoPrev && projPhotoNext) {
        projPhotoPrev.addEventListener('click', function () {
            if (currentPhotoIdx > 0) { currentPhotoIdx--; updatePhoto(); }
        });
        projPhotoNext.addEventListener('click', function () {
            if (currentPhotoIdx < currentPhotos.length - 1) { currentPhotoIdx++; updatePhoto(); }
        });
    }

    /* ------------------------------------------------------------------
       SHOW PROJECT IN PANEL
    ------------------------------------------------------------------ */
    function showProject(proj) {
        // Reset all marker icons
        Object.keys(markersMap).forEach(function (id) {
            markersMap[id].setIcon(makeIcon(false));
        });
        // Highlight the clicked one
        if (markersMap[proj.id]) {
            markersMap[proj.id].setIcon(makeIcon(true));
        }

        // Photos
        currentPhotos = proj.photos;
        currentPhotoIdx = 0;
        updatePhoto();

        // Status badge
        projStatusBadge.textContent = proj.status;
        projStatusBadge.className = 'proj-card__status-badge ' + proj.statusClass;

        // Text
        projType.textContent = proj.type;
        projTitle.textContent = proj.title;
        projLocationText.textContent = proj.location;
        projDesc.textContent = proj.desc;

        // Facts grid
        projFacts.innerHTML = proj.facts.map(function (f) {
            return '<div class="proj-card__fact">' +
                '<span class="proj-card__fact-label">' + f.label + '</span>' +
                '<span class="proj-card__fact-value">' + f.value + '</span>' +
                '</div>';
        }).join('');

        // Progress bar — animate in
        var pct = proj.pct;
        projPct.textContent = pct + '%';
        projFill.style.width = '0%';
        setTimeout(function () { projFill.style.width = pct + '%'; }, 60);

        // Sync sidebar active states
        var sidebarItems = document.querySelectorAll('.proj-sidebar__item');
        sidebarItems.forEach(function (el) {
            el.classList.toggle('is-active', el.dataset.projId === proj.id);
        });

        // Switch panel visibility
        if (panelCard) {
            panelCard.hidden = false;
            panelCard.classList.add('proj-panel--entering');
            setTimeout(function () { panelCard.classList.remove('proj-panel--entering'); }, 400);
        }

        // Pan map smoothly
        map.panTo([proj.lat, proj.lng], { animate: true, duration: 0.6 });
    }

    /* ------------------------------------------------------------------
       CREATE MARKERS
    ------------------------------------------------------------------ */
    projects.forEach(function (proj) {
        var marker = L.marker([proj.lat, proj.lng], {
            icon: makeIcon(false),
            title: proj.title,
            alt: proj.title
        }).addTo(map);

        marker.bindTooltip(
            '<strong style="color:#fc0301">' + proj.title + '</strong><br>' +
            '<span style="color:rgba(255,255,255,0.65);font-size:0.75rem">' + proj.location + '</span>',
            { className: 'proj-tooltip', direction: 'top', offset: [0, -40], sticky: false }
        );

        marker.on('click', function () { showProject(proj); });
        markersMap[proj.id] = marker;
    });

    /* ------------------------------------------------------------------
       BUILD SIDEBAR PROJECT LIST
    ------------------------------------------------------------------ */
    var sidebar = document.getElementById('projects-sidebar');
    if (sidebar) {
        projects.forEach(function (proj) {
            var btn = document.createElement('button');
            btn.className = 'proj-sidebar__item';
            btn.dataset.projId = proj.id;
            btn.setAttribute('aria-label', 'View ' + proj.title);
            btn.innerHTML =
                '<span class="proj-sidebar__dot"></span>' +
                '<span class="proj-sidebar__info">' +
                '<span class="proj-sidebar__name">' + proj.title + '</span>' +
                '<span class="proj-sidebar__loc">' + proj.location + '</span>' +
                '</span>';
            btn.addEventListener('click', function () { showProject(proj); });
            sidebar.appendChild(btn);
        });
    }

    // Auto-open first project immediately so panel is never empty
    showProject(projects[0]);
});
