/* ============================================================
   ELECTRA — Main JavaScript
   Pure vanilla JS, no frameworks
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     1. Header scroll effect
     -------------------------------------------------------- */
  const header = document.querySelector('.header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.remove('header--transparent');
      header.classList.add('header--solid');
    } else {
      header.classList.add('header--transparent');
      header.classList.remove('header--solid');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------
     2. Burger menu toggle
     -------------------------------------------------------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------
     3. Active nav link
     -------------------------------------------------------- */
  function setActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
  setActiveNav();

  /* --------------------------------------------------------
     4. IntersectionObserver scroll reveal (threshold 0.12)
     -------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* --------------------------------------------------------
     5. Data-year (auto-set copyright year)
     -------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --------------------------------------------------------
     6. Contact form validation (data-form)
     -------------------------------------------------------- */
  var contactForm = document.querySelector('[data-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      var message = contactForm.querySelector('[name="message"]');
      var okMsg = contactForm.querySelector('.form-ok');
      var errMsg = contactForm.querySelector('.form-err');

      // Reset
      if (okMsg) okMsg.style.display = 'none';
      if (errMsg) errMsg.style.display = 'none';

      // Validate
      var errors = [];
      if (name && !name.value.trim()) errors.push('Name');
      if (email && !email.value.trim()) errors.push('Email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.push('Valid email');
      if (message && !message.value.trim()) errors.push('Message');

      if (errors.length > 0) {
        if (errMsg) {
          errMsg.textContent = 'Please fill in: ' + errors.join(', ');
          errMsg.classList.add('form-err');
          errMsg.style.display = 'block';
        }
        return;
      }

      // Simulate success
      if (okMsg) {
        okMsg.textContent = 'Thank you! Your message has been sent successfully.';
        okMsg.classList.add('form-ok');
        okMsg.style.display = 'block';
      }
      contactForm.reset();
    });
  }

  /* --------------------------------------------------------
     7. Back to top button
     -------------------------------------------------------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
