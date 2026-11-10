/* ============================================
   FINANZA — main.js
   Burger toggle · Active nav · data-year
   IntersectionObserver · data-form · prefers-reduced-motion
   ============================================ */

(function () {
  'use strict';

  /* ---------- Burger / Mobile Nav ---------- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleNav() {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', toggleNav);
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', toggleNav);
  }

  /* Close nav on link click (mobile) */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) toggleNav();
      });
    });
  }

  /* ---------- Active Nav Link ---------- */
  (function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  })();

  /* ---------- data-year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- IntersectionObserver — .reveal ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    /* Show everything immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Stat Counter Animation ---------- */
  (function initCounters() {
    if (prefersReduced) {
      /* Show final values immediately */
      document.querySelectorAll('[data-count]').forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
      counterObserver.observe(el);
    });

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        /* Ease-out cubic */
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(step);
    }
  })();

  /* ---------- data-form — Contact Form ---------- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var okMsg = form.querySelector('.form-ok');
      var errMsg = form.querySelector('.form-err');

      /* Hide previous messages */
      if (okMsg) okMsg.classList.remove('show');
      if (errMsg) errMsg.classList.remove('show');

      /* Basic client-side validation */
      var required = form.querySelectorAll('[required]');
      var valid = true;

      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#E93C05';
        } else {
          field.style.borderColor = '';
        }
      });

      /* Email validation */
      var email = form.querySelector('input[type="email"]');
      if (email && email.value.trim()) {
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email.value.trim())) {
          valid = false;
          email.style.borderColor = '#E93C05';
        }
      }

      if (!valid) {
        if (errMsg) errMsg.classList.add('show');
        return;
      }

      /* Simulate success */
      form.reset();
      if (okMsg) okMsg.classList.add('show');
    });
  });

  /* ---------- About Tabs ---------- */
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      if (!target) return;

      /* Deactivate all */
      btn.closest('.about-tabs').querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.closest('.about-tabs').querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.remove('active');
      });

      /* Activate clicked */
      btn.classList.add('active');
      var panel = btn.closest('.about-tabs').querySelector('#' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Navbar Scroll Shadow ---------- */
  (function initScrollShadow() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  })();

  /* ---------- Back to Top ---------- */
  (function initBackToTop() {
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
  })();

})();
