const accountBtn = document.querySelector(".account-wrapper");
const accountModal = document.querySelector(".account-modal-container");

accountBtn.addEventListener("click", () => {
    const classList = ["hidden", "flex", "top-10", "top-20"];
    for(const iterator of classList) {
        accountModal.classList.toggle(iterator);
    }
})