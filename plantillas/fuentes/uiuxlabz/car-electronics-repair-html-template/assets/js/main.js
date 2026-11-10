/* ============================================================
   CEPAIR — Main JS
   Burger nav, scroll observer, form handling, back-to-top
   ============================================================ */
(function () {
  'use strict';

  /* --- Burger Menu --- */
  const burger = document.querySelector('.navbar__burger');
  const navLinks = document.querySelector('.navbar__links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Navbar scroll state --- */
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    const btt = document.querySelector('.back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Back to top --- */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Intersection Observer: reveal + fade-up --- */
  const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  document.querySelectorAll('.reveal, .fade-up').forEach(el => observer.observe(el));

  /* --- Contact form --- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) {
        success.style.display = 'block';
        form.reset();
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    });
  }

  /* --- Footer year --- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Active nav link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();
