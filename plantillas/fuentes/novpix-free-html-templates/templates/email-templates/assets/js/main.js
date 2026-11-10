// Email pack gallery — switches the preview iframe. Without JS, each link simply opens the email.
(function () {
  var d = document;
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var frame = d.querySelector('[data-frame]'), wrap = frame.parentNode, open = d.querySelector('[data-open]');
  var links = d.querySelectorAll('[data-email]');
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      links.forEach(function (x) { x.classList.toggle('is-active', x === a); x.removeAttribute('aria-current'); });
      a.setAttribute('aria-current', 'true');
      frame.src = a.getAttribute('href');
      frame.title = 'Email preview: ' + a.querySelector('strong').textContent;
      open.href = a.getAttribute('href');
    });
  });
  var group = function (attr, fn) {
    var btns = d.querySelectorAll('[' + attr + ']');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        fn(b.getAttribute(attr));
      });
    });
  };
  var fit = function () { try { frame.style.height = frame.contentDocument.documentElement.scrollHeight + 'px'; } catch (e) {} };
  group('data-width', function (w) { wrap.classList.toggle('is-mobile', w === '360'); frame.style.height = '1500px'; setTimeout(fit, 400); });
  // Light/Dark preview: force the email's own prefers-color-scheme rules on or off (same-origin iframe).
  var scheme = 'light';
  var applyScheme = function () {
    try {
      [].forEach.call(frame.contentDocument.styleSheets, function (sheet) {
        [].forEach.call(sheet.cssRules, function (r) {
          if (!r.media) return;
          if (!r.__orig) r.__orig = r.media.mediaText;
          if (r.__orig.indexOf('prefers-color-scheme') > -1) r.media.mediaText = scheme === 'dark' ? 'all' : 'not all';
        });
      });
    } catch (e) {}
  };
  group('data-scheme', function (s) { scheme = s; applyScheme(); });
  // Size the iframe to its content (same-origin only).
  frame.addEventListener('load', function () { applyScheme(); frame.style.height = '1500px'; fit(); });
})();
