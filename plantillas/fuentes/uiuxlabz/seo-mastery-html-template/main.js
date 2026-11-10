/**
 * SEOMASTER - Main JavaScript
 * Interactive functionality for the website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initCounterAnimation();
  initFormHandling();
  initTypingEffect();
});

/**
 * Header scroll effect
 * Adds shadow and background opacity on scroll
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  const toggleMenu = () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };

  const closeMenu = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Animate counter numbers
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);
      const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);

      element.textContent = formatNumber(currentValue) + (element.getAttribute('data-suffix') || '');

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Form handling and validation
 */
function initFormHandling() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  };

  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');

    if (existingError) {
      existingError.textContent = message;
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = '#ef4444';
      errorDiv.style.fontSize = '0.875rem';
      errorDiv.style.marginTop = '8px';
      errorDiv.textContent = message;
      formGroup.appendChild(errorDiv);
    }

    input.style.borderColor = '#ef4444';
  };

  const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');

    if (existingError) {
      existingError.remove();
    }

    input.style.borderColor = '';
  };

  const showSuccess = (message) => {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #65A30D;
      color: #1A1A2E;
      padding: 24px 40px;
      border-radius: 12px;
      font-weight: 600;
      z-index: 9999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      text-align: center;
    `;
    successDiv.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 16px;">✓</div>
      <div>${message}</div>
    `;
    document.body.appendChild(successDiv);

    // Remove after 3 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const messageInput = contactForm.querySelector('#message');

    let isValid = true;

    // Validate name
    if (nameInput && nameInput.value.trim().length < 2) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else if (nameInput) {
      clearError(nameInput);
    }

    // Validate email
    if (emailInput && !validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else if (emailInput) {
      clearError(emailInput);
    }

    // Validate phone (optional)
    if (phoneInput && phoneInput.value && !validatePhone(phoneInput.value)) {
      showError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    } else if (phoneInput) {
      clearError(phoneInput);
    }

    // Validate message
    if (messageInput && messageInput.value.trim().length < 10) {
      showError(messageInput, 'Please enter a message (at least 10 characters)');
      isValid = false;
    } else if (messageInput) {
      clearError(messageInput);
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showSuccess('Thank you! Your message has been sent successfully.');
      }, 1500);
    }
  });

  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim()) {
        clearError(input);
      }
    });
  });
}

/**
 * Typing effect for hero section
 */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const texts = ['Search Rankings', 'Organic Traffic', 'Online Visibility', 'Business Growth'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
  };

  // Start typing effect when element is visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.disconnect();
    }
  });

  observer.observe(typingElement);
}

/**
 * Parallax effect for hero section
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  }, { passive: true });
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  if (!images.length) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Active link highlighting based on scroll position
 */
function initActiveLinkHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const highlightLink = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightLink, { passive: true });
}

/**
 * Accordion functionality for FAQ sections
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Export functions for potential external use
window.SEOMASTER = {
  initHeader,
  initMobileMenu,
  initSmoothScroll,
  initScrollAnimations,
  initCounterAnimation,
  initFormHandling,
  initTypingEffect,
  initParallax,
  initBackToTop,
  initLazyLoading,
  initActiveLinkHighlight,
  initAccordion
};
