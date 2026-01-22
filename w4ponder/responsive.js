const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("#primary-nav");

function toggleMenu() {
  nav.classList.toggle("hide");
  menuButton.classList.toggle("change");

  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
}

menuButton.addEventListener("click", toggleMenu);