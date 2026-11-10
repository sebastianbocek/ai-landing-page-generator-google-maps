/* ==========================================================================
   STUDIO77 — Main JavaScript
   Premium Hair Salon Template
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initHeader();
    initMobileNav();
    initScrollReveal();
    initSmoothScroll();
    initBookingForm();
    initContactForm();
    initProductFilter();
    initBackToTop();
  }

  /* ---------- Header Scroll Behavior ---------- */
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    function handleScroll() {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header.classList.remove('header--transparent');
        header.classList.add('header--solid');
      } else {
        header.classList.remove('header--solid');
        header.classList.add('header--transparent');
      }

      lastScroll = scrollY;
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ---------- Mobile Navigation ---------- */
  function initMobileNav() {
    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-nav__overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    const body = document.body;

    if (!burger || !mobileNav) return;

    function openNav() {
      burger.classList.add('burger--active');
      mobileNav.classList.add('mobile-nav--open');
      if (overlay) overlay.classList.add('mobile-nav__overlay--visible');
      body.style.overflow = 'hidden';
    }

    function closeNav() {
      burger.classList.remove('burger--active');
      mobileNav.classList.remove('mobile-nav--open');
      if (overlay) overlay.classList.remove('mobile-nav__overlay--visible');
      body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
      if (mobileNav.classList.contains('mobile-nav--open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Smooth Scroll ---------- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector('.header')
            ? document.querySelector('.header').offsetHeight
            : 0;
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ---------- Booking Form ---------- */
  function initBookingForm() {
    var form = document.querySelector('[data-form="booking"]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var date = form.querySelector('[name="date"]');
      var service = form.querySelector('[name="service"]');
      var time = form.querySelector('[name="time"]');

      // Basic validation
      var errors = [];
      if (name && !name.value.trim()) errors.push('Name is required');
      if (phone && !phone.value.trim()) errors.push('Phone is required');
      if (date && !date.value) errors.push('Date is required');
      if (service && !service.value) errors.push('Please select a service');
      if (time && !time.value) errors.push('Please select a time');

      if (errors.length > 0) {
        showToast(errors[0], 'error');
        return;
      }

      // Success
      showToast('Booking request submitted! We will confirm shortly.', 'success');
      form.reset();
    });
  }

  /* ---------- Contact Form ---------- */
  function initContactForm() {
    var form = document.querySelector('[data-form="contact"]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var message = form.querySelector('[name="message"]');

      var errors = [];
      if (name && !name.value.trim()) errors.push('Name is required');
      if (email && !email.value.trim()) errors.push('Email is required');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.push('Valid email is required');
      }
      if (message && !message.value.trim()) errors.push('Message is required');

      if (errors.length > 0) {
        showToast(errors[0], 'error');
        return;
      }

      showToast('Message sent! We will get back to you soon.', 'success');
      form.reset();
    });
  }

  /* ---------- Product Filter ---------- */
  function initProductFilter() {
    var filterBtns = document.querySelectorAll('[data-filter]');
    var products = document.querySelectorAll('[data-category]');

    if (!filterBtns.length || !products.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        products.forEach(function (product) {
          if (filter === 'all' || product.getAttribute('data-category') === filter) {
            product.style.display = '';
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(function () {
              product.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              product.style.opacity = '1';
              product.style.transform = 'translateY(0)';
            }, 50);
          } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(function () {
              product.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Toast Notification ---------- */
  function showToast(message, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast toast--' + (type || 'info');
    toast.innerHTML =
      '<span class="toast__message">' + message + '</span>' +
      '<button class="toast__close" aria-label="Close">&times;</button>';

    // Style the toast
    toast.style.cssText =
      'position:fixed;bottom:30px;right:30px;z-index:10000;' +
      'padding:16px 24px;border-radius:8px;font-family:var(--font-body);font-size:14px;' +
      'display:flex;align-items:center;gap:16px;max-width:400px;' +
      'box-shadow:0 10px 30px rgba(0,0,0,0.15);' +
      'animation:toastIn 0.3s ease-out;' +
      (type === 'error'
        ? 'background:#0A0A0A;color:#FEFCE8;border:1px solid #B76E79;'
        : 'background:#0A0A0A;color:#FEFCE8;border:1px solid #B76E79;');

    var closeBtn = toast.querySelector('.toast__close');
    closeBtn.style.cssText =
      'background:none;border:none;color:var(--gray-400);font-size:20px;cursor:pointer;padding:0 0 0 8px;';

    document.body.appendChild(toast);

    // Add animation keyframes if not yet added
    if (!document.querySelector('#toast-styles')) {
      var style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent =
        '@keyframes toastIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}' +
        '@keyframes toastOut{from{opacity:1;transform:translateY(0);}to{opacity:0;transform:translateY(20px);}}';
      document.head.appendChild(style);
    }

    closeBtn.addEventListener('click', function () {
      removeToast(toast);
    });

    setTimeout(function () {
      removeToast(toast);
    }, 5000);
  }

  function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.style.animation = 'toastOut 0.3s ease-in forwards';
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }

})();
