/**
 * WDD 131 - Cool Pics Part 2
 * - Menu toggle on small screens
 * - Window resize handling to prevent hidden menu at large sizes
 * - <dialog>-based image viewer (modal) with template function
 */

const BREAKPOINT = 1000;

// ===== Menu elements =====
const menuButton = document.querySelector('#menuButton');
const navList = document.querySelector('#mainNav');

// Keep ARIA in sync
function updateAriaExpanded() {
  if (!menuButton || !navList) return;
  const isHidden = navList.classList.contains('hide');
  menuButton.setAttribute('aria-expanded', String(!isHidden));
}

// Toggle menu visibility on small screens
function toggleMenu() {
  if (!navList) return;
  navList.classList.toggle('hide');
  updateAriaExpanded();
}

if (menuButton) {
  menuButton.addEventListener('click', toggleMenu);
}

// ===== Window resize handling =====
function handleResize() {
  if (!navList) return;
  if (window.innerWidth > BREAKPOINT) {
    // Ensure visible on large screens
    navList.classList.remove('hide');
  } else {
    // Default to hidden on small screens
    navList.classList.add('hide');
  }
  updateAriaExpanded();
}

window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);

// ===== Image viewer (modal) =====

// Template function (Rubric: Viewer Template Function)
function viewerTemplate(imgUrl, altText) {
  return `
    <div class="viewer-content">
      <img src="${imgUrl}" alt="${altText ?? ''}">
      <button class="close-viewer" aria-label="Close viewer" title="Close">&times;</button>
    </div>
  `;
}

// Gallery event delegation
const gallery = document.querySelector('.gallery');
let modal = null;

function computeFullImageSrcFromSmall(src) {
  // Swap '-sm.ext' → '-full.ext' (if pattern matches)
  // Example: norris-sm.jpeg → norris-full.jpeg
  return src.replace(/-sm(\.\w+)$/i, '-full$1');
}

function openViewer(event) {
  if (!gallery) return;
  const clickedImg = event.target.closest('img');
  if (!clickedImg || !gallery.contains(clickedImg)) return;

  const alt = clickedImg.getAttribute('alt') || '';
  const dataFull = clickedImg.getAttribute('data-full');
  const fullSrc = dataFull ? dataFull : computeFullImageSrcFromSmall(clickedImg.src);

  // Create dialog and inject template
  modal = document.createElement('dialog');
  modal.classList.add('image-viewer');
  modal.innerHTML = viewerTemplate(fullSrc, alt);
  document.body.appendChild(modal);

  // Close button
  const closeBtn = modal.querySelector('.close-viewer');
  if (closeBtn) closeBtn.addEventListener('click', closeViewer);

  // Click outside the image closes the dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeViewer();
  });

  // ESC handler (for consistent UX)
  function onEsc(e) {
    if (e.key === 'Escape') closeViewer();
  }
  document.addEventListener('keydown', onEsc);
  modal._escHandler = onEsc;

  // Show the dialog
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    // Fallback for older browsers
    modal.setAttribute('open', '');
  }
}

function closeViewer() {
  if (!modal) return;

  try {
    if (typeof modal.close === 'function') modal.close();
  } catch (_) { /* ignore */ }

  if (modal._escHandler) {
    document.removeEventListener('keydown', modal._escHandler);
    delete modal._escHandler;
  }

  modal.remove();
  modal = null;
}

if (gallery) {
  gallery.addEventListener('click', openViewer, { passive: true });
}