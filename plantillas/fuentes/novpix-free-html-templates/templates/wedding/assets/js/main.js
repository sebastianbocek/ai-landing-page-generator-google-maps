/* Evermore wedding template — progressive enhancements (site works without JS). */
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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  // Sticky header after the hero
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  if (header && hero) {
    var onScroll = function () { header.classList.toggle('stuck', window.scrollY > hero.offsetHeight - 80); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Countdown — change data-date on #countdown to your ceremony time
  var cd = document.getElementById('countdown');
  if (cd) {
    var target = new Date(cd.dataset.date).getTime();
    var units = {};
    cd.querySelectorAll('[data-unit]').forEach(function (el) { units[el.dataset.unit] = el; });
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      var diff = Math.max(0, target - Date.now());
      var s = Math.floor(diff / 1000);
      units.days.textContent = Math.floor(s / 86400);
      units.hours.textContent = pad(Math.floor(s % 86400 / 3600));
      units.minutes.textContent = pad(Math.floor(s % 3600 / 60));
      units.seconds.textContent = pad(s % 60);
      if (diff === 0) { clearInterval(timer); cd.setAttribute('aria-label', 'Today is the day!'); }
    };
    var timer = setInterval(tick, 1000); tick();
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  // RSVP: show/hide attending fields and one meal choice per guest
  var form = document.getElementById('rsvp-form');
  if (form) {
    var extra = document.getElementById('attending-fields');
    var guests = document.getElementById('f-guests');
    var meals = document.getElementById('guest-meals');
    var template = meals.querySelector('.field');
    var syncAttending = function () {
      var yes = form.elements.attending.value === 'yes';
      extra.classList.toggle('is-hidden', !yes);
    };
    var syncMeals = function () {
      var n = parseInt(guests.value, 10) || 1;
      while (meals.children.length > n) meals.lastElementChild.remove();
      while (meals.children.length < n) {
        var i = meals.children.length + 1;
        var f = template.cloneNode(true);
        f.querySelector('label').setAttribute('for', 'meal-' + i);
        f.querySelector('label').textContent = 'Guest ' + i + ' meal choice';
        var sel = f.querySelector('select'); sel.id = 'meal-' + i; sel.name = 'meal-' + i; sel.selectedIndex = 0;
        meals.appendChild(f);
      }
    };
    form.addEventListener('change', function (e) {
      if (e.target.name === 'attending') syncAttending();
      if (e.target === guests) syncMeals();
    });
    syncAttending(); syncMeals();

    // Demo submit — wire to Formspree / Netlify Forms (see HTML comment)
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var name = (form.elements.name.value || '').split(' ')[0] || 'friend';
      msg.textContent = form.elements.attending.value === 'yes'
        ? 'Thank you, ' + name + '! We can’t wait to celebrate with you. (Demo form — connect it to receive RSVPs.)'
        : 'Thank you for letting us know, ' + name + '. You’ll be missed! (Demo form — connect it to receive RSVPs.)';
      msg.hidden = false;
      form.reset(); syncAttending(); syncMeals();
    });
  }
})();
