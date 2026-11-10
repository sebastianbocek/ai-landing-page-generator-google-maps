/* ═══════════════════════════════════════════════════════════
   TRATTORIA BELLA — Main JavaScript
   Burger toggle, active nav, year, reveals, form handling
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Burger Toggle ── */
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.sitehead nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.textContent = isOpen ? '✕' : '☰';
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.textContent = '☰';
      });
    });
  }

  /* ── Active Nav via location.pathname ── */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sitehead nav a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      a.classList.add('active');
    }
  });

  /* ── [data-year] Auto-fill ── */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── IntersectionObserver Reveal ── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // If reduced motion, show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── [data-form] Handling ── */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var okMsg = form.querySelector('.form-ok');
      var errMsg = form.querySelector('.form-err');

      // Reset messages
      if (okMsg) okMsg.style.display = 'none';
      if (errMsg) errMsg.style.display = 'none';

      // Basic validation: check all required fields
      var isValid = true;
      var requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        // Clear previous errors
        var errorEl = field.parentElement.querySelector('.error');
        if (errorEl) errorEl.textContent = '';

        if (!field.value.trim()) {
          isValid = false;
          if (errorEl) errorEl.textContent = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            isValid = false;
            if (errorEl) errorEl.textContent = 'Please enter a valid email';
          }
        }
      });

      if (!isValid) {
        if (errMsg) errMsg.style.display = 'block';
        return;
      }

      // Simulate form submission
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(function () {
        if (okMsg) okMsg.style.display = 'block';
        if (errMsg) errMsg.style.display = 'none';
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Submit';
        }
      }, 1200);
    });

    // Store original button text
    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.setAttribute('data-original-text', submitBtn.textContent);
    }
  });

  /* ── Menu Category Tabs (menu.html) ── */
  var categoryTabs = document.querySelectorAll('.category-tab');
  if (categoryTabs.length) {
    categoryTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Remove active from all tabs
        categoryTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var category = tab.getAttribute('data-category');
        var cards = document.querySelectorAll('.menu-card');

        cards.forEach(function (card) {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();
