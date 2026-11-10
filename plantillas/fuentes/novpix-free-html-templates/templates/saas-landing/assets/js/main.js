/* Pulse — SaaS landing page. Small, dependency-free enhancements. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    // Year
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Sticky header border
    var header = document.querySelector(".site-header");
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    var toggle = document.querySelector(".menu-toggle");
    var links = document.getElementById("nav-links");
    if (toggle && links) {
      var setMenu = function (open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        links.classList.toggle("open", open);
      };
      toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
      links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); } });
    }

    // Reveal on scroll + count-up
    var countUp = function (el) {
      var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || "0", 10), suffix = el.dataset.suffix || "";
      if (reduce) return;
      var start = performance.now(), dur = 1400;
      var tick = function (now) {
        var p = Math.min((now - start) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
        el.textContent = v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    var targets = document.querySelectorAll(".reveal, .mock, [data-count]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          if (entry.target.dataset.count) countUp(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add("in-view"); });
    }

    // Card spotlight follows the pointer
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });

    // Pricing toggle
    var buttons = document.querySelectorAll("[data-billing]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var period = btn.dataset.billing;
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        document.querySelectorAll("[data-monthly]").forEach(function (el) { el.textContent = el.dataset[period]; });
      });
    });

    // Demo forms — replace with a real endpoint (see comment in index.html)
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = form.parentElement.querySelector(".form-msg");
        var input = form.querySelector("input[type=email]");
        if (input && !input.checkValidity()) {
          if (msg) { msg.style.color = "#fca5a5"; msg.textContent = "Please enter a valid email address."; }
          input.focus();
          return;
        }
        if (msg) { msg.style.color = ""; msg.textContent = "Thanks! This is a demo form, connect it to Formspree or Netlify Forms to collect sign-ups."; }
        form.reset();
      });
    });
  });
})();
