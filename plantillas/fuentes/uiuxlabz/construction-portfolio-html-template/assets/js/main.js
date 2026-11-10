/* ============================================
   CONSTRA — Main JavaScript
   Framework-free, vanilla JS
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNav();
    initHeroCarousel();
    initScrollReveal();
    initTimelineParallax();
    initCounters();
    initMobileMenu();
  }

  /* ---------- Navigation Scroll ---------- */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var scrollThreshold = 80;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hero Carousel ---------- */
  function initHeroCarousel() {
    var slides = document.querySelectorAll('.hero__slide');
    var dots = document.querySelectorAll('.hero__dot');
    if (slides.length === 0) return;

    var current = 0;
    var total = slides.length;
    var interval = null;
    var delay = 5000;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + total) % total;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }

    function startAuto() {
      stopAuto();
      interval = setInterval(next, delay);
    }

    function stopAuto() {
      if (interval) clearInterval(interval);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startAuto();
      });
    });

    startAuto();
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    function checkReveal() {
      var windowHeight = window.innerHeight;
      reveals.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var trigger = windowHeight * 0.88;
        if (rect.top < trigger) {
          el.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal();
  }

  /* ---------- Timeline Parallax Background ---------- */
  function initTimelineParallax() {
    var bg = document.querySelector('.timeline__parallax-bg');
    if (!bg) return;

    function onScroll() {
      var rect = bg.parentElement.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        var offset = (rect.top / windowHeight) * 40;
        bg.style.transform = 'translateY(' + offset + 'px)';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Counter Animation ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    var animated = false;

    function animateCounters() {
      if (animated) return;
      var firstCounter = counters[0];
      if (!firstCounter) return;
      var rect = firstCounter.getBoundingClientRect();
      if (rect.top > window.innerHeight) return;

      animated = true;
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.floor(eased * target);
          el.textContent = value.toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(step);
      });
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    var hamburger = document.querySelector('.nav__hamburger');
    var navLinks = document.querySelector('.nav__links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

})();
