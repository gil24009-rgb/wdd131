/**
 * Minimal setup for future Menu toggle (Part 2).
 * For Part 1, we keep the nav visible by default.
 * This simply prepares aria attributes if you choose to collapse on small screens later.
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) return;

  // Optional: If you want the nav collapsed by default on narrow screens later,
  // you can add a class like 'is-collapsed' to nav and toggle it here.
  // For Part 1, we do not hide it by default; we only wire up ARIA state.

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    // Example for Part 2:
    // nav.classList.toggle("is-collapsed");
  });
});