const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const guideModal = document.getElementById("guideModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalLower = document.getElementById("modalLower");
const modalExtra = document.getElementById("modalExtra");
const closeModalBtn = document.getElementById("closeModalBtn");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

if (navLinks) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });
  });
}

function openGuideModal(card) {
  if (!guideModal || !modalImage || !modalTitle || !modalType || !modalLower || !modalExtra) return;
  const imageEl = card.querySelector(".guide-image");
  const titleEl = card.querySelector("h3");
  const typeEl = card.querySelector(".wear-type");
  const lowerEl = card.querySelector(".lower-wear");
  const extraEl = card.querySelector(".extra-suggestion");

  if (imageEl) {
    modalImage.src = imageEl.src;
    modalImage.alt = imageEl.alt || (titleEl ? titleEl.textContent : "Guide image");
    modalImage.style.display = "block";
  } else {
    modalImage.src = "";
    modalImage.alt = "";
    modalImage.style.display = "none";
  }

  modalTitle.textContent = titleEl ? titleEl.textContent : "";
  modalType.textContent = typeEl ? typeEl.textContent : "";
  modalLower.textContent = lowerEl ? lowerEl.textContent : "";
  modalExtra.textContent = extraEl ? extraEl.textContent : "";

  guideModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeGuideModal() {
  if (!guideModal) return;
  guideModal.classList.remove("show");
  document.body.style.overflow = "auto";
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeGuideModal);
}

if (guideModal) {
  guideModal.addEventListener("click", (e) => {
    if (e.target === guideModal) closeGuideModal();
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && guideModal && guideModal.classList.contains("show")) {
    closeGuideModal();
  }
});