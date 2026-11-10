/**
 * PLASERY - Design Studio
 * main.js - IntersectionObserver, mobile nav, form validation, counters
 */

(function () {
  'use strict';

  /* ============================================
     MOBILE NAVIGATION
     ============================================ */
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.header__toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      toggle.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     HEADER SCROLL EFFECT
     ============================================ */
  var lastScroll = 0;
  function onScroll() {
    var scrollY = window.scrollY;
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================
     INTERSECTION OBSERVER - REVEAL ANIMATIONS
     ============================================ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
    );

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Immediately show all elements if reduced motion
    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
    ).forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ============================================
     DATA-YEAR COUNTER ANIMATION
     ============================================ */
  var yearElements = document.querySelectorAll('[data-year]');

  if (yearElements.length > 0 && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    yearElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    yearElements.forEach(function (el) {
      el.textContent = el.getAttribute('data-year');
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-year'), 10);
    var duration = 1500;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  /* ============================================
     PORTFOLIO FILTERS
     ============================================ */
  var filterButtons = document.querySelectorAll('.portfolio-filters button');
  var portfolioItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Filter items
      portfolioItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          // Re-trigger animation
          if (!prefersReducedMotion) {
            item.classList.remove('visible');
            setTimeout(function () {
              item.classList.add('visible');
            }, 50);
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ============================================
     FORM VALIDATION (data-form)
     ============================================ */
  var forms = document.querySelectorAll('[data-form]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(function (field) {
        var group = field.closest('.form-group');
        if (!field.value.trim()) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            isValid = false;
            if (group) group.classList.add('has-error');
          }
        }
      });

      if (isValid) {
        form.classList.remove('error');
        form.classList.add('submitted');
        form.reset();
        // Reset after 5 seconds
        setTimeout(function () {
          form.classList.remove('submitted');
        }, 5000);
      } else {
        form.classList.remove('submitted');
        form.classList.add('error');
      }
    });

    // Clear error on input
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        var group = field.closest('.form-group');
        if (group) group.classList.remove('has-error');
        form.classList.remove('error');
      });
    });
  });

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = header ? header.offsetHeight + 20 : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
