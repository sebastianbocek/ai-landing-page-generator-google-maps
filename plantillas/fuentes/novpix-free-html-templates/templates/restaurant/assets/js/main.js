/* Ember & Olive — small progressive enhancements. The site works without JS. */
(function () {
  'use strict';

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
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Highlight today in opening hours
  var today = new Date().getDay();
  var row = document.querySelector('#hours li[data-day="' + today + '"]');
  if (row) { row.classList.add('today'); row.firstElementChild.textContent += ' · today'; }

  // Reservation date: no past dates
  var date = document.getElementById('r-date');
  if (date) {
    var d = new Date();
    var iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    date.min = iso;
    if (!date.value) date.value = iso;
  }

  // Demo form handling — replace with your form service (see comments in HTML)
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg') || (form.nextElementSibling && form.nextElementSibling.classList.contains('form-msg') ? form.nextElementSibling : null);
      var text = 'Thanks! This is a demo form — connect it to Formspree or Netlify Forms to receive submissions.';
      if (form.id === 'reserve-form') {
        var name = (form.elements.name.value || 'friend').split(' ')[0];
        text = 'Thanks, ' + name + '! Your request for ' + form.elements.party.value + ' on ' + form.elements.date.value + ' at ' + form.elements.time.value + ' is noted. (Demo form — wire it up to receive bookings.)';
      }
      if (msg) { msg.textContent = text; msg.hidden = false; }
      form.reset();
      if (date && form.contains(date)) date.value = date.min;
    });
  });

  // Menu page: dietary filters + active tab
  var filterBtns = document.querySelectorAll('.filters button');
  if (filterBtns.length) {
    var items = document.querySelectorAll('.menu-item');
    var empty = document.querySelector('.no-results');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.dataset.filter;
        filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        var shown = 0;
        items.forEach(function (it) {
          var t = (it.dataset.tags || '').split(' ');
          var ok = f === 'all' || t.indexOf(f) > -1 || (f === 'v' && t.indexOf('vg') > -1);
          it.hidden = !ok; if (ok) shown++;
        });
        document.querySelectorAll('.menu-cat').forEach(function (cat) {
          cat.hidden = !cat.querySelector('.menu-item:not([hidden])');
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
    var tabs = document.querySelectorAll('.menu-tabs a');
    if ('IntersectionObserver' in window) {
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) tabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      document.querySelectorAll('.menu-cat').forEach(function (c) { tio.observe(c); });
    }
  }

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
