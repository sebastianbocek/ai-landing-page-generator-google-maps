/* Wildcard — creative studio template. Small, dependency-free enhancements. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Header border on scroll
    var header = document.querySelector(".site-header");
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    var toggle = document.querySelector(".menu-toggle"), links = document.getElementById("nav-links");
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector("span").textContent = open ? "Close" : "Menu";
      links.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); toggle.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) setMenu(false); });

    // Scroll reveal
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); } });
      }, { threshold: 0.1 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("in-view"); });
    }

    // Work filters
    var filterBtns = document.querySelectorAll("[data-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        document.querySelectorAll("#work-list .case").forEach(function (c) {
          c.hidden = !(f === "all" || c.dataset.cat === f);
          c.classList.add("in-view");
        });
      });
    });

    // Showreel button (demo)
    var play = document.querySelector(".reel .play");
    if (play) play.addEventListener("click", function () { play.textContent = "Add your video"; });

    // Newsletter (demo)
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = form.parentElement.querySelector(".form-msg"), input = form.querySelector("input");
        if (!input.checkValidity()) { msg.textContent = "Please enter a valid email."; input.focus(); return; }
        msg.textContent = "Thanks! (Demo form, connect it to Formspree or Netlify Forms.)";
        form.reset();
      });
    });

    // Contact form validation (demo)
    var contact = document.querySelector("form[data-demo-contact]");
    if (contact) {
      contact.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true, first = null;
        contact.querySelectorAll("input[required]:not([type=radio]), textarea[required]").forEach(function (f) {
          var err = f.parentElement.querySelector(".error");
          var valid = f.checkValidity();
          f.setAttribute("aria-invalid", String(!valid));
          if (err) err.textContent = valid ? "" : (f.type === "email" && f.value ? "That email doesn't look right." : "This field is required.");
          if (!valid) { ok = false; first = first || f; }
        });
        var status = contact.querySelector(".form-status");
        if (!ok) { first.focus(); status.classList.remove("show"); return; }
        status.textContent = "Thanks, your message is on its way! (This is a demo form: connect it to Formspree or Netlify Forms to receive enquiries.)";
        status.classList.add("show");
        contact.reset();
      });
    }

    // Studio clocks
    var clocks = document.querySelectorAll("time[data-tz]");
    var tick = function () {
      clocks.forEach(function (t) {
        try { t.textContent = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: t.dataset.tz }); } catch (err) { /* keep static */ }
      });
    };
    if (clocks.length) { tick(); setInterval(tick, 30000); }
  });
})();
