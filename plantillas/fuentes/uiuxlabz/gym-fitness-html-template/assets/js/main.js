/* ============================================
   FITCORE - Main JavaScript
   Pure Vanilla JS - No Frameworks
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initHeader();
    initBurger();
    initActiveNav();
    initScrollReveal();
    initBackToTop();
    initDataYear();
    initTabs();
    initForm();
  }

  /* ---------- Sticky Header ---------- */
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    var threshold = 60;
    function onScroll() {
      if (window.scrollY > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Burger Menu ---------- */
  function initBurger() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on nav link click
    var links = nav.querySelectorAll('.nav__link, .nav__cta .btn');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Active Nav ---------- */
  function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav__link');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  function initScrollReveal() {
    var targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything
      targets.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Counter Animation ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // ease out quad
      var eased = 1 - (1 - progress) * (1 - progress);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // Auto-init counters
  document.addEventListener('DOMContentLoaded', initCounters);

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Data Year ---------- */
  function initDataYear() {
    var els = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();
    els.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    var navs = document.querySelectorAll('.tabs-nav');
    navs.forEach(function (nav) {
      var buttons = nav.querySelectorAll('button');
      var container = nav.closest('.tabs-container') || nav.parentElement;
      var panels = container.querySelectorAll('.tab-panel');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          // Update buttons
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          // Update panels
          panels.forEach(function (p) {
            p.classList.remove('active');
            if (p.getAttribute('data-panel') === target) {
              p.classList.add('active');
            }
          });
        });
      });
    });
  }

  /* ---------- Form Validation ---------- */
  function initForm() {
    var forms = document.querySelectorAll('[data-form]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = validateForm(form);
        var okMsg = form.querySelector('.form-ok');
        var errMsg = form.querySelector('.form-err');

        if (okMsg) okMsg.classList.remove('form-ok');
        if (errMsg) errMsg.classList.remove('form-err');

        if (ok) {
          if (okMsg) {
            okMsg.classList.add('form-ok');
            okMsg.style.display = 'block';
          }
          form.reset();
        } else {
          if (errMsg) {
            errMsg.classList.add('form-err');
            errMsg.style.display = 'block';
          }
        }

        // Auto-hide messages
        setTimeout(function () {
          if (okMsg) { okMsg.classList.remove('form-ok'); okMsg.style.display = 'none'; }
          if (errMsg) { errMsg.classList.remove('form-err'); errMsg.style.display = 'none'; }
        }, 5000);
      });
    });
  }

  function validateForm(form) {
    var required = form.querySelectorAll('[required]');
    var valid = true;
    required.forEach(function (field) {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#DC2626';
      } else {
        field.style.borderColor = '';
      }
      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(field.value.trim())) {
          valid = false;
          field.style.borderColor = '#DC2626';
        }
      }
    });
    return valid;
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      var headerH = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });

})();
