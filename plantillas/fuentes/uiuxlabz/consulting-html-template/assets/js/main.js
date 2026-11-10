// CONSULT — bespoke interactions
(function(){
  var burger = document.querySelector('[data-burger]');
  var mobile = document.querySelector('[data-mobile]');
  if(burger && mobile){
    burger.addEventListener('click', function(){
      var isOpen = burger.classList.toggle('open');
      mobile.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    mobile.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        burger.classList.remove('open');
        mobile.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      });
    });
  }

  // active nav via location.pathname
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(path === '') path = 'index.html';
  document.querySelectorAll('[data-nav] a').forEach(function(a){
    var href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path || (path==='index.html' && href==='./index.html') || (href==='index.html' && path==='')) a.classList.add('active');
    // also handle relative
    var file = href.split('/').pop();
    if(file === path) a.classList.add('active');
  });

  // year
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = String(new Date().getFullYear());
  });

  // IntersectionObserver reveals — deck slide from right
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.14});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  // count-up for approach numbers and KPI numbers
  var counters = document.querySelectorAll('[data-count]');
  function countUp(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 900;
    var start = performance.now();
    function frame(now){
      var p = Math.min(1, (now - start)/dur);
      var eased = 1 - Math.pow(1-p, 3);
      var val = target * eased;
      el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toString()) + suffix;
      if(p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + (decimals ? target.toFixed(decimals) : String(Math.round(target))) + suffix;
    }
    requestAnimationFrame(frame);
  }
  if('IntersectionObserver' in window && counters.length){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); }
      });
    }, {threshold:0.5});
    counters.forEach(function(c){ cio.observe(c); });
  }

  // forms — never alert()
  document.querySelectorAll('[data-form]').forEach(function(form){
    var ok = form.querySelector('.form-ok');
    var err = form.querySelector('.form-err');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(ok) ok.classList.remove('show');
      if(err) err.classList.remove('show');
      var fd = new FormData(form);
      var email = String(fd.get('email')||'').trim();
      var name = String(fd.get('name')||'').trim();
      var msg = String(fd.get('message')||'').trim();
      var valid = true;
      var reason = '';
      if(name && name.length < 2){ valid=false; reason='Please enter your full name.'; }
      if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ valid=false; reason='Please enter a valid email address.'; }
      if(form.querySelector('[name="message"]') && !msg){ valid=false; reason='Please add a short message.'; }
      if(!valid){
        if(err){ err.textContent = reason; err.classList.add('show'); }
        return;
      }
      if(ok){
        ok.textContent = 'Thanks — we will be in touch within one business day.';
        ok.classList.add('show');
      }
      form.reset();
    });
  });
})();
