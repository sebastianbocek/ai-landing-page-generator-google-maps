/* Sprout — app landing page. Small, dependency-free enhancements. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Header background on scroll
    var header = document.querySelector(".site-header");
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    var toggle = document.querySelector(".menu-toggle"), links = document.getElementById("nav-links");
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      links.classList.toggle("open", open);
    };
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

    // Scroll reveal
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("in-view"); });
    }

    // Screenshot carousel (native scroll-snap; buttons just scroll it)
    var track = document.getElementById("track");
    var navBtns = document.querySelectorAll(".carousel-nav button");
    if (track) {
      var update = function () {
        var max = track.scrollWidth - track.clientWidth - 4;
        navBtns[0].disabled = track.scrollLeft <= 4;
        navBtns[1].disabled = track.scrollLeft >= max;
      };
      navBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var slide = track.querySelector(".slide");
          var step = slide ? slide.getBoundingClientRect().width + 28 : 300;
          track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: reduce ? "auto" : "smooth" });
        });
      });
      track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    }
  });
})();
