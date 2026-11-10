/**
 * PIGRA Creative Agency — Main Script
 * Framework-free, vanilla JS
 */

(function () {
  'use strict';

  /* ============================================
     NAVIGATION
     ============================================ */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll state for nav
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================
     INTERSECTION OBSERVER — REVEAL ANIMATIONS
     ============================================ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger'
    );

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: show everything immediately
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  } else {
    // Reduced motion: show everything immediately
    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger')
      .forEach(function (el) {
        el.classList.add('is-visible');
      });
  }

  /* ============================================
     DATA-YEAR — Dynamic Copyright Year
     ============================================ */
  var yearElements = document.querySelectorAll('[data-year]');
  var currentYear = new Date().getFullYear();
  yearElements.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ============================================
     PORTFOLIO FILTER TABS
     ============================================ */
  var filterTabs = document.querySelectorAll('.filter-tab');
  var filterItems = document.querySelectorAll('[data-category]');

  if (filterTabs.length > 0 && filterItems.length > 0) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        // Update active tab
        filterTabs.forEach(function (t) {
          t.classList.remove('active');
        });
        this.classList.add('active');

        // Filter items
        filterItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            requestAnimationFrame(function () {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ============================================
     CONTACT FORM — [data-form] validation
     ============================================ */
  var formContainers = document.querySelectorAll('[data-form]');

  formContainers.forEach(function (formContainer) {
    var form = formContainer.querySelector('form');
    if (!form) return;

    var okMsg = formContainer.querySelector('.form-ok');
    var errMsg = formContainer.querySelector('.form-err');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous states
      formContainer.classList.remove('form-ok', 'form-err');

      // Gather required fields
      var required = form.querySelectorAll('[required]');
      var valid = true;

      required.forEach(function (field) {
        var value = field.value.trim();
        if (!value) {
          valid = false;
          field.style.borderColor = '#ef4444';
        } else {
          field.style.borderColor = '';
        }

        // Email validation
        if (field.type === 'email' && value) {
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(value)) {
            valid = false;
            field.style.borderColor = '#ef4444';
          }
        }
      });

      if (!valid) {
        formContainer.classList.add('form-err');
        return;
      }

      // Simulate send (no real backend)
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(function () {
        formContainer.classList.add('form-ok');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }, 800);
    });

    // Clear error styling on input
    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
        formContainer.classList.remove('form-err');
      });
    });
  });

  /* ============================================
     SMOOTH SCROLL for Anchor Links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================================
     ACTIVE NAV LINK highlighting
     ============================================ */
  function highlightActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
})();
