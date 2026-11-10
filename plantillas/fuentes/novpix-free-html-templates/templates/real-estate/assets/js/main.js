/* Haven real estate template — vanilla JS enhancements.
   The listing grid is also rendered as static HTML, so the page works without JS.
   Edit LISTINGS below to change the demo properties (price in USD; rent = per month). */
(function () {
  'use strict';

  var LISTINGS = [
    {
      "id": 1,
      "title": "Modern family home with garden studio",
      "address": "14 Linden Crescent",
      "city": "Northfield",
      "type": "house",
      "status": "sale",
      "price": 1285000,
      "beds": 4,
      "baths": 3,
      "area": 2860,
      "year": 2019,
      "lot": 6200,
      "garage": 2,
      "img": "house-modern.svg",
      "isNew": true
    },
    {
      "id": 2,
      "title": "Storybook cottage near the green",
      "address": "3 Mill Lane",
      "city": "Ashbury",
      "type": "house",
      "status": "sale",
      "price": 649000,
      "beds": 3,
      "baths": 2,
      "area": 1640,
      "year": 1932,
      "lot": 4800,
      "garage": 1,
      "img": "house-cottage.svg",
      "isNew": false
    },
    {
      "id": 3,
      "title": "Restored brick townhouse",
      "address": "88 Carver Street",
      "city": "Old Town",
      "type": "townhouse",
      "status": "sale",
      "price": 915000,
      "beds": 3,
      "baths": 2.5,
      "area": 2100,
      "year": 1905,
      "lot": 1800,
      "garage": 0,
      "img": "house-townhouse.svg",
      "isNew": true
    },
    {
      "id": 4,
      "title": "Light-filled 2-bed with balcony",
      "address": "Unit 6C, 210 Harbour Walk",
      "city": "Waterfront",
      "type": "apartment",
      "status": "rent",
      "price": 3200,
      "beds": 2,
      "baths": 2,
      "area": 1080,
      "year": 2021,
      "lot": 0,
      "garage": 1,
      "img": "house-apartment.svg",
      "isNew": false
    },
    {
      "id": 5,
      "title": "Hillside villa with pool & views",
      "address": "7 Olive Ridge",
      "city": "Westhills",
      "type": "house",
      "status": "sale",
      "price": 2450000,
      "beds": 5,
      "baths": 4.5,
      "area": 4300,
      "year": 2015,
      "lot": 14500,
      "garage": 3,
      "img": "house-villa.svg",
      "isNew": false
    },
    {
      "id": 6,
      "title": "Warehouse loft, double-height ceilings",
      "address": "Loft 4, 12 Foundry Yard",
      "city": "Arts District",
      "type": "apartment",
      "status": "sale",
      "price": 789000,
      "beds": 2,
      "baths": 2,
      "area": 1720,
      "year": 1924,
      "lot": 0,
      "garage": 1,
      "img": "house-loft.svg",
      "isNew": false
    },
    {
      "id": 7,
      "title": "Garden-level studio apartment",
      "address": "2A, 45 Elm Row",
      "city": "Old Town",
      "type": "apartment",
      "status": "rent",
      "price": 1750,
      "beds": 1,
      "baths": 1,
      "area": 560,
      "year": 1968,
      "lot": 0,
      "garage": 0,
      "img": "house-apartment.svg",
      "isNew": true
    },
    {
      "id": 8,
      "title": "Family townhouse by the park",
      "address": "21 Parkside Mews",
      "city": "Northfield",
      "type": "townhouse",
      "status": "rent",
      "price": 4100,
      "beds": 4,
      "baths": 3,
      "area": 2250,
      "year": 2008,
      "lot": 1600,
      "garage": 1,
      "img": "house-townhouse.svg",
      "isNew": false
    },
    {
      "id": 9,
      "title": "Country cottage with orchard",
      "address": "Orchard End, Kings Road",
      "city": "Ashbury",
      "type": "house",
      "status": "sale",
      "price": 720000,
      "beds": 3,
      "baths": 2,
      "area": 1900,
      "year": 1911,
      "lot": 21000,
      "garage": 2,
      "img": "house-cottage.svg",
      "isNew": false
    }
  ];

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  var num = new Intl.NumberFormat('en-US');
  var ICON = {
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 18v-8M21 18v-5a3 3 0 0 0-3-3H10v5M3 15h18M6.5 12.5a1.5 1.5 0 1 0 0-.01"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };

  // ---------- Mobile menu ----------
  var toggle = $('.menu-toggle');
  var links = $('#nav-links');
  if (toggle && links) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      links.classList.toggle('open', open);
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  // ---------- Reveal ----------
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  // ---------- Listing cards ----------
  function priceLabel(l) { return money.format(l.price) + (l.status === 'rent' ? '<small> /mo</small>' : ''); }
  function card(l) {
    return '<article class="card">' +
      '<div class="card-media"><img src="assets/img/' + l.img + '" alt="' + l.title + '" loading="lazy" width="800" height="600">' +
      '<span class="badge ' + (l.status === 'rent' ? 'rent' : '') + '">' + (l.status === 'rent' ? 'For rent' : 'For sale') + '</span>' +
      (l.isNew ? '<span class="badge new">New</span>' : '') + '</div>' +
      '<div class="card-body"><p class="price">' + priceLabel(l) + '</p>' +
      '<h3><a href="listing.html?id=' + l.id + '">' + l.title + '</a></h3>' +
      '<p class="addr">' + l.address + ', ' + l.city + '</p>' +
      '<ul class="specs"><li>' + ICON.bed + l.beds + ' bd</li><li>' + ICON.bath + l.baths + ' ba</li><li>' + ICON.area + num.format(l.area) + ' sq ft</li></ul>' +
      '</div></article>';
  }

  var grid = $('#listings');
  var form = $('#search');
  if (grid && form) {
    var count = $('#result-count');
    var sort = $('#sort');
    var chips = $$('.chips button');
    var typeFilter = 'all';

    var apply = function () {
      var f = form.elements;
      var q = (f.q.value || '').trim().toLowerCase();
      var status = f.status.value;
      var type = f.type.value !== 'any' ? f.type.value : typeFilter;
      var beds = parseInt(f.beds.value, 10) || 0;
      var max = parseInt(f.max.value, 10) || Infinity;
      var list = LISTINGS.filter(function (l) {
        if (status !== 'any' && l.status !== status) return false;
        if (type !== 'all' && type !== 'any' && l.type !== type) return false;
        if (l.beds < beds) return false;
        if (l.status === 'sale' && l.price > max) return false;
        if (q && (l.title + ' ' + l.address + ' ' + l.city + ' ' + l.type).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      var s = sort ? sort.value : 'featured';
      if (s === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
      if (s === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
      if (s === 'size') list.sort(function (a, b) { return b.area - a.area; });
      if (s === 'new') list.sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); });
      grid.innerHTML = list.length ? list.map(card).join('') :
        '<p class="empty">No homes match those filters yet. Try widening your search or <a href="#contact">ask us to set up an alert</a>.</p>';
      if (count) count.textContent = list.length + (list.length === 1 ? ' home' : ' homes');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault(); apply();
      var target = $('#homes'); if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    form.addEventListener('change', function (e) { if (e.target.name === 'status') apply(); });
    if (sort) sort.addEventListener('change', apply);
    chips.forEach(function (btn) {
      btn.addEventListener('click', function () {
        typeFilter = btn.dataset.type;
        form.elements.type.value = 'any';
        chips.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        apply();
      });
    });
    apply();
  }

  // ---------- Listing detail (listing.html?id=N) ----------
  var detail = $('[data-listing]');
  if (detail) {
    var id = parseInt(new URLSearchParams(location.search).get('id'), 10) || 1;
    var l = LISTINGS.filter(function (x) { return x.id === id; })[0] || LISTINGS[0];
    var set = function (key, html) { $$('[data-field="' + key + '"]').forEach(function (el) { el.innerHTML = html; }); };
    set('title', l.title);
    set('address', l.address + ', ' + l.city);
    set('price', priceLabel(l));
    set('beds', l.beds); set('baths', l.baths); set('area', num.format(l.area));
    set('year', l.year); set('garage', l.garage ? l.garage + '-car' : 'Street parking');
    set('lot', l.lot ? num.format(l.lot) + ' sq ft' : '—');
    set('type', l.type.charAt(0).toUpperCase() + l.type.slice(1));
    set('status', l.status === 'rent' ? 'For rent' : 'For sale');
    set('ppsf', l.status === 'rent' ? '—' : money.format(Math.round(l.price / l.area)));
    set('ref', 'HVN-' + (1000 + l.id));
    var hero = $('[data-field-img]'); if (hero) { hero.src = 'assets/img/' + l.img; hero.alt = l.title; }
    document.title = l.title + ' — ' + l.city + ' | Haven Realty';
    var msg = $('#enq-msg'); if (msg && !msg.value) msg.value = 'Hi, I\'d like more information about ' + l.address + ' (HVN-' + (1000 + l.id) + '). Is it still available?';
    var mc = $('#mortgage');
    if (mc) {
      if (l.status === 'rent') { mc.closest('section').hidden = true; }
      else mc.elements.price.value = l.price;
    }
    var similar = $('#similar');
    if (similar) similar.innerHTML = LISTINGS.filter(function (x) { return x.id !== l.id && x.status === l.status; }).slice(0, 3).map(card).join('');
  }

  // ---------- Mortgage calculator ----------
  // Monthly P&I: M = P · r(1+r)^n / ((1+r)^n − 1), where r = annual rate / 12, n = years × 12
  var mc2 = $('#mortgage');
  if (mc2) {
    var calc = function () {
      var e = mc2.elements;
      var price = Math.max(0, parseFloat(e.price.value) || 0);
      var downPct = parseFloat(e.down.value) || 0;
      var rate = parseFloat(e.rate.value) || 0;
      var years = parseInt(e.term.value, 10) || 30;
      var P = price * (1 - downPct / 100);
      var r = rate / 100 / 12, n = years * 12;
      var pi = r ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n;
      var tax = price * 0.011 / 12;       // ~1.1% property tax / yr
      var ins = price * 0.0035 / 12;      // ~0.35% home insurance / yr
      var total = pi + tax + ins;
      $('#down-out').textContent = downPct + '% · ' + money.format(price * downPct / 100);
      $('#rate-out').textContent = rate.toFixed(2) + '%';
      $('#m-total').textContent = money.format(total);
      $('#m-pi').textContent = money.format(pi);
      $('#m-tax').textContent = money.format(tax);
      $('#m-ins').textContent = money.format(ins);
      $('#m-loan').textContent = money.format(P);
      $('#m-interest').textContent = money.format(pi * n - P);
      var t = total || 1;
      $('.bar .pi').style.width = (pi / t * 100) + '%';
      $('.bar .tx').style.width = (tax / t * 100) + '%';
      $('.bar .ins').style.width = (ins / t * 100) + '%';
    };
    mc2.addEventListener('input', calc);
    mc2.addEventListener('submit', function (e) { e.preventDefault(); calc(); });
    calc();
  }

  // ---------- Demo forms ----------
  $$('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = f.querySelector('.form-msg') || f.parentElement.querySelector('.form-msg');
      if (out) { out.textContent = 'Thanks! Your message is on its way. (Demo form — connect Formspree or Netlify Forms to receive enquiries.)'; out.hidden = false; }
      f.reset();
    });
  });

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
