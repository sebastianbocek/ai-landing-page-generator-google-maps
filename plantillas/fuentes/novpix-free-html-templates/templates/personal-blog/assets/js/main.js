/* Iris Moreau blog template — progressive enhancements (the site reads fine without JS). */
(function () {
  var root = document.documentElement;

  // Dark mode toggle (remembers choice in localStorage; follows the OS until toggled)
  var themeBtn = document.querySelector('.theme-toggle');
  var isDark = function () {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  var syncLabel = function () { if (themeBtn) themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode'); };
  if (themeBtn) {
    syncLabel();
    themeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('zt-blog-theme', next); } catch (e) {}
      syncLabel();
    });
  }

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    var setOpen = function (open) { toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('open', open); };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  // Reading time (≈ 230 words per minute)
  var prose = document.querySelector('[data-prose]');
  var rt = document.querySelector('[data-reading-time]');
  if (prose && rt) {
    var words = prose.textContent.trim().split(/\s+/).length;
    rt.textContent = Math.max(1, Math.ceil(words / 230)) + ' min read';
  }

  // Reading progress bar
  var bar = document.querySelector('.progress span');
  if (bar && prose) {
    var onScroll = function () {
      var r = prose.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.3) / total));
      bar.style.transform = 'scaleX(' + p + ')';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  // Table of contents scroll-spy
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    document.querySelectorAll('.prose h2[id]').forEach(function (h) { spy.observe(h); });
  }

  // Copy buttons on code blocks
  document.querySelectorAll('.code-block').forEach(function (fig) {
    var cap = fig.querySelector('figcaption'), code = fig.querySelector('code');
    if (!cap || !code || !navigator.clipboard) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'Copy';
    b.setAttribute('aria-label', 'Copy code: ' + cap.textContent);
    b.addEventListener('click', function () {
      navigator.clipboard.writeText(code.textContent).then(function () {
        b.textContent = 'Copied!'; setTimeout(function () { b.textContent = 'Copy'; }, 1600);
      });
    });
    cap.appendChild(b);
  });

  // Copy page link
  var copyLink = document.querySelector('.copy-link');
  if (copyLink && navigator.clipboard) {
    copyLink.addEventListener('click', function () {
      navigator.clipboard.writeText(location.href).then(function () {
        copyLink.textContent = 'Link copied'; setTimeout(function () { copyLink.textContent = 'Copy link'; }, 1600);
      });
    });
  }

  // Tag filtering on the home page (?tag=css). Without JS the links simply reload the full list.
  var rows = document.querySelectorAll('.post-row');
  var status = document.querySelector('.filter-status');
  var topics = document.querySelectorAll('.topic[data-tag]');
  if (rows.length && topics.length) {
    var apply = function (tag) {
      var n = 0;
      rows.forEach(function (r) {
        var show = !tag || (' ' + r.getAttribute('data-tags') + ' ').indexOf(' ' + tag + ' ') > -1;
        r.hidden = !show; if (show) n++;
      });
      topics.forEach(function (t) { if (t.getAttribute('data-tag') === tag) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      if (status) {
        status.textContent = '';
        if (tag) {
          status.textContent = n + (n === 1 ? ' essay' : ' essays') + ' tagged “' + tag + '”';
          var clear = document.createElement('button');
          clear.type = 'button'; clear.textContent = 'Show all';
          clear.addEventListener('click', function () { apply(''); history.replaceState(null, '', location.pathname + '#posts'); });
          status.appendChild(clear);
        }
      }
    };
    topics.forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        var tag = t.getAttribute('data-tag');
        var active = t.getAttribute('aria-current') === 'true';
        apply(active ? '' : tag);
        history.replaceState(null, '', active ? location.pathname + '#posts' : '?tag=' + tag + '#posts');
        document.getElementById('posts').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    var initial = new URLSearchParams(location.search).get('tag');
    if (initial) apply(initial.toLowerCase());
  }

  // Demo forms
  document.querySelectorAll('[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = form.querySelector('.form-status');
      if (st) st.textContent = 'Thanks for subscribing! (Demo form — connect it to your newsletter provider.)';
      form.reset();
    });
  });
})();
