/* Noor Halvorsen photography template — progressive enhancements.
   Without JS, gallery links simply open the full image. */
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  // Mobile menu (full-screen overlay)
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
      header.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  // Lightbox with keyboard, buttons and swipe
  var items = Array.prototype.slice.call(document.querySelectorAll('.lb-item'));
  if (items.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML =
      '<div class="lb-top"><span class="lb-count" aria-live="polite"></span>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close viewer">✕</button></div>' +
      '<div class="lb-stage"><button class="lb-btn lb-prev" type="button" aria-label="Previous image">←</button>' +
      '<img alt=""><button class="lb-btn lb-next" type="button" aria-label="Next image">→</button></div>' +
      '<p class="lb-caption"></p>';
    document.body.appendChild(box);
    var img = box.querySelector('img'), cap = box.querySelector('.lb-caption'), count = box.querySelector('.lb-count');
    var closeBtn = box.querySelector('.lb-close'), index = 0, lastFocus = null;

    var show = function (i) {
      index = (i + items.length) % items.length;
      var a = items[index], thumb = a.querySelector('img');
      img.classList.add('swap');
      setTimeout(function () {
        img.src = a.getAttribute('href');
        img.alt = thumb ? thumb.alt : '';
        img.classList.remove('swap');
      }, 120);
      cap.textContent = a.getAttribute('data-caption') || '';
      count.textContent = (index + 1) + ' / ' + items.length;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add('open');
      document.body.classList.add('lb-lock');
      setTimeout(function () { closeBtn.focus(); }, 60);
    };
    var close = function () {
      box.classList.remove('open');
      document.body.classList.remove('lb-lock');
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    closeBtn.addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
    box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lb-stage')) close(); });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(index + 1);
      else if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        var f = box.querySelectorAll('button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Swipe
    var sx = 0, sy = 0;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
    }, { passive: true });
  }

  // Scroll reveal
  var rev = document.querySelectorAll('.masonry li, .gallery-cards li, .intro, .cta, .package, .steps li');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
    rev.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // Demo form
  document.querySelectorAll('[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = form.querySelector('.form-status');
      if (st) st.textContent = 'Thank you! This is a demo form — connect it to Formspree or Netlify Forms to receive enquiries.';
      form.reset();
    });
  });
})();
