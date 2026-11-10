/* OLIVO — Restaurant · Bespoke Interactions */
(function () {
  'use strict';

  /* ── Footer year ── */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── Burger toggle ── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainnav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  /* ── Active nav ── */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainnav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  /* ── Scroll reveals ── */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Count-up animation ── */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var current = 0;
    var duration = 1500;
    var step = Math.ceil(target / (duration / 16));
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString();
    }, 16);
  }

  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { countObs.observe(el); });
  }

  /* ── Reservation form validation ── */
  var form = document.getElementById('reservationform');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var fields = [
        { id: 'name', msg: 'Name is required' },
        { id: 'email', msg: 'Valid email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        { id: 'phone', msg: 'Phone number is required' },
        { id: 'guests', msg: 'Select number of guests' },
        { id: 'date', msg: 'Select a date' },
        { id: 'time', msg: 'Select a seating time' }
      ];
      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        var err = document.getElementById('err-' + f.id);
        var val = input.value.trim();
        if (!val || (f.pattern && !f.pattern.test(val))) {
          if (err) err.textContent = f.msg;
          input.style.borderColor = 'var(--wine)';
          valid = false;
        } else {
          if (err) err.textContent = '';
          input.style.borderColor = 'var(--border)';
        }
      });
      if (valid) {
        document.getElementById('form-success').style.display = 'block';
        form.reset();
      }
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
