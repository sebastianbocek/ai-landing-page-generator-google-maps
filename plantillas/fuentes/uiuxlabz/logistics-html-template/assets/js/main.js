/* ============================================================
   LOGISTICA — Main JavaScript
   Framework-free, vanilla JS
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     BURGER / MOBILE NAV
     -------------------------------------------------------- */
  function initBurger() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.nav');
    var overlay = document.querySelector('.nav-overlay');
    if (!burger || !nav) return;

    function toggleNav() {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleNav);
    if (overlay) {
      overlay.addEventListener('click', toggleNav);
    }

    // Close nav on link click (mobile)
    var navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('open')) {
          toggleNav();
        }
      });
    });
  }

  /* --------------------------------------------------------
     ACTIVE NAV LINK
     -------------------------------------------------------- */
  function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------
     HEADER SCROLL EFFECT
     -------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;

    var scrollThreshold = 50;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------
     BACK TO TOP
     -------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleVisibility();
  }

  /* --------------------------------------------------------
     [data-year] — Auto-fill current year
     -------------------------------------------------------- */
  function fillYear() {
    var els = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();
    els.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* --------------------------------------------------------
     INTERSECTION OBSERVER — Reveal animations
     -------------------------------------------------------- */
  function initReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');

    if (prefersReducedMotion) {
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    if (!revealElements.length) return;

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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------
     COUNTER ANIMATION
     -------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-count'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = el.getAttribute('data-prefix') || '';

            if (prefersReducedMotion) {
              el.textContent = prefix + target.toLocaleString() + suffix;
              observer.unobserve(el);
              return;
            }

            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              // Ease out cubic
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
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------
     TRACKING FORM [data-form]
     -------------------------------------------------------- */
  function initTrackingForm() {
    var form = document.querySelector('[data-form="tracking"]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var input = form.querySelector('input[name="tracking-number"]');
      var result = document.querySelector('.tracking-result');
      if (!input || !result) return;

      var value = input.value.trim();
      if (!value) {
        showFormStatus(form, 'Please enter a tracking number.', 'err');
        return;
      }

      // Simulate tracking lookup
      var trackingId = result.querySelector('.tracking-id');
      if (trackingId) trackingId.textContent = value;

      result.classList.add('visible');

      // Animate steps
      var steps = result.querySelectorAll('.tracking-step');
      var stepIndex = Math.floor(Math.random() * 3) + 1; // Random progress 1-3
      steps.forEach(function (step, i) {
        step.classList.remove('active', 'completed');
        if (i < stepIndex) {
          step.classList.add('completed');
        } else if (i === stepIndex) {
          step.classList.add('active');
        }
      });

      showFormStatus(form, 'Tracking information retrieved successfully.', 'ok');
    });
  }

  /* --------------------------------------------------------
     QUOTE / CONTACT FORM [data-form]
     -------------------------------------------------------- */
  function initContactForm() {
    var forms = document.querySelectorAll('[data-form="contact"], [data-form="quote"]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = form.querySelector('input[name="name"]');
        var email = form.querySelector('input[name="email"]');

        // Basic validation
        if (name && !name.value.trim()) {
          showFormStatus(form, 'Please enter your name.', 'err');
          return;
        }

        if (email && !isValidEmail(email.value.trim())) {
          showFormStatus(form, 'Please enter a valid email address.', 'err');
          return;
        }

        // Simulate submission
        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        setTimeout(function () {
          showFormStatus(form, 'Your message has been sent. We will get back to you shortly.', 'ok');
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Send Message';
          }
        }, 1200);
      });
    });
  }

  /* --------------------------------------------------------
     NEWSLETTER FORM
     -------------------------------------------------------- */
  function initNewsletter() {
    var forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && isValidEmail(input.value.trim())) {
          input.value = '';
          // Could show a toast or message here
        }
      });
    });
  }

  /* --------------------------------------------------------
     HELPERS
     -------------------------------------------------------- */
  function showFormStatus(form, message, type) {
    // Remove existing status messages in this form
    var existing = form.querySelectorAll('.form-ok, .form-err');
    existing.forEach(function (el) {
      el.classList.remove('visible');
      el.remove();
    });

    var statusEl = document.createElement('div');
    statusEl.className = type === 'ok' ? 'form-ok' : 'form-err';
    statusEl.innerHTML = '<i class="fas ' + (type === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle') + '"></i> ' + message;
    statusEl.classList.add('visible');

    form.appendChild(statusEl);

    // Auto-hide after 5 seconds
    setTimeout(function () {
      statusEl.classList.remove('visible');
    }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* --------------------------------------------------------
     SMOOTH SCROLL for anchor links
     -------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          var offset = 80; // Header height
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* --------------------------------------------------------
     IMAGE LAZY LOADING (native + fallback)
     -------------------------------------------------------- */
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) return; // Native support

    var images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(function (img) {
      observer.observe(img);
    });
  }

  /* --------------------------------------------------------
     INITIALIZE
     -------------------------------------------------------- */
  function init() {
    initBurger();
    setActiveNav();
    initHeaderScroll();
    initBackToTop();
    fillYear();
    initReveal();
    initCounters();
    initTrackingForm();
    initContactForm();
    initNewsletter();
    initSmoothScroll();
    initLazyLoad();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
