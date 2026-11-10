/* SUCRÉ — bespoke interactions. Topic: bakery/cake shop. No shared skeleton. */
(function(){
  "use strict";
  const burger=document.querySelector(".burger");
  const nav=document.querySelector(".navlinks");
  if(burger&&nav){
    burger.addEventListener("click",()=>{ const o=nav.classList.toggle("open"); burger.setAttribute("aria-expanded",o?"true":"false"); });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{ nav.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }));
  }
  const reveals=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && reveals.length){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    },{threshold:.12, rootMargin:"0px 0px -8% 0px"});
    reveals.forEach(r=>io.observe(r));
  } else reveals.forEach(r=>r.classList.add("in"));

  const here=(location.pathname.split("/").pop()||"index.html");
  document.querySelectorAll(".navlinks a").forEach(a=>{
    const href=a.getAttribute("href");
    if(href===here) a.classList.add("active");
  });
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

  document.querySelectorAll("[data-form]").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const ok=form.querySelector(".form-ok");
      const err=form.querySelector(".form-err");
      if(!form.checkValidity()){
        if(err){ err.textContent="Please complete the required fields."; err.hidden=false; }
        return;
      }
      form.reset();
      if(err) err.hidden=true;
      if(ok){ ok.hidden=false; setTimeout(()=>ok.hidden=true,5000); }
    });
  });

  // Tiny cart count demo (no persistence — patisserie counter feel)
  let count=0;
  const badge=document.querySelector("[data-cart-count]");
  document.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      count++;
      if(badge) badge.textContent=String(count);
      const prev=btn.textContent;
      btn.textContent="Added ✓";
      btn.disabled=true;
      setTimeout(()=>{ btn.textContent=prev; btn.disabled=false; },900);
    });
  });
})();
