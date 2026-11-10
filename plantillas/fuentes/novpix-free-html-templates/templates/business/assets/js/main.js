/* Meridian business template — small vanilla JS enhancements (site works without JS). */
(function () {
  'use strict';
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var links = document.getElementById('nav-links');
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

  // Header border on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Reveal + count-up
  var countUp = function (el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    if (reduce) return;
    var start = null, dur = 1400;
    var step = function (t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        if (en.target.dataset.count) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal, [data-count]').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Contact: pre-select a service from ?service=
  var svc = new URLSearchParams(location.search).get('service');
  if (svc) {
    var box = document.querySelector('input[name="service"][value="' + svc.replace(/[^a-z]/g, '') + '"]');
    if (box) box.checked = true;
  }

  // Demo forms — replace with Formspree / Netlify Forms (see HTML comments)
  $$('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = f.querySelector('.form-msg') || (f.nextElementSibling && f.nextElementSibling.classList.contains('form-msg') ? f.nextElementSibling : null);
      var first = f.elements.first_name ? f.elements.first_name.value.trim() : '';
      if (msg) {
        msg.textContent = (first ? 'Thanks, ' + first + '! ' : 'Thanks! ') + 'This is a demo form — connect it to Formspree or Netlify Forms to receive messages.';
        msg.hidden = false;
      }
      f.reset();
    });
  });

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
