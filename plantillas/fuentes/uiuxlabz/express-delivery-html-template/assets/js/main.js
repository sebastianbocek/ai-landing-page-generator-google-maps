/**
 * FASTER — Express Delivery Template
 * main.js — burger, nav, data-year, IntersectionObserver, data-form, prefers-reduced-motion
 */

(function () {
  'use strict';

  /* ---------- Burger Toggle ---------- */
  const burger = document.querySelector('.burger');
  const mainnav = document.querySelector('#mainnav');
  const overlay = document.querySelector('.nav-overlay');

  function openNav() {
    mainnav.classList.add('open');
    if (overlay) overlay.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    mainnav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      const isOpen = mainnav.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  /* ---------- Active Nav Link ---------- */
  (function setActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#mainnav a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path) {
        a.classList.add('active');
      }
    });
  })();

  /* ---------- Data Year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- IntersectionObserver — reveal ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Reduced motion: show everything immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ---------- Back to Top ---------- */
  var btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Testimonial Carousel ---------- */
  (function initCarousel() {
    var track = document.querySelector('.testimonial-track');
    var dots = document.querySelectorAll('.carousel-dot');
    var prevBtn = document.querySelector('.carousel-btn.prev');
    var nextBtn = document.querySelector('.carousel-btn.next');
    if (!track || dots.length === 0) return;

    var current = 0;
    var total = dots.length;

    function goToSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goToSlide(i);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(current + 1); });

    /* Auto-advance every 5s */
    var autoTimer = setInterval(function () { goToSlide(current + 1); }, 5000);
    track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
  })();

  /* ---------- Data Form ---------- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Remove old messages */
      form.querySelectorAll('.form-ok, .form-err').forEach(function (m) { m.remove(); });

      /* Simple client-side validation */
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e74c3c';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        var err = document.createElement('div');
        err.className = 'form-err';
        err.textContent = 'Please fill in all required fields.';
        form.appendChild(err);
        return;
      }

      /* Simulate success */
      var ok = document.createElement('div');
      ok.className = 'form-ok';
      ok.textContent = 'Message sent successfully! We will get back to you shortly.';
      form.appendChild(ok);
      form.reset();

      /* Auto-dismiss after 6s */
      setTimeout(function () { if (ok.parentNode) ok.remove(); }, 6000);
    });
  });

})();
