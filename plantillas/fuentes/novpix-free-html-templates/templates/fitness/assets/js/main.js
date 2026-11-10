// Volt Athletic Club — progressive enhancement. The page is fully usable without JS.
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Sticky nav border + mobile menu
  var nav = d.querySelector('[data-nav]');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var btn = d.querySelector('[data-menu-btn]'), menu = d.getElementById('menu');
  var setMenu = function (open) { btn.setAttribute('aria-expanded', open); menu.classList.toggle('open', open); };
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); } });

  // Timetable tabs (ARIA tabs pattern with arrow-key support). Opens on today's day.
  var tabsWrap = d.querySelector('[data-tabs]');
  if (tabsWrap) {
    var list = tabsWrap.querySelector('[role="tablist"]');
    var tabs = [].slice.call(list.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return d.getElementById(t.getAttribute('aria-controls')); });
    list.hidden = false;
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
        if (on && !reduce) { panels[j].classList.remove('enter'); void panels[j].offsetWidth; panels[j].classList.add('enter'); }
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = e.key;
        if (k === 'ArrowRight') select((i + 1) % n, true);
        else if (k === 'ArrowLeft') select((i - 1 + n) % n, true);
        else if (k === 'Home') select(0, true);
        else if (k === 'End') select(n - 1, true);
        else return;
        e.preventDefault();
      });
    });
    select((new Date().getDay() + 6) % 7);
  }

  // Pricing billing toggle
  var billBtns = d.querySelectorAll('[data-billing]');
  billBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var yearly = b.dataset.billing === 'yearly';
      billBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      d.querySelectorAll('[data-m]').forEach(function (el) { el.textContent = yearly ? el.dataset.y : el.dataset.m; });
    });
  });

  // BMI calculator
  var bmi = d.querySelector('[data-bmi]');
  if (bmi) {
    var h = bmi.elements.height, w = bmi.elements.weight;
    var val = bmi.querySelector('[data-bmi-val]'), cat = bmi.querySelector('[data-bmi-cat]'), pin = bmi.querySelector('[data-bmi-pin]');
    var unit = function () { return bmi.querySelector('input[name="unit"]:checked').value; };
    var calc = function () {
      var hv = parseFloat(h.value), wv = parseFloat(w.value);
      if (!(hv > 0 && wv > 0)) { val.textContent = '—'; cat.textContent = 'Enter height & weight'; return; }
      var v = unit() === 'metric' ? wv / Math.pow(hv / 100, 2) : 703 * wv / (hv * hv);
      var c = v < 18.5 ? 'Below range' : v < 25 ? 'Healthy range' : v < 30 ? 'Above range' : 'Well above range';
      val.textContent = v.toFixed(1); cat.textContent = c;
      pin.style.left = Math.max(0, Math.min(100, v / 40 * 100)) + '%';
    };
    bmi.querySelectorAll('input[name="unit"]').forEach(function (r) {
      r.addEventListener('change', function () {
        var metric = unit() === 'metric', hv = parseFloat(h.value), wv = parseFloat(w.value);
        bmi.querySelector('[data-unit-h]').textContent = metric ? '(cm)' : '(in)';
        bmi.querySelector('[data-unit-w]').textContent = metric ? '(kg)' : '(lb)';
        if (hv) h.value = metric ? Math.round(hv * 2.54) : Math.round(hv / 2.54);
        if (wv) w.value = metric ? Math.round(wv / 2.2046) : Math.round(wv * 2.2046);
        calc();
      });
    });
    bmi.addEventListener('input', calc);
    bmi.addEventListener('submit', function (e) { e.preventDefault(); calc(); });
    calc();
  }

  // Demo form handler — remove data-demo when you connect Formspree / Netlify Forms.
  d.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      f.querySelector('.msg').textContent = "You're in! (Demo form — connect Formspree or Netlify Forms to receive sign-ups.)";
      f.reset();
    });
  });

  // Scroll reveal
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    d.querySelectorAll('.prog, .coach, .plan, .story, .bmi, .trial-form, .sec-head').forEach(function (el, i) {
      el.classList.add('reveal'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el);
    });
  }
})();
