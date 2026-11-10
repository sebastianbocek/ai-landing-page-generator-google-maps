// SHIFT/26 — progressive enhancement. All content is readable without JS.
(function () {
  var d = document;
  d.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Nav
  var nav = d.querySelector('[data-nav]');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var btn = d.querySelector('[data-menu-btn]'), menu = d.getElementById('menu');
  var setMenu = function (open) { btn.setAttribute('aria-expanded', open); menu.classList.toggle('open', open); };
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); } });

  // Countdown — edit data-countdown on the element (ISO date, UTC).
  var cd = d.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.dataset.countdown).getTime();
    var parts = {}; ['d', 'h', 'm', 's'].forEach(function (k) { parts[k] = cd.querySelector('[data-cd="' + k + '"]'); });
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      var diff = Math.max(0, target - Date.now()), s = Math.floor(diff / 1000);
      parts.d.textContent = Math.floor(s / 86400);
      parts.h.textContent = pad(Math.floor(s % 86400 / 3600));
      parts.m.textContent = pad(Math.floor(s % 3600 / 60));
      parts.s.textContent = pad(s % 60);
      if (!diff) { cd.setAttribute('aria-label', 'The conference is live'); clearInterval(timer); }
    };
    var timer = setInterval(tick, 1000); tick();
  }

  // Schedule tabs (ARIA tabs pattern)
  var wrap = d.querySelector('[data-tabs]');
  if (wrap) {
    var list = wrap.querySelector('[role="tablist"]');
    var tabs = [].slice.call(list.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return d.getElementById(t.getAttribute('aria-controls')); });
    list.hidden = false;
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; panels[j].hidden = !on;
        if (on && !reduce) { panels[j].classList.remove('enter'); void panels[j].offsetWidth; panels[j].classList.add('enter'); }
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length;
        if (e.key === 'ArrowRight') select((i + 1) % n, true);
        else if (e.key === 'ArrowLeft') select((i - 1 + n) % n, true);
        else if (e.key === 'Home') select(0, true);
        else if (e.key === 'End') select(n - 1, true);
        else return;
        e.preventDefault();
      });
    });
    select(0);
  }

  // Demo form — remove data-demo once connected to Formspree / Netlify Forms.
  d.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      f.querySelector('.msg').textContent = "You're on the list! (Demo form — connect Formspree or Netlify Forms to collect emails.)";
      f.reset();
    });
  });

  // Reveal on scroll
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    d.querySelectorAll('.spk, .tix, .sec-head, .venue-map, details, .cta-in').forEach(function (el, i) {
      el.classList.add('reveal'); el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el);
    });
  }
})();
