/* ============================================
   SALONE - Beauty Salon Template
   Main JavaScript | No Frameworks
   ============================================ */

(function () {
  'use strict';

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initGalleryFilters();
    initLightbox();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initHeroParallax();
  }

  // ---------- Navbar Scroll ----------
  function initNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    var scrollThreshold = 80;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
      document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    var navItems = links.querySelectorAll('.nav-link');
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        toggle.classList.remove('active');
        links.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------- Scroll Reveal ----------
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
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

  // ---------- Gallery Filters ----------
  function initGalleryFilters() {
    var filters = document.querySelectorAll('.gallery-filter');
    var items = document.querySelectorAll('.gallery-item');
    if (!filters.length || !items.length) return;

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = this.getAttribute('data-filter');

        // Update active state
        filters.forEach(function (f) { f.classList.remove('active'); });
        this.classList.add('active');

        // Filter items
        items.forEach(function (item) {
          var itemCat = item.getAttribute('data-category');
          if (cat === 'all' || itemCat === cat) {
            item.style.display = '';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- Lightbox ----------
  function initLightbox() {
    var galleryItems = document.querySelectorAll('.gallery-item[data-src]');
    if (!galleryItems.length) return;

    // Create lightbox
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-content">' +
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>' +
      '<img src="" alt="Gallery image">' +
      '</div>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('img');
    var currentIndex = 0;
    var images = [];

    galleryItems.forEach(function (item, index) {
      images.push({
        src: item.getAttribute('data-src'),
        alt: item.getAttribute('data-alt') || 'Gallery image'
      });

      item.addEventListener('click', function () {
        currentIndex = index;
        showImage(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function showImage(i) {
      lightboxImg.src = images[i].src;
      lightboxImg.alt = images[i].alt;
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', function (e) {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', function (e) {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ---------- Testimonial Slider ----------
  function initTestimonialSlider() {
    var track = document.querySelector('.testimonial-track');
    var dots = document.querySelectorAll('.testimonial-dot');
    if (!track || !dots.length) return;

    var slides = track.querySelectorAll('.testimonial-slide');
    var current = 0;
    var total = slides.length;
    var autoInterval;

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        goTo(idx);
        resetAuto();
      });
    });

    function autoPlay() {
      autoInterval = setInterval(function () {
        goTo((current + 1) % total);
      }, 5000);
    }

    function resetAuto() {
      clearInterval(autoInterval);
      autoPlay();
    }

    // Touch/swipe support
    var startX = 0;
    var distX = 0;
    var threshold = 50;

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      distX = e.touches[0].clientX - startX;
    }, { passive: true });

    track.addEventListener('touchend', function () {
      if (Math.abs(distX) > threshold) {
        if (distX > 0 && current > 0) {
          goTo(current - 1);
        } else if (distX < 0 && current < total - 1) {
          goTo(current + 1);
        }
        resetAuto();
      }
      distX = 0;
    });

    autoPlay();
  }

  // ---------- Contact Form ----------
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var submitBtn = form.querySelector('.form-submit');

      // Basic validation
      var valid = true;

      [name, email, message].forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#EF4444';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#EF4444';
        valid = false;
      }

      if (!valid) return;

      // Simulate submission
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#059669';

        form.reset();

        setTimeout(function () {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });

    // Real-time validation
    var inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (this.value.trim()) {
          this.style.borderColor = '';
        }
      });
    });
  }

  // ---------- Back to Top ----------
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

  // ---------- Smooth Scroll ----------
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Hero Parallax ----------
  function initHeroParallax() {
    var hero = document.querySelector('.hero');
    var heroBg = document.querySelector('.hero-bg img');
    if (!hero || !heroBg) return;

    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  // ---------- CSS Animation Keyframes ----------
  var style = document.createElement('style');
  style.textContent = '@keyframes fadeIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}';
  document.head.appendChild(style);

})();
