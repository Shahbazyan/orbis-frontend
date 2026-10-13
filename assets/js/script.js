/* =========================================================
   Orbis — Home page interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Navbar: scroll shadow + mobile toggle ---------- */
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navbarToggle");

  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      const open = navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Animated counters (IntersectionObserver) ---------- */
  const counters = document.querySelectorAll("[data-counter]");
  if ("IntersectionObserver" in window && counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const isFloat = !Number.isInteger(target);

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const value = target * eased;
        const formatted = isFloat
          ? value.toFixed(1)
          : Math.round(value).toLocaleString("en-US");
        el.textContent = formatted + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".feature, .step, .stat, .section-head, .cta__inner"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealIo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => revealIo.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Hero balance counter (standalone) ---------- */
  const heroAmount = document.querySelector(".hero__card-amount");
  if (heroAmount) {
    const valueEl = heroAmount.querySelector(".hero__card-value");
    const target = parseFloat(heroAmount.dataset.counter || "0");
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      if (valueEl) valueEl.textContent = value.toLocaleString("en-US");
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Smooth anchor offset for sticky navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      if (navbar && navbar.classList.contains("is-open")) {
        navbar.classList.remove("is-open");
        toggle && toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
