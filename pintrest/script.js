const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const guideModal = document.getElementById("guideModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalLower = document.getElementById("modalLower");
const modalExtra = document.getElementById("modalExtra");
const closeModalBtn = document.getElementById("closeModalBtn");

let lastFocusedTrigger = null;

const getFocusableElements = (container) => {
  if (!container) return [];
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null);
};

if (navToggle && navLinks) {
  navToggle.setAttribute("aria-controls", "navLinks");
  navToggle.setAttribute("aria-expanded", "false");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

function openGuideModal(card) {
  if (!guideModal || !modalImage || !modalTitle || !modalType || !modalLower || !modalExtra || !card) return;

  const imageEl = card.querySelector(".guide-image");
  const titleEl = card.querySelector("h3");
  const typeEl = card.querySelector(".wear-type");
  const lowerEl = card.querySelector(".lower-wear");
  const extraEl = card.querySelector(".extra-suggestion");

  lastFocusedTrigger = document.activeElement;

  modalImage.src = imageEl ? imageEl.src : "";
  modalImage.alt = imageEl ? imageEl.alt || "Guide image" : "Guide image";
  modalTitle.textContent = titleEl ? titleEl.textContent.trim() : "";
  modalType.textContent = typeEl ? typeEl.textContent.trim() : "";
  modalLower.textContent = lowerEl ? lowerEl.textContent.trim() : "";
  modalExtra.textContent = extraEl ? extraEl.textContent.trim() : "";

  guideModal.classList.add("show");
  document.body.style.overflow = "hidden";
  guideModal.setAttribute("aria-hidden", "false");

  if (closeModalBtn) {
    closeModalBtn.focus();
  }
}

function closeGuideModal() {
  if (!guideModal) return;

  guideModal.classList.remove("show");
  guideModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
    lastFocusedTrigger.focus();
  }
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeGuideModal);
}

if (guideModal) {
  guideModal.setAttribute("aria-hidden", "true");

  guideModal.addEventListener("click", (e) => {
    const modalPanel = guideModal.querySelector(".guide-modal-panel");
    if (modalPanel && !modalPanel.contains(e.target)) {
      closeGuideModal();
    }
  });
}

window.addEventListener("keydown", (e) => {
  if (!guideModal || !guideModal.classList.contains("show")) return;

  if (e.key === "Escape") {
    closeGuideModal();
    return;
  }

  if (e.key === "Tab") {
    const focusable = getFocusableElements(guideModal);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
