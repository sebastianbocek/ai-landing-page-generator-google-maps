/* Detour — error page pack. Shared, dependency-free enhancements. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // "Previous page" links use history when there is somewhere to go back to
    document.querySelectorAll("[data-back]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (window.history.length > 1 && document.referrer) { e.preventDefault(); window.history.back(); }
      });
    });

    // Reload buttons (500 + maintenance)
    document.querySelectorAll("[data-reload]").forEach(function (b) {
      b.addEventListener("click", function () { window.location.reload(); });
    });

    // Copy reference id
    document.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var src = document.querySelector(b.dataset.copy);
        if (!src || !navigator.clipboard) return;
        navigator.clipboard.writeText(src.textContent).then(function () {
          b.textContent = "Copied";
          setTimeout(function () { b.textContent = "Copy"; }, 1600);
        }).catch(function () {});
      });
    });

    // Demo search: replace with your real search endpoint (see comment in the HTML)
    document.querySelectorAll("form[data-demo-search]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = form.querySelector("input").value.trim();
        var msg = document.querySelector(".demo-msg");
        if (msg) msg.textContent = q ? 'Demo search for "' + q + '". Connect this form to your site search.' : "Type something to search.";
      });
    });

    // Show the requested path in the dark terminal
    document.querySelectorAll(".req-path").forEach(function (el) {
      var p = window.location.pathname;
      if (p && p !== "/" && !/404-dark\.html$/.test(p)) el.textContent = p;
    });

    // Gallery: scale the live previews to fit their frames
    var frames = document.querySelectorAll(".shot .frame");
    if (frames.length) {
      var fit = function () { frames.forEach(function (f) { f.style.setProperty("--s", String(f.clientWidth / 1280)); }); };
      fit();
      window.addEventListener("resize", fit);
    }

    // Maintenance ETA: show "back around" in the visitor's local time (edit minutes below)
    var eta = document.getElementById("eta");
    if (eta) {
      var MINUTES_LEFT = 25;
      var t = new Date(Date.now() + MINUTES_LEFT * 60000);
      eta.textContent = t.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) + " your time";
    }

    // ---------- Catch-the-zero mini game ----------
    var arena = document.getElementById("arena");
    var target = document.getElementById("target");
    if (arena && target) {
      var scoreEl = document.getElementById("score"), timeEl = document.getElementById("time"), bestEl = document.getElementById("best");
      var restart = document.getElementById("restart");
      var GAME_SECONDS = 20, size = 84;
      var x = 40, y = 40, vx = 2.4, vy = 1.8, score = 0, left = GAME_SECONDS, running = false, started = false, raf = 0, clock = 0, hop = 0;
      var best = 0;
      try { best = parseInt(localStorage.getItem("detour-best") || "0", 10) || 0; } catch (err) { best = 0; }
      bestEl.textContent = "Best: " + best;

      var place = function () { target.style.transform = "translate(" + x + "px," + y + "px)"; };
      var bounds = function () { return { w: arena.clientWidth - size, h: arena.clientHeight - size }; };
      var center = function () { var b = bounds(); x = b.w / 2; y = b.h / 2; place(); };
      var jump = function () { var b = bounds(); x = Math.random() * b.w; y = Math.random() * b.h; place(); };

      var loop = function () {
        var b = bounds();
        x += vx; y += vy;
        if (x <= 0 || x >= b.w) { vx *= -1; x = Math.max(0, Math.min(b.w, x)); }
        if (y <= 0 || y >= b.h) { vy *= -1; y = Math.max(0, Math.min(b.h, y)); }
        place();
        if (running) raf = requestAnimationFrame(loop);
      };
      var end = function () {
        running = false;
        cancelAnimationFrame(raf); clearInterval(clock); clearInterval(hop);
        timeEl.textContent = "Time's up!";
        if (score > best) { best = score; try { localStorage.setItem("detour-best", String(best)); } catch (err) {} }
        bestEl.textContent = "Best: " + best;
        target.setAttribute("aria-label", "Game over. Score " + score + ". Press to play again");
        started = false;
      };
      var start = function () {
        score = 0; left = GAME_SECONDS; running = true; started = true;
        vx = 2.4 * (Math.random() > .5 ? 1 : -1); vy = 1.8 * (Math.random() > .5 ? 1 : -1);
        scoreEl.textContent = "Score: 0"; timeEl.textContent = left + "s";
        target.setAttribute("aria-label", "Catch the zero");
        clearInterval(clock); cancelAnimationFrame(raf); clearInterval(hop);
        clock = setInterval(function () { left -= 1; timeEl.textContent = left + "s"; if (left <= 0) end(); }, 1000);
        if (reduce) { hop = setInterval(jump, 1100); } else { raf = requestAnimationFrame(loop); }
      };
      var pop = function (text) {
        var p = document.createElement("span");
        p.className = "pop"; p.textContent = text;
        p.style.left = (x + size / 2 - 10) + "px"; p.style.top = (y - 6) + "px";
        arena.appendChild(p);
        setTimeout(function () { p.remove(); }, 800);
      };
      target.addEventListener("click", function () {
        if (!started) { start(); return; }
        if (!running) return;
        score += 1;
        scoreEl.textContent = "Score: " + score;
        pop("+1");
        target.classList.remove("hit"); void target.offsetWidth; target.classList.add("hit");
        vx *= 1.12; vy *= 1.12;
        jump();
      });
      restart.addEventListener("click", start);
      window.addEventListener("resize", function () { if (!running) center(); });
      center();
      timeEl.textContent = "Tap the 0 to start";
    }
  });
})();
