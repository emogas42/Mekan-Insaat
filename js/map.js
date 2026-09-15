/* ═══════════════════════════════════════════
   MƏKAN İNŞAAT — map.js  (Leaflet + Baku)
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  const mapEl = document.getElementById('baku-map');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map('baku-map', {
    center: [40.4093, 49.8671],
    zoom: 12,
    scrollWheelZoom: false,
    zoomControl: false,
  });
  map.attributionControl.setPrefix('Leaflet');

  /* Tile layer — OpenStreetMap standard (free, no API key required).
     Desaturated to a light, tidy grayscale via .leaflet-tile-pane filter in main.css. */
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    subdomains: 'abc',
    maxZoom: 19,
  }).addTo(map);

  /* Zoom control — bottom right */
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  /* Custom gold marker */
  const goldIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:14px;height:14px;
      border-radius:50%;
      background:#00C4D4;
      border:3px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });

  /* Project locations in Baku */
  const projects = [
    {
      coords: [40.4093, 49.8671],
      name: 'Əliağa Qasımov küçəsi, 12',
      type: 'Yaşayış Kompleksi',
      area: '4 200 m²',
      year: '2023',
    },
    {
      coords: [40.3977, 49.8476],
      name: 'Neftçilər prospekti, 85',
      type: 'Kommersiya Binası',
      area: '2 800 m²',
      year: '2022',
    },
    {
      coords: [40.4200, 49.8900],
      name: 'Xaqani küçəsi, 34',
      type: 'İnzibati Bina',
      area: '1 600 m²',
      year: '2023',
    },
    {
      coords: [40.3850, 49.8550],
      name: 'Biləcəri qəsəbəsi',
      type: 'Çoxmənzilli Yaşayış Binası',
      area: '8 500 m²',
      year: '2021',
    },
    {
      coords: [40.4350, 49.8400],
      name: 'Novxanı qəsəbəsi',
      type: 'Villa Kompleksi',
      area: '3 200 m²',
      year: '2024',
    },
    {
      coords: [40.4500, 49.9200],
      name: 'Maştağa qəsəbəsi',
      type: 'Otel Layihəsi',
      area: '5 100 m²',
      year: '2022',
    },
    {
      coords: [40.3720, 49.8320],
      name: 'Binəqədi rayonu',
      type: 'Hovuzlu Villa',
      area: '920 m²',
      year: '2024',
    },
  ];

  projects.forEach(p => {
    const marker = L.marker(p.coords, { icon: goldIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family:'Inter',sans-serif;min-width:180px">
        <div class="popup-type">${p.type}</div>
        <div class="popup-title">${p.name}</div>
        <div style="margin-top:.5rem;font-size:.78rem;color:#64748b;display:flex;flex-direction:column;gap:.2rem">
          <span>📐 ${p.area}</span>
          <span>📅 ${p.year}</span>
        </div>
      </div>
    `, { maxWidth: 260 });
  });

  /* Pulse animation on markers via CSS injection */
  const style = document.createElement('style');
  style.textContent = `
    .leaflet-marker-icon div {
      animation: markerPulse 2.5s ease-in-out infinite;
    }
    @keyframes markerPulse {
      0%, 100% { box-shadow: 0 2px 8px rgba(0,0,0,.4), 0 0 0 0 rgba(0,196,212,.5); }
      50%       { box-shadow: 0 2px 8px rgba(0,0,0,.4), 0 0 0 8px rgba(0,196,212,0); }
    }
  `;
  document.head.appendChild(style);

})();
