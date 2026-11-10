/**
 * CENTAL - Car Rental Template
 * Vanilla JS — Framework-free
 * Animations, scroll effects, navigation, booking widget
 */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initBookingWidget();
    initTestimonialSlider();
    initSmoothScroll();
    initCounterAnimation();
  }

  /* ========== Navbar Scroll Effect ========== */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ========== Mobile Menu ========== */
  function initMobileMenu() {
    const toggle = document.querySelector('.navbar__toggle');
    const nav = document.querySelector('.navbar__nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }

  /* ========== Scroll Animations (Intersection Observer) ========== */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ========== Back to Top ========== */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const toggle = () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggle, { passive: true });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========== Booking Widget ========== */
  function initBookingWidget() {
    const form = document.querySelector('.booking-widget');
    if (!form) return;

    // Set min dates to today
    const today = new Date().toISOString().split('T')[0];
    const pickDate = form.querySelector('#pick-date');
    const returnDate = form.querySelector('#return-date');

    if (pickDate) pickDate.setAttribute('min', today);
    if (returnDate) returnDate.setAttribute('min', today);

    // Update return date min when pickup changes
    if (pickDate && returnDate) {
      pickDate.addEventListener('change', () => {
        returnDate.setAttribute('min', pickDate.value);
        if (returnDate.value && returnDate.value < pickDate.value) {
          returnDate.value = pickDate.value;
        }
      });
    }

    // Form submit
    const submitBtn = form.querySelector('.btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const pickup = form.querySelector('#pick-location')?.value;
        const dropoff = form.querySelector('#return-location')?.value;
        const date = form.querySelector('#pick-date')?.value;

        if (!pickup) {
          shakeElement(form.querySelector('#pick-location')?.closest('.booking-field'));
          return;
        }

        // Animate button
        submitBtn.textContent = 'Searching...';
        submitBtn.style.pointerEvents = 'none';

        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Found!';
          setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-search"></i> Search Cars';
            submitBtn.style.pointerEvents = '';
          }, 1500);
        }, 1200);
      });
    }
  }

  function shakeElement(el) {
    if (!el) return;
    el.style.animation = 'shake 0.5s ease';
    el.addEventListener('animationend', () => {
      el.style.animation = '';
    }, { once: true });
  }

  /* ========== Testimonial Auto-Slider ========== */
  function initTestimonialSlider() {
    const container = document.querySelector('.testimonials-grid');
    if (!container) return;

    const cards = container.querySelectorAll('.testimonial-card');
    if (cards.length <= 1) return;

    let current = 0;

    // Auto-rotate on mobile (stacked view)
    if (window.innerWidth <= 768) {
      setInterval(() => {
        cards.forEach((card, i) => {
          card.style.display = i === current ? 'block' : 'none';
        });
        current = (current + 1) % cards.length;
      }, 4000);
    }
  }

  /* ========== Smooth Scroll for Anchor Links ========== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ========== Counter Animation ========== */
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
        // Add suffix if present
        const suffix = el.getAttribute('data-suffix');
        if (suffix) el.textContent += suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /* ========== Shake Keyframe (injected) ========== */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

})();
