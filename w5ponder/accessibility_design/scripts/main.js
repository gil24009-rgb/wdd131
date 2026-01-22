const navToggle = document.querySelector(".nav_toggle");
const siteNav = document.querySelector("#site_nav");
const yearEl = document.querySelector("#year");

function setYear() {
  const now = new Date();
  if (yearEl) yearEl.textContent = String(now.getFullYear());
}

function setMenuState(isOpen) {
  if (!navToggle || !siteNav) return;

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  siteNav.dataset.open = isOpen ? "true" : "false";
}

function initMenu() {
  if (!navToggle || !siteNav) return;

  setMenuState(false);

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!expanded);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (expanded) setMenuState(false);
  });
}

setYear();
initMenu();