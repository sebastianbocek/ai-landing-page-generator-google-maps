// DENTCARE — bespoke interactions
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // burger toggle (.open + aria-expanded)
  const burger = $('[data-burger]');
  const nav = $('[data-nav]');
  if(burger && nav){
    burger.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  // active nav via location.pathname
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('[data-nav] a').forEach(a=>{
    const href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path || (path==='' && href==='index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });

  // [data-year]
  $$('[data-year]').forEach(el=> el.textContent = String(new Date().getFullYear()));

  // IntersectionObserver reveals
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.14});
    $$('.reveal').forEach(el=> io.observe(el));
  } else {
    $$('.reveal').forEach(el=> el.classList.add('in'));
  }

  // FAQ accordion
  $$('[data-faq] .faq-q').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // [data-form] with .form-ok / .form-err (never alert)
  $$('[data-form]').forEach(form=>{
    const ok = form.querySelector('.form-ok');
    const err = form.querySelector('.form-err');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(ok) ok.style.display='none';
      if(err) err.style.display='none';
      const fd = new FormData(form);
      const name = String(fd.get('name')||'').trim();
      const email = String(fd.get('email')||'').trim();
      const date = String(fd.get('date')||'').trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!name || !emailOk || (form.querySelector('[name="date"]') && !date)){
        if(err){ err.textContent = 'Please check your name, email and preferred date.'; err.style.display='block'; }
        return;
      }
      if(ok){ ok.textContent = 'Request received — we will confirm your appointment shortly.'; ok.style.display='block'; }
      form.reset();
    });
  });
})();
