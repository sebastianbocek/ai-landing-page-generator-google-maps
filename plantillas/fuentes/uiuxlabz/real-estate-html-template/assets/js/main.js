/**
 * MAKAAN — Real Estate Template
 * Vanilla JS interactions, animations, and form handling
 */
(function () {
  'use strict';

  /* ============================================================
     1. BURGER / MOBILE NAV
     ============================================================ */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================================
     2. HEADER SCROLL STATE
     ============================================================ */
  const header = document.querySelector('.header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var currentScroll = window.scrollY;
      header.classList.toggle('scrolled', currentScroll > 20);
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ============================================================
     3. ACTIVE NAV LINK
     ============================================================ */
  (function () {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ============================================================
     4. DATA-YEAR (footer copyright)
     ============================================================ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ============================================================
     5. REVEAL ON SCROLL (IntersectionObserver)
     ============================================================ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: show everything
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  } else {
    // Reduced motion: show all elements immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ============================================================
     6. COUNTER ANIMATION
     ============================================================ */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var duration = 1600;
    var startTime = null;
    var startVal = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      var eased = 1 - (1 - progress) * (1 - progress);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count');
    });
  }

  /* ============================================================
     7. FORM HANDLING [data-form]
     ============================================================ */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var okMsg = form.querySelector('.form-ok');
      var errMsg = form.querySelector('.form-err');

      // Hide previous messages
      if (okMsg) okMsg.style.display = 'none';
      if (errMsg) errMsg.style.display = 'none';

      // Basic validation
      var isValid = true;
      var requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ef4444';
        } else {
          field.style.borderColor = '';
        }
      });

      // Email validation
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = '#ef4444';
        }
      }

      // Phone validation (optional field with pattern)
      var phoneField = form.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value) {
        var phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;
        if (!phoneRegex.test(phoneField.value)) {
          isValid = false;
          phoneField.style.borderColor = '#ef4444';
        }
      }

      if (isValid) {
        // Simulate submission
        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        setTimeout(function () {
          if (okMsg) okMsg.style.display = 'block';
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Send Message';
          }
          // Scroll to success message
          if (okMsg) {
            okMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 800);
      } else {
        if (errMsg) errMsg.style.display = 'block';
        // Scroll to error message
        if (errMsg) {
          errMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });

    // Store original button text
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.setAttribute('data-original-text', btn.textContent);
    }

    // Clear error borders on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  });

  /* ============================================================
     8. FILTER TABS
     ============================================================ */
  document.querySelectorAll('.filter-tabs').forEach(function (tabGroup) {
    var tabs = tabGroup.querySelectorAll('.filter-tab');
    var targetContainer = tabGroup.getAttribute('data-filter-target');
    var cards = targetContainer ? document.querySelectorAll(targetContainer + ' [data-category]') : [];

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Update active state
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var filter = tab.getAttribute('data-filter');

        cards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
            // Re-trigger reveal if applicable
            if (!prefersReducedMotion) {
              card.style.opacity = '0';
              card.style.transform = 'translateY(16px)';
              setTimeout(function () {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 50);
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });

  /* ============================================================
     9. BACK TO TOP
     ============================================================ */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     10. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // Header height
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     11. PROPERTY CARD FAVORITE TOGGLE
     ============================================================ */
  document.querySelectorAll('.property-card__favorite').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isFaved = this.classList.toggle('faved');
      if (isFaved) {
        this.style.background = '#ef4444';
        this.style.color = '#fff';
        this.innerHTML = '&#9829;';
      } else {
        this.style.background = '';
        this.style.color = '';
        this.innerHTML = '&#9825;';
      }
    });
  });

  /* ============================================================
     12. SEARCH FORM SUBMISSION
     ============================================================ */
  var searchForm = document.querySelector('.search-panel form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Redirect to listings page with query params
      var formData = new FormData(searchForm);
      var params = new URLSearchParams();
      formData.forEach(function (value, key) {
        if (value) params.set(key, value);
      });
      window.location.href = 'listings.html' + (params.toString() ? '?' + params.toString() : '');
    });
  }

  /* ============================================================
     13. NEWSLETTER FORM
     ============================================================ */
  document.querySelectorAll('.footer__newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      if (input && input.value.trim()) {
        input.value = '';
        input.placeholder = 'Subscribed!';
        setTimeout(function () {
          input.placeholder = 'Your email address';
        }, 2000);
      }
    });
  });

})();
