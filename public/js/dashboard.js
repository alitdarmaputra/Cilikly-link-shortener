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

// Ger Link Data
async function fetchLinkData() {
	const response = await fetch("/users/list").then(response => response.json());
	return response;
}


function renderContent(selector, content) {
	const sideList = document.querySelector(selector);
	sideList.innerHTML = content;
}

function makeSideLink(data) {
	return `
	<div class="link-item px-11 py-3 bg-slate-200">
		<h4 class="link-date text-sm text-slate-600">${data.DATE_UPDATE}</h4>
		<h3 class="link-title text-lg">${data.Title}</h3>
		<p class="font-bold link-content text-sky-700">${data.Domain}/${data.Backhalf}</p>
    </div>
	`
}

async function generateSideBar() {	
	renderContent(".link-list", "");
	const result = await fetchLinkData();
	if(!result.error) {
		let sideBar = `<div class="flex total-link font-bold text-lg w-full pl-11"><p class="inline-block align-middle py-4">${result.data.length} Results</p></div>`	
		result.data.forEach(e => {
			e.DATE_UPDATE = new Date(e.DATE_UPDATE).toDateString();
			e.DATE_CREATE = new Date(e.DATE_CREATE).toDateString();
			sideBar += makeSideLink(e);
		});
		renderContent(".link-list", sideBar);
	}
}

generateSideBar();



// Submit Link
submitLinkBtn.addEventListener("click", e => { 
	e.preventDefault();
	const form = {
		title: document.getElementById("link-title-form").value,
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

    if(form.longUrl && form.backHalf && form.title) {
        const response = fetch("/users/createLink", {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
        });  
    }
	showOverlay();
	showCreateLinkModal();
	generateSideBar();
});



