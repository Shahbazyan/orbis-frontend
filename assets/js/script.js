/* =========================================================
   ORBIS — Home page interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Hero slider ---------- */
  const slider = document.getElementById("heroSlider");
  if (slider) {
    const slides = slider.querySelectorAll(".hero__slide");
    const dots = slider.querySelectorAll(".hero__dot");
    let current = 0;
    let timer;

    const goTo = (index) => {
      slides[current].classList.remove("hero__slide--active");
      dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("hero__slide--active");
      dots[current].classList.add("is-active");
    };

    const start = () => {
      timer = setInterval(() => goTo(current + 1), 6000);
    };
    const stop = () => clearInterval(timer);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        stop();
        goTo(i);
        start();
      });
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    start();
  }

  /* ---------- Product tabs (visual only) ---------- */
  document.querySelectorAll(".section__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const parent = tab.closest(".section__tabs");
      if (!parent) return;
      parent.querySelectorAll(".section__tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
    });
  });

  /* ---------- Favorite toggle ---------- */
  document.querySelectorAll(".product__fav").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle("is-active");
    });
  });

  /* ---------- Catalog button (visual only) ---------- */
  const catalogBtn = document.getElementById("catalogBtn");
  if (catalogBtn) {
    catalogBtn.addEventListener("click", () => {
      catalogBtn.classList.toggle("is-open");
    });
  }

  /* ---------- Mobile burger ---------- */
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  if (burger && header) {
    burger.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Search focus ---------- */
  const searchInput = document.querySelector(".header__search-input");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (q) {
          // Demo only — no backend
          console.log("[ORBIS] Поиск:", q);
          alert("Демо-режим: поиск по запросу «" + q + "»");
        }
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".cat, .product, .ws-card, .gb-card, .benefit, .factory-card, .section__head"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
