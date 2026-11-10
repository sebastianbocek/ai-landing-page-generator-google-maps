(() => {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  }

  // active nav
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav] a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

  // year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  // reveal
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0 0 -8% 0' });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in'));
  }

  // forms
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.querySelectorAll('[data-form]').forEach((form) => {
    const ok = form.querySelector('.form-ok');
    const err = form.querySelector('.form-err');
    const show = (el) => { if (el) el.classList.add('show'); };
    const hide = (el) => { if (el) el.classList.remove('show'); };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hide(ok); hide(err);
      const emailInput = form.querySelector('input[type="email"]');
      let valid = form.checkValidity();
      if (emailInput && emailInput.value && !emailRe.test(emailInput.value.trim())) {
        valid = false;
        emailInput.setCustomValidity('Enter a valid email.');
      } else if (emailInput) {
        emailInput.setCustomValidity('');
      }
      if (!valid) {
        form.reportValidity();
        show(err);
        if (err && !err.textContent.trim()) err.textContent = 'Please fix the highlighted fields.';
        return;
      }
      show(ok);
      form.reset();
    });
  });

  // optional cart demo
  const cartCountEl = document.querySelector('[data-cart-count]');
  let cartCount = 0;
  document.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      if (cartCountEl) cartCountEl.textContent = String(cartCount);
      btn.textContent = 'Added ✓';
      setTimeout(() => { btn.textContent = btn.dataset.label || 'Add'; }, 1200);
    });
  });
})();
