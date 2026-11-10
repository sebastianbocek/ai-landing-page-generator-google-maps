/* ==========================================================================
   Aube — coming soon page
   ------------------------------------------------------------------------
   CONFIGURE YOUR LAUNCH HERE
   LAUNCH_DATE: ISO date-time. Add a timezone offset (e.g. "+01:00") to pin
   it to a specific zone; without one it uses the visitor's local time.
   ========================================================================== */
var LAUNCH_DATE = "2026-12-01T09:00:00";
var LAUNCHED_MESSAGE = "We're live! Come on in.";

(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Countdown
    var target = new Date(LAUNCH_DATE);
    var dateEl = document.getElementById("launch-date");
    if (dateEl && !isNaN(target)) {
      dateEl.textContent = target.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) + ", " +
        target.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    }
    var units = {};
    document.querySelectorAll("[data-unit]").forEach(function (el) { units[el.dataset.unit] = el; });
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var set = function (key, value) {
      var el = units[key];
      if (!el || el.textContent === value) return;
      el.textContent = value;
      if (!reduce) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); }
    };
    var timer;
    var update = function () {
      var diff = target - new Date();
      if (isNaN(diff)) return;
      if (diff <= 0) {
        clearInterval(timer);
        ["days", "hours", "minutes", "seconds"].forEach(function (k) { set(k, "00"); });
        var note = document.querySelector(".launch-date");
        if (note) note.textContent = LAUNCHED_MESSAGE;
        return;
      }
      var s = Math.floor(diff / 1000);
      set("days", pad(Math.floor(s / 86400)));
      set("hours", pad(Math.floor((s % 86400) / 3600)));
      set("minutes", pad(Math.floor((s % 3600) / 60)));
      set("seconds", pad(s % 60));
    };
    update();
    timer = setInterval(update, 1000);

    // Waitlist form (demo) — see the comment above the form in index.html to connect it
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type=email]");
        var msg = form.parentElement.querySelector(".form-msg");
        if (!input.checkValidity()) {
          msg.textContent = "Please enter a valid email address.";
          input.setAttribute("aria-invalid", "true");
          input.focus();
          return;
        }
        input.removeAttribute("aria-invalid");
        msg.textContent = "You're on the list! (Demo form: connect it to Formspree, Netlify Forms or your newsletter tool.)";
        form.reset();
      });
    });
  });
})();
