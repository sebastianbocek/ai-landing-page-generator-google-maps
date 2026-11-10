/* ========================================================================
   INDUSTRO — Main JavaScript
   Burger toggle, active nav, data-year, IntersectionObserver, data-form,
   prefers-reduced-motion
   ======================================================================== */

(function () {
  'use strict';

  /* ─── Reduced Motion Detection ────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ─── DOM Ready ───────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initBurgerMenu();
    initActiveNav();
    initDataYear();
    initRevealAnimations();
    initHeaderScroll();
    initFilterBar();
    initContactForm();
    initSmoothScroll();
  }

  /* ─── Burger Menu Toggle ──────────────────────────────────────────── */
  function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      const isOpen = burger.classList.toggle('open');
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── Active Navigation Link ──────────────────────────────────────── */
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Data Year (auto-fill copyright year) ────────────────────────── */
  function initDataYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ─── Header Scroll Effect ────────────────────────────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    var lastScroll = 0;

    function onScroll() {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
    onScroll();
  }

  /* ─── IntersectionObserver Reveal Animations ──────────────────────── */
  function initRevealAnimations() {
    var revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
    );

    if (!revealElements.length) return;

    if (prefersReducedMotion) {
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── Filter Bar (Projects page) ──────────────────────────────────── */
  function initFilterBar() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card[data-category]');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter cards
        projectCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            if (!prefersReducedMotion) {
              card.style.opacity = '0';
              card.style.transform = 'translateY(15px)';
              requestAnimationFrame(function () {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ─── Contact Form Handling ────────────────────────────────────────── */
  function initContactForm() {
    var forms = document.querySelectorAll('[data-form]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (value, key) {
          data[key] = value;
        });

        // Basic validation
        var requiredFields = form.querySelectorAll('[required]');
        var isValid = true;

        requiredFields.forEach(function (field) {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#EF4444';
            field.addEventListener(
              'input',
              function () {
                field.style.borderColor = '';
              },
              { once: true }
            );
          }
        });

        if (!isValid) return;

        // Show success state
        var successEl = form.querySelector('.form-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.classList.add('show');
        }

        // Reset after delay (simulating submission)
        setTimeout(function () {
          form.reset();
          if (successEl) {
            successEl.classList.remove('show');
            form.style.display = '';
          }
        }, 4000);
      });
    });
  }

  /* ─── Smooth Scroll for Anchor Links ──────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var headerHeight = document.querySelector('.header')
          ? document.querySelector('.header').offsetHeight
          : 0;

        var targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    });
  }

  /* ─── Utility: Throttle ───────────────────────────────────────────── */
  function throttle(fn, wait) {
    var lastTime = 0;
    return function () {
      var now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, arguments);
      }
    };
  }
})();
