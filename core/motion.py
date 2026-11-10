from __future__ import annotations

from pathlib import Path


GSAP_VERSION = "3.15.1"
GSAP_VENDOR = Path(__file__).parent / "vendor" / "gsap"


def inline_motion_bundle() -> str:
    """Embed pinned GSAP plugins so exported sites work without a CDN."""
    names = ("gsap.min.js", "ScrollTrigger.min.js", "Flip.min.js", "Observer.min.js")
    scripts = [(GSAP_VENDOR / name).read_text(encoding="utf-8") for name in names]
    runtime = r"""
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const effects = (document.body.dataset.effects || "").split(/\s+/).filter(Boolean);
  const gsapReady = !!(window.gsap && window.Flip && window.ScrollTrigger);
  if (gsapReady) gsap.registerPlugin(Flip, ScrollTrigger, Observer);

  const photos = [...document.querySelectorAll("[data-photo-open] img")];
  const dialog = document.querySelector("#photo-viewer");
  const viewerImage = dialog?.querySelector(".viewer-image");
  const viewerCaption = dialog?.querySelector(".viewer-caption");
  const viewerCount = dialog?.querySelector(".viewer-count");
  let photoIndex = 0;
  let triggerBeforeOpen = null;
  const paintViewer = (index, direction, animate) => {
    if (!photos.length || !viewerImage) return;
    photoIndex = (index + photos.length) % photos.length;
    const source = photos[photoIndex];
    const update = () => {
      viewerImage.src = source.currentSrc || source.src;
      viewerImage.alt = source.alt || "";
      viewerImage.dataset.flipId = source.dataset.flipId;
      if (viewerCaption) viewerCaption.textContent = source.alt || "";
      if (viewerCount) viewerCount.textContent = String(photoIndex + 1) + " / " + photos.length;
      if (gsapReady && animate && !reduced) {
        gsap.fromTo(viewerImage, { x: direction * 22, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.32, ease: "power2.out", overwrite: true });
      } else if (gsapReady) gsap.set(viewerImage, { clearProps: "transform,opacity,visibility" });
    };
    if (gsapReady && animate && !reduced && viewerImage.src) {
      gsap.to(viewerImage, { x: -direction * 22, autoAlpha: 0, duration: 0.14, onComplete: update });
    } else update();
    triggerBeforeOpen = source.closest("[data-photo-open]");
  };

  const closeViewer = () => {
    if (!dialog || !dialog.open) return;
    const state = gsapReady && !reduced && viewerImage ? Flip.getState(viewerImage) : null;
    dialog.close();
    if (state && triggerBeforeOpen) {
      Flip.from(state, {
        targets: triggerBeforeOpen.querySelector("img"),
        duration: 0.52, ease: "power2.inOut", scale: true, fade: true, absolute: true
      });
    }
    triggerBeforeOpen?.focus({ preventScroll: true });
  };

  document.querySelectorAll("[data-photo-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const source = trigger.querySelector("img");
      triggerBeforeOpen = trigger;
      const state = gsapReady && !reduced ? Flip.getState(source) : null;
      paintViewer(photos.indexOf(source), 1, false);
      if (!dialog.open) dialog.showModal();
      if (state) requestAnimationFrame(() => Flip.from(state, {
        targets: viewerImage, duration: 0.64, ease: "power2.inOut", scale: true, fade: true, absolute: true
      }));
    });
  });
  dialog?.querySelector(".viewer-close")?.addEventListener("click", closeViewer);
  dialog?.querySelector(".viewer-prev")?.addEventListener("click", () => paintViewer(photoIndex - 1, -1, true));
  dialog?.querySelector(".viewer-next")?.addEventListener("click", () => paintViewer(photoIndex + 1, 1, true));
  dialog?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") paintViewer(photoIndex - 1, -1, true);
    if (event.key === "ArrowRight") paintViewer(photoIndex + 1, 1, true);
  });
  dialog?.addEventListener("cancel", (event) => { event.preventDefault(); closeViewer(); });
  dialog?.addEventListener("click", (event) => { if (event.target === dialog) closeViewer(); });

  const reviews = document.querySelector("[data-review-carousel]");
  if (reviews) {
    const viewport = reviews.querySelector(".review-viewport");
    const move = (direction) => viewport?.scrollBy({
      left: direction * Math.max(260, viewport.clientWidth * 0.82),
      behavior: reduced ? "auto" : "smooth"
    });
    reviews.querySelector(".review-prev")?.addEventListener("click", () => move(-1));
    reviews.querySelector(".review-next")?.addEventListener("click", () => move(1));
    if (window.Observer && !reduced && viewport) Observer.create({
      target: viewport, type: "touch,pointer", lockAxis: true, tolerance: 65,
      preventDefault: false, allowClicks: true,
      onLeft: () => move(1), onRight: () => move(-1)
    });
  }

  const sections = [...document.querySelectorAll(".reveal")];
  if (!gsapReady || reduced) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  gsap.defaults({ ease: "power3.out", overwrite: "auto" });
  const direction = [...document.body.classList].find((item) => item.startsWith("art-"))?.slice(4) || "modern_minimal";
  const profiles = {
    editorial_premium: { duration: 1.02, stagger: 0.14, ease: "expo.out", heading: "lines", mask: 1.25 },
    luxury: { duration: 1.3, stagger: 0.19, ease: "power1.out", heading: "lines", mask: 1.65 },
    bold_creative: { duration: 0.62, stagger: 0.065, ease: "back.out(1.25)", heading: "words", mask: 0.78 },
    modern_minimal: { duration: 0.46, stagger: 0.075, ease: "power2.out", heading: "words", mask: 0.72 },
    corporate_premium: { duration: 0.68, stagger: 0.1, ease: "power2.out", heading: "lines", mask: 0.95 },
    organic_natural: { duration: 0.92, stagger: 0.13, ease: "sine.out", heading: "lines", mask: 1.12 },
    dark_elegant: { duration: 1.1, stagger: 0.16, ease: "expo.out", heading: "lines", mask: 1.35 },
    contemporary_local: { duration: 0.72, stagger: 0.1, ease: "power3.out", heading: "words", mask: 0.92 }
  };
  const profile = profiles[direction] || profiles.modern_minimal;

  const makeLines = (element) => {
    if (!element || element.dataset.linesReady) return [];
    const words = element.textContent.trim().split(/\s+/);
    element.dataset.linesReady = "true";
    element.setAttribute("aria-label", words.join(" "));
    const measure = document.createElement("span");
    measure.className = "heading-measure";
    measure.setAttribute("aria-hidden", "true");
    const tokens = words.map((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      measure.append(span);
      return span;
    });
    element.replaceChildren(measure);
    const groups = [];
    let top = null;
    tokens.forEach((token, index) => {
      const lineTop = Math.round(token.getBoundingClientRect().top);
      if (lineTop !== top) { groups.push([]); top = lineTop; }
      groups[groups.length - 1].push(words[index]);
    });
    const visual = document.createElement("span");
    visual.className = "heading-visual";
    visual.setAttribute("aria-hidden", "true");
    groups.forEach((group) => {
      const mask = document.createElement("span");
      mask.className = "hero-line-clip";
      const line = document.createElement("span");
      line.className = "hero-line";
      line.textContent = group.join(" ");
      mask.append(line);
      visual.append(mask);
    });
    element.replaceChildren(visual);
    return [...visual.querySelectorAll(".hero-line")];
  };
  const heading = document.querySelector("[data-motion-heading]");
  let titleTargets = [];
  if (profile.heading === "lines") titleTargets = makeLines(heading);
  else if (heading) {
    const text = heading.textContent.trim();
    heading.setAttribute("aria-label", text);
    const visual = document.createElement("span");
    visual.className = "heading-visual";
    visual.setAttribute("aria-hidden", "true");
    text.split(/\s+/).forEach((word) => {
      const span = document.createElement("span");
      span.className = "heading-word";
      span.textContent = word;
      visual.append(span, document.createTextNode(" "));
    });
    heading.replaceChildren(visual);
    titleTargets = [...visual.querySelectorAll(".heading-word")];
  }

  const hero = gsap.timeline({ defaults: { ease: profile.ease } });
  hero.fromTo(".nav", { y: -14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 })
    .fromTo(".hero-copy > .eyebrow", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: profile.duration * 0.72 }, "-=0.12")
    .fromTo(titleTargets, { yPercent: profile.heading === "lines" ? 112 : 38, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: profile.duration, stagger: profile.stagger }, "-=0.12")
    .fromTo(".hero-copy > p, .hero-copy .actions, .hero-rating",
      { y: direction === "bold_creative" ? 26 : 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: profile.duration * 0.82, stagger: profile.stagger * 0.75 }, "-=0.16")
    .fromTo(".hero-media", { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 },
      { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, duration: profile.mask }, "-=0.46")
    .fromTo(".hero-photo, .hero-art", { scale: direction === "luxury" ? 1.12 : 1.06 },
      { scale: 1, duration: profile.mask + 0.25 }, "<");

  document.querySelectorAll(".reveal").forEach((section) => {
    const cards = section.querySelectorAll(".review-card, .service-card, .location-card");
    gsap.fromTo(section, { y: direction === "bold_creative" ? 32 : 26, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: profile.duration, ease: profile.ease,
      onStart: () => section.classList.add("is-visible"),
      scrollTrigger: { trigger: section, start: "top 84%", once: true }
    });
    if (cards.length) gsap.fromTo(cards, { y: 20, scale: direction === "bold_creative" ? 0.96 : 1, autoAlpha: 0 }, {
      y: 0, scale: 1, autoAlpha: 1, duration: profile.duration * 0.75, stagger: profile.stagger,
      ease: profile.ease, scrollTrigger: { trigger: section, start: "top 78%", once: true }
    });
  });

  const progress = document.querySelector(".scroll-progress");
  if (progress) gsap.to(progress, {
    scaleX: 1, ease: "none",
    scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: 0.18 }
  });

  const gallery = document.querySelector(".gallery");
  const track = gallery?.querySelector(".gallery-grid");
  if (gallery && track && track.children.length) {
    // Pinning a short gallery creates a long, visually empty scroll segment.
    // Reserve the guided desktop sequence for galleries with enough material.
    if (track.children.length >= 4 && effects.includes("kinetic_gallery")) {
      gsap.matchMedia().add("(min-width: 761px)", () => {
        track.classList.add("gallery-track");
        const animation = gsap.to(track, {
          x: () => Math.min(0, gallery.clientWidth - track.scrollWidth - 48),
          ease: "none",
          scrollTrigger: {
            trigger: gallery, start: "top top+=84",
            end: () => "+=" + Math.max(500, track.scrollWidth - gallery.clientWidth),
            pin: true, scrub: 0.75, invalidateOnRefresh: true
          }
        });
        return () => {
          animation.scrollTrigger?.kill();
          gsap.set(track, { clearProps: "transform" });
          track.classList.remove("gallery-track");
        };
      });
    }
    gsap.matchMedia().add("(max-width: 760px)", () => track.classList.add("gallery-track"));
  }

  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const box = button.getBoundingClientRect();
        gsap.to(button, { x: (event.clientX - box.left - box.width / 2) * 0.06, y: (event.clientY - box.top - box.height / 2) * 0.06, duration: 0.22 });
      });
      button.addEventListener("pointerleave", () => gsap.to(button, { x: 0, y: 0, duration: 0.35 }));
    });
    const media = document.querySelector(".hero-media");
    const photo = media?.querySelector(".hero-photo");
    if (media && photo) {
      media.addEventListener("pointermove", (event) => {
        const box = media.getBoundingClientRect();
        gsap.to(photo, { x: (event.clientX - box.left - box.width / 2) * 0.009, y: (event.clientY - box.top - box.height / 2) * 0.009, duration: 0.5 });
      });
      media.addEventListener("pointerleave", () => gsap.to(photo, { x: 0, y: 0, duration: 0.65 }));
    }
  }
})();
"""
    return "".join(
        f'<script data-motion-library="gsap-{GSAP_VERSION}">{script}</script>'
        for script in scripts
    ) + f"<script>{runtime}</script>"
