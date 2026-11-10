// Link in bio — progressive enhancements (page works fully without JS).
(function () {
  var y = document.querySelectorAll('[data-year]');
  for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();

  var share = document.querySelector('[data-share]');
  if (share) share.addEventListener('click', function () {
    var data = { title: document.title, url: location.href };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () {
      share.setAttribute('aria-label', 'Link copied');
      share.classList.add('copied');
      setTimeout(function () { share.setAttribute('aria-label', 'Share this page'); }, 2000);
    });
  });

  // Demo form handler — remove when you connect Formspree / Netlify Forms.
  var forms = document.querySelectorAll('form[data-demo]');
  for (var f = 0; f < forms.length; f++) forms[f].addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = this.querySelector('.msg');
    if (msg) msg.textContent = 'Thanks! This is a demo form — connect it to Formspree or Netlify Forms to collect emails.';
    this.reset();
  });
})();
