/* Developer résumé template — progressive enhancements (the page works without JS). */
(function () {
  var root = document.documentElement;
  var KEY = 'zt-dev-theme';

  // Light / dark toggle, remembered in localStorage
  var themeBtn = document.querySelector('.theme-toggle');
  var current = function () {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  var label = function () { if (themeBtn) themeBtn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); };
  if (themeBtn) {
    label();
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
  }

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    var setOpen = function (open) { toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('open', open); };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  // Print button
  document.querySelectorAll('.print-btn').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  // Static contribution heatmap (deterministic, so it looks the same on every load)
  var heat = document.querySelector('.heatmap');
  if (heat) {
    var seed = 7, html = '';
    var rand = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < 7 * 36; i++) {
      var day = i % 7, r = rand();
      var weekend = day === 0 || day === 6;
      var lvl = r < (weekend ? 0.55 : 0.18) ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : r < 0.92 ? 3 : 4;
      html += '<i class="l' + lvl + '"></i>';
    }
    heat.innerHTML = html;
  }

  // Scroll reveal + active nav link
  var sections = document.querySelectorAll('main section');
  sections.forEach(function (s) { if (!s.classList.contains('hero')) s.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    var links = document.querySelectorAll('.nav-menu a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id); if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s.id) spy.observe(s); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
  window.addEventListener('beforeprint', function () { document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); }); });

  // Demo form
  document.querySelectorAll('[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = form.querySelector('.form-status');
      if (st) st.textContent = 'Thanks! This is a demo form — wire it to Formspree or Netlify Forms to receive messages.';
      form.reset();
    });
  });
})();
