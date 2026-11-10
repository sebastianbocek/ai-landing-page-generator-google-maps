/* ============================================
   DRYME — Main JavaScript
   Pure vanilla, no frameworks
   ============================================ */

(function () {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Burger menu ---------- */
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('.nav__list');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('burger--open');
      navList.classList.toggle('nav__list--open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navList.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('burger--open');
        navList.classList.remove('nav__list--open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('nav__link--active');
    }
  });

  /* ---------- data-year ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---------- Carousel (index.html hero) ---------- */
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.hero-carousel__slide');
    const dots = carousel.querySelectorAll('.hero-carousel__dot');
    let current = 0;
    let timer;

    function goTo(index) {
      slides[current].classList.remove('hero-carousel__slide--active');
      if (dots[current]) dots[current].classList.remove('hero-carousel__dot--active');
      current = index;
      slides[current].classList.add('hero-carousel__slide--active');
      if (dots[current]) dots[current].classList.add('hero-carousel__dot--active');
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function startAuto() {
      timer = setInterval(next, 5000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        goTo(i);
        startAuto();
      });
    });

    if (slides.length > 0) {
      goTo(0);
      startAuto();
    }
  }

  /* ---------- Contact / Pickup form ---------- */
  const form = document.querySelector('[data-form]');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const okEl = form.querySelector('.form-ok');
      const errEl = form.querySelector('.form-err');

      // Reset messages
      if (okEl) okEl.setAttribute('data-visible', 'false');
      if (errEl) errEl.setAttribute('data-visible', 'false');

      // Basic validation
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = '';
        }
      });

      // Email check
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value)) {
          valid = false;
          emailField.style.borderColor = '#EF4444';
        }
      }

      if (valid) {
        if (okEl) okEl.setAttribute('data-visible', 'true');
        form.reset();
        setTimeout(() => {
          if (okEl) okEl.setAttribute('data-visible', 'false');
        }, 5000);
      } else {
        if (errEl) errEl.setAttribute('data-visible', 'true');
        setTimeout(() => {
          if (errEl) errEl.setAttribute('data-visible', 'false');
        }, 4000);
      }
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
