const accountBtn = document.querySelector(".account-wrapper");
const accountModal = document.querySelector(".account-modal-container");
const createLinkBtn = document.querySelector(".create-link-button");
const createLinkModal = document.querySelector(".create-link-modal-container");
const closeLinkModal = document.querySelector(".create-link-modal-close");
const overlay = document.querySelector(".overlay");
const submitLinkBtn = document.querySelector(".submit-link-button");

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
});

// Submit Link
submitLinkBtn.addEventListener("click", e => { 
	const form = {
		domain: "cilikly.herokuapp.com",
		backHalf: document.getElementById("back-half").value,
		longUrl: document.querySelector(".long-url-form").value
	}

	var formBody = [];
	for (var property in form) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(form[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");

    if(form.longUrl && form.backHalf) {
        const response = fetch("/users/createLink", {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
        });  
    } 
})

