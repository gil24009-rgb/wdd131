const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".site-nav");

function setExpanded(isOpen) {
  menuBtn.setAttribute("aria-expanded", String(isOpen));
}

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  setExpanded(isOpen);
});

/* ensure correct state when resizing from mobile to desktop */
window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 700px)").matches) {
    nav.classList.remove("open");
    setExpanded(false);
  }
});