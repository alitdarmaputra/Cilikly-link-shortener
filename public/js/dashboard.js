const accountBtn = document.querySelector(".account-wrapper");
const accountModal = document.querySelector(".account-modal-container");
const createLinkBtn = document.querySelector(".create-link-button");
const createLinkModal = document.querySelector(".create-link-modal-container");
const closeLinkModal = document.querySelector(".create-link-modal-close");
const overlay = document.querySelector(".overlay");

function showOverlay() {
    overlay.classList.toggle("hidden");
    overlay.classList.toggle("opacity-0");
    overlay.classList.toggle("opacity-70");
}

function showCreateLinkModal() {
    createLinkModal.classList.toggle("-mr-72");
}

function showAccountModal() {
    const classList = ["hidden", "flex", "top-20"];
    for(const iterator of classList) {
        accountModal.classList.toggle(iterator);
    }
}

// Accoount Modal
accountBtn.addEventListener("click", () => {
    showAccountModal();
});

// Create Link Modal
createLinkBtn.addEventListener("click", () => {
    showCreateLinkModal();
    showOverlay();
});

closeLinkModal.addEventListener("click", () => {
    showCreateLinkModal();
    showOverlay();
});

// Overlay
overlay.addEventListener("click", e => {
    showCreateLinkModal();
    showOverlay();
})