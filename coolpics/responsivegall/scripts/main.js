const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog");
const modalImage = modal.querySelector("img");
const closeButton = modal.querySelector(".close-viewer");

gallery.addEventListener("click", openModal);

function openModal(e) {
  // Only react if an image was clicked (not the section, not the figure)
  const img = e.target.closest("img");
  if (!img) return;

  // Convert thumbnail path to large image path using .replace()
  // Example: images/book-sm.jpg -> images/book.jpg
  const largeSrc = img.getAttribute("src").replace("-sm", "");

  modalImage.src = largeSrc;
  modalImage.alt = img.alt;

  // Show modal
  modal.showModal();
}

closeButton.addEventListener("click", () => {
  modal.close();
});

// Close modal if clicking outside the image area
modal.addEventListener("click", (event) => {
  const clickedImg = event.target.closest("img");
  const clickedClose = event.target.closest(".close-viewer");

  // If user clicked the overlay (dialog itself), close.
  // If user clicked the image or close button, do nothing here.
  if (!clickedImg && !clickedClose) {
    modal.close();
  }
});

// Optional cleanup after close
modal.addEventListener("close", () => {
  modalImage.src = "";
  modalImage.alt = "";
});