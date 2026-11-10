/* ============================================
   FARMFRESH — Organic Produce Marketplace
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     Reduced Motion Check
  ---------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function shouldAnimate() {
    return !prefersReducedMotion.matches;
  }

  /* ----------------------------------------
     Burger Toggle
  ---------------------------------------- */
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = burger.classList.toggle('open');
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !nav.contains(e.target)) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------
     Active Nav via location.pathname
  ---------------------------------------- */
  (function setActiveNav() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.header__nav a');

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkFile = href.split('/').pop();

      if (linkFile === filename || (filename === '' && linkFile === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ----------------------------------------
     Footer Year [data-year]
  ---------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ----------------------------------------
     IntersectionObserver Reveals
  ---------------------------------------- */
  if (shouldAnimate()) {
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');

    if (revealElements.length && 'IntersectionObserver' in window) {
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
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px',
        }
      );

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  } else {
    // Reduced motion: reveal everything immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ----------------------------------------
     Header Scroll Shadow
  ---------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scroll = window.pageYOffset;
      if (scroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scroll;
    }, { passive: true });
  }

  /* ----------------------------------------
     Form Handling [data-form]
  ---------------------------------------- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var okEl = form.querySelector('.form-ok');
      var errEl = form.querySelector('.form-err');
      var submitBtn = form.querySelector('[type="submit"]');

      // Hide previous messages
      if (okEl) okEl.classList.remove('show');
      if (errEl) errEl.classList.remove('show');

      // Basic validation
      var isValid = true;
      var requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#dc2626';
        } else {
          field.style.borderColor = '';
        }
      });

      // Email validation
      var emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = '#dc2626';
        }
      }

      if (!isValid) {
        if (errEl) errEl.classList.add('show');
        return;
      }

      // Disable button while "submitting"
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Simulate form submission
      setTimeout(function () {
        if (okEl) okEl.classList.add('show');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }

        // Auto-hide success message
        setTimeout(function () {
          if (okEl) okEl.classList.remove('show');
        }, 5000);
      }, 1200);
    });

    // Clear error on input
    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
        var errEl = form.querySelector('.form-err');
        if (errEl) errEl.classList.remove('show');
      });
    });
  });

  /* ----------------------------------------
     Cart Demo [data-add]
  ---------------------------------------- */
  var cartCount = 0;
  var cartCounterEl = document.querySelector('[data-cart-count]');

  function updateCartDisplay() {
    if (cartCounterEl) {
      cartCounterEl.textContent = cartCount;
      if (cartCount > 0) {
        cartCounterEl.classList.add('visible');
      } else {
        cartCounterEl.classList.remove('visible');
      }
    }
  }

  document.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      cartCount++;
      updateCartDisplay();

      // Button animation feedback
      btn.style.transform = 'scale(0.85)';
      setTimeout(function () {
        btn.style.transform = '';
      }, 150);

      // Pulse the cart icon
      var cartIcon = document.querySelector('.header__cart');
      if (cartIcon) {
        cartIcon.style.transform = 'scale(1.15)';
        setTimeout(function () {
          cartIcon.style.transform = '';
        }, 200);
      }

      // Get product name for feedback
      var card = btn.closest('.product-card');
      var name = card ? card.querySelector('.product-card__title') : null;
      var productName = name ? name.textContent : 'Item';

      // Show brief "Added!" tooltip near the button
      var tooltip = document.createElement('span');
      tooltip.textContent = 'Added!';
      tooltip.style.cssText =
        'position:absolute;top:-8px;left:50%;transform:translateX(-50%);' +
        'background:#15803d;color:#fff;padding:4px 10px;border-radius:6px;' +
        'font-size:11px;font-weight:600;white-space:nowrap;pointer-events:none;' +
        'opacity:0;transition:opacity 0.2s ease;z-index:10;';

      btn.style.position = 'relative';
      btn.appendChild(tooltip);

      requestAnimationFrame(function () {
        tooltip.style.opacity = '1';
        setTimeout(function () {
          tooltip.style.opacity = '0';
          setTimeout(function () {
            if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
          }, 200);
        }, 800);
      });
    });
  });

  /* ----------------------------------------
     Shop Filter Tabs
  ---------------------------------------- */
  var filterTabs = document.querySelectorAll('.filter-tab');
  var productCards = document.querySelectorAll('.product-card[data-category]');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update active tab
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var category = tab.getAttribute('data-filter') || 'all';

      productCards.forEach(function (card) {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ----------------------------------------
     Sidebar Filter Items
  ---------------------------------------- */
  document.querySelectorAll('.filter-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var group = item.closest('.filter-list');
      if (group) {
        group.querySelectorAll('.filter-item').forEach(function (i) {
          i.classList.remove('active');
        });
      }
      item.classList.add('active');
    });
  });

  /* ----------------------------------------
     Smooth Scroll for Anchor Links
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: shouldAnimate() ? 'smooth' : 'auto', block: 'start' });
      }
    });
  });

  /* ----------------------------------------
     Page Enter Animation
  ---------------------------------------- */
  document.body.classList.add('page-enter');
})();
