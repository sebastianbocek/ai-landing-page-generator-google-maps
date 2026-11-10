/* ============================================
   POSEIFY - Main JavaScript
   No frameworks, vanilla JS only
   ============================================ */

(function () {
  'use strict';

  // ========== Navbar Scroll Effect ==========
  const navbar = document.querySelector('.navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ========== Mobile Menu Toggle ==========
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function toggleMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (mobileOverlay) mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMenu);
  }

  // Close mobile menu on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // ========== Scroll Animations (Intersection Observer) ==========
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');
    if (!animatedElements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      animatedElements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ========== Animated Counter ==========
  function animateCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
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
    }, { threshold: 0.5 });

    counters.forEach(function (counter) { observer.observe(counter); });
  }

  // ========== Portfolio Filter ==========
  function initPortfolioFilter() {
    var tabs = document.querySelectorAll('.filter-tab');
    var items = document.querySelectorAll('.work-card');
    if (!tabs.length || !items.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Update active tab
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var filter = tab.getAttribute('data-filter');

        items.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.display = '';

            setTimeout(function () {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // ========== Smooth Scroll for Anchor Links ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var navbarHeight = navbar ? navbar.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ========== Contact Form Handler ==========
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // Simple validation
      var requiredFields = form.querySelectorAll('[required]');
      var isValid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) return;

      // Show success state
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Message Sent!';
      submitBtn.disabled = true;
      submitBtn.style.background = '#059669';

      setTimeout(function () {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    });
  }

  // ========== Back to Top Button ==========
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== Active Nav Link Highlight ==========
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    if (!sections.length || !navItems.length) return;

    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 100;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(function (item) {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + id) {
              item.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  // ========== Page Transition on Load ==========
  function initPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    window.addEventListener('load', function () {
      document.body.style.opacity = '1';
    });
  }

  // ========== Initialize Everything ==========
  function init() {
    initPageLoad();
    initScrollAnimations();
    animateCounters();
    initPortfolioFilter();
    initSmoothScroll();
    initContactForm();
    initBackToTop();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();