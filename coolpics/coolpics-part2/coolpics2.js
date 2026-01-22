const MENU_BREAKPOINT = 900;

const menuButton = document.querySelector("#menuButton");
const nav = document.querySelector("#primary-nav");
const gallery = document.querySelector(".gallery");
const viewerRoot = document.querySelector("#viewerRoot");

function setMenuState(open) {
  if (!menuButton || !nav) return;

  nav.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
}

function shouldUseDesktopMenu() {
  return window.matchMedia(`(min-width: ${MENU_BREAKPOINT}px)`).matches;
}

function syncMenuToViewport() {
  if (!menuButton || !nav) return;

  if (shouldUseDesktopMenu()) {
    setMenuState(true);
  } else {
    setMenuState(false);
  }
}

function onMenuButtonClick() {
  if (!menuButton || !nav) return;

  const isOpen = nav.classList.contains("is-open");
  setMenuState(!isOpen);
}

function viewerTemplate(imgUrl, altText) {
  const safeAlt = altText || "Expanded image";
  return `
    <div class="viewer-overlay" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div class="viewer-dialog">
        <button class="viewer-close" type="button" aria-label="Close image viewer">X</button>
        <img class="viewer-image" src="${imgUrl}" alt="${safeAlt}">
      </div>
    </div>
  `;
}

function openViewer(imgUrl, altText) {
  if (!viewerRoot) return;

  viewerRoot.innerHTML = viewerTemplate(imgUrl, altText);
  viewerRoot.hidden = false;

  const overlay = viewerRoot.querySelector(".viewer-overlay");
  const closeBtn = viewerRoot.querySelector(".viewer-close");

  if (closeBtn) closeBtn.focus();

  function closeViewer() {
    viewerRoot.hidden = true;
    viewerRoot.innerHTML = "";
    document.removeEventListener("keydown", onKeyDown, true);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closeViewer();
  }

  function onOverlayClick(e) {
    if (e.target === overlay) closeViewer();
  }

  document.addEventListener("keydown", onKeyDown, true);

  if (overlay) overlay.addEventListener("click", onOverlayClick);
  if (closeBtn) closeBtn.addEventListener("click", closeViewer);
}

function getFullImageUrl(imgEl) {
  const fromData = imgEl.getAttribute("data-full");
  if (fromData) return fromData;
  return imgEl.getAttribute("src");
}

function onGalleryClick(e) {
  const img = e.target.closest("img");
  if (!img || !gallery.contains(img)) return;

  const fullUrl = getFullImageUrl(img);
  const alt = img.getAttribute("alt") || "";
  openViewer(fullUrl, alt);
}

window.addEventListener("resize", () => {
  syncMenuToViewport();
});

if (menuButton) {
  menuButton.addEventListener("click", onMenuButtonClick);
}

if (gallery) {
  gallery.addEventListener("click", onGalleryClick);
}

syncMenuToViewport();