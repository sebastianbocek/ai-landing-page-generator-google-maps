/* =============================================================
   ZEPHYR — Cool Air, Calmly Delivered · Interactions
   Bespoke vanilla JS for the AC / climate-service site.
   No dependencies. Progressive enhancement — static content
   stays visible without JS. Static checks only.
   ============================================================= */
(function () {
  'use strict';

  var reducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Year auto-fill --- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Mobile burger toggle --- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainnav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* --- Active nav highlight --- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainnav a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ============================================================
     WOW moment — interactive temperature slider.
     Dragging the hero slider tints the scene from ice-cool
     (low temp) to sunset-warm (high temp) via --tint-ratio
     and updates the live °F readout.
     ============================================================ */
  var hero = document.getElementById('hero');
  var slider = document.getElementById('tempthermo');
  var readout = document.getElementById('tempreadout');

  function setTint(el, ratio) {
    if (el) el.style.setProperty('--tint-ratio', ratio.toFixed(3));
  }

  function tintFromValue(v, min, max) {
    return (v - min) / (max - min);
  }

  if (slider && hero) {
    var min = parseFloat(slider.min) || 60;
    var max = parseFloat(slider.max) || 90;

    function sync() {
      var v = parseFloat(slider.value);
      setTint(hero, tintFromValue(v, min, max));
      if (readout) {
        readout.textContent = Math.round(v) + '°F';
        readout.setAttribute('aria-valuenow', Math.round(v));
      }
    }

    // Keep the track gradient painted as the thumb moves.
    function paintTrack() {
      var pct =
        ((parseFloat(slider.value) - min) / (max - min)) * 100;
      slider.style.background =
        'linear-gradient(90deg, var(--ice) 0%, var(--sky) ' +
        pct +
        '%, rgba(255,255,255,.35) ' +
        pct +
        '%)';
    }

    slider.addEventListener('input', function () {
      sync();
      paintTrack();
    });
    slider.addEventListener('change', function () {
      paintTrack();
    });

    sync();
    paintTrack();
  }

  /* --- Scroll reveal (evaporate-in) --- */
  var reveals = document.querySelectorAll('.reveal');

  if (!reducedMotion && reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- Count-up animation (stats strip) --- */
  var counters = document.querySelectorAll('[data-count]');
  if (
    counters.length &&
    'IntersectionObserver' in window &&
    !reducedMotion
  ) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute('data-count'));
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var duration = 1400;
          var start = performance.now();

          function tick(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(target * eased);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent =
        (el.getAttribute('data-prefix') || '') +
        el.getAttribute('data-count') +
        (el.getAttribute('data-suffix') || '');
    });
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  /* --- Contact form validation (no alert()) --- */
  var form = document.getElementById('contactform');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.form-ok');
      var err = form.querySelector('.form-err');
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (f) {
        if (!f.value.trim()) valid = false;
      });
      if (valid) {
        if (err) err.hidden = true;
        if (ok) ok.hidden = false;
        form.reset();
      } else {
        if (ok) ok.hidden = true;
        if (err) err.hidden = false;
      }
    });
  }

})();
