const accountBtn = document.querySelector(".account-wrapper");
const accountModal = document.querySelector(".account-modal-container");
const createLinkBtn = document.querySelector(".create-link-button");
const createLinkModal = document.querySelector(".create-link-modal-container");
const closeLinkModal = document.querySelector(".create-link-modal-close");
const overlay = document.querySelector(".overlay");
const submitLinkBtn = document.querySelector(".submit-link-button");

let activeLink = 0;

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
async function fetchLinkData(path) {
	const response = await fetch(`${path}`).then(response => response.json());
	return response;
}


function renderContent(selector, content) {
	const sideList = document.querySelector(selector);
	sideList.innerHTML = content;
}

function makeSideLink(data) {
	return `
	<div class="link-item px-11 py-3 bg-slate-200 hover:cursor-pointer" data-LinkId="${data.LinkId}">
		<h4 class="link-date text-sm text-slate-600">${data.DATE_UPDATE}</h4>
		<h3 class="link-title text-lg">${data.Title}</h3>
		<p class="font-bold link-content text-sky-700">${data.Domain}/${data.Backhalf}</p>
    </div>
	`
}

async function generateSideBar(result) {	
	renderContent(".link-list", "");

	if(!result)
		result = await fetchLinkData("/users/links");
	
	let sideBar = `<div class="flex total-link font-bold text-lg w-full pl-11"><p class="inline-block align-middle py-4">${result.data.length} Results</p></div>`	
	
	if(!result.error) {
		result.data.forEach(e => {
			e.DATE_UPDATE = new Date(e.DATE_UPDATE).toDateString();
			e.DATE_CREATE = new Date(e.DATE_CREATE).toDateString();
			sideBar += makeSideLink(e);
		});	
	}
	renderContent(".link-list", sideBar);
	generateLinkDetail();	
}

generateSideBar();

// Submit Link
submitLinkBtn.addEventListener("click", async e => { 
	e.preventDefault();
	const form = {
		title: document.getElementById("link-title-form").value,
		domain: document.getElementById("domain").value,
		backHalf: document.getElementById("back-half").value,
		longUrl: document.querySelector(".long-url-form").value
	}

	document.getElementById("link-title-form").value = "";
	document.getElementById("back-half").value = "";
	document.querySelector(".long-url-form").value = "";

	var formBody = [];
	for (var property in form) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(form[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");

    if(form.longUrl && form.backHalf && form.title) {
        const result = await fetch("/users/createLink", {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
        }).then(response => response.json());
		generateSideBar(result);  
    }
	showOverlay();
	showCreateLinkModal();
});

//Generate Link Detail

function makeLinkDetailCard(data) {
	return `
			<div class="flex w-full header-container justify-between items-center">
				<h2 class="text-slate-800 font-bold text-3xl link-detail__title mb-5">${data.Title}</h2>
				<div class="edit-link-group flex gap-2">
					<div class="edit-link-button cursor-pointer px-4 py-2 bg-slate-200 rounded-lg edit-button hover:bg-slate-300" data-LinkId="${data.LinkId}">
					<i class="fa-regular fa-pen-to-square edit-link-button"></i>
                        Edit
					</div>
					<div class="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-800 delete-link-button" data-LinkId="${data.LinkId}">Delete</div>
				</div>
			</div>
			<p class="link-detail__date mb-5">${new Date(data.DATE_UPDATE).toDateString()} by ${data.username}</p>

			<div class="flex justify-between items-center px-5 border-2 link-detail__link-wrapper h-14 rounded-lg">
				<div class="gap-5 flex items-center h-full short-link-detail">
					<i class="text-slate-300 text-xl fa-solid fa-link"></i>
					<a target="_blank" href="http://${data.Domain}/${data.Backhalf}" class="text-xl">${data.Domain}/${data.Backhalf}</a>
				</div>
                    
				<div class="flex gap-5 link-wrapper__right">
					<div class="flex copy-btn gap-2 cursor-pointer">
						<i class="text-slate-300 h-full text-xl fa-regular fa-copy"></i>
						<p>Copy</p>
						<span class="copy-alert absolute px-4 py-2 bg-slate-500 -mt-14 -ml-6 text-white hidden opacity-50">Link Copied</span>
					</div>
					<div class="flex qr-btn gap-2">
						<i class="text-slate-300 h-full text-xl fa-solid fa-qrcode"></i>
						<p>QR Code</p>
					</div>
				</div>
			</div>

			<div class="flex link-detail__redirect-wrapper mt-5 gap-3 items-center">
		  		<i class="fa-regular fa-paper-plane"></i>
	  			<div class="destination-detail">
					<h3 class="font-bold">Destination</h3>
					<a href="${data.Long_url}">${data.Long_url}</a>
				</div>
			</div>

			<div class="mt-14 total-click-container">
				<h3 class="font-bold text-3xl">${data.Click_count}</h3>
				<p>Total Clicks</p>
			</div>

	`
}

async function generateLinkDetail() {
	const linksItem = document.querySelectorAll(".link-item");
	if(!linksItem) return;	
	linksItem.forEach(function (link) {
		link.addEventListener("click", async function() {
			if(link.dataset.linkid != activeLink) {
				linksItem.forEach(link => {
					link.classList.add("bg-slate-200");
					link.classList.remove("bg-white");
				});
				
				let linkDetail = await fetchLinkData(`/users/links/${link.dataset.linkid}`);

				if(!linkDetail.error) {
					linkDetail = linkDetail.linkDetail;
					const content = makeLinkDetailCard(linkDetail[0]);
					renderContent(".link-detail", content);
					link.classList.add("bg-white");
					link.classList.remove("bg-slate-200");
					activeLink= link.dataset.linkid;
				} else {
					throw new Error(linkDetail.error);
				}
			}
		})
	})

	try {
		let firstDetail = await fetchLinkData(`/users/links/${linksItem[0].dataset.linkid}`);
		firstDetail = firstDetail.linkDetail[0];
		const firstDetailCard = makeLinkDetailCard(firstDetail)
		renderContent(".link-detail", firstDetailCard);
		linksItem[0].classList.add("bg-white");
		linksItem[0].classList.remove("bg-slate-200");
	} catch(e) {
		console.log(e);
	}
}

document.addEventListener("click", e => {
	if(e.target && e.target.classList.contains("copy-btn") || e.target.parentElement.classList.contains("copy-btn")) {
		copyLinkValue = document.querySelector(".short-link-detail a").href;
		navigator.clipboard.writeText(copyLinkValue);
		const copyAlert = document.querySelector(".copy-alert");
		copyAlert.classList.toggle("hidden");
		setTimeout(() => {
			copyAlert.classList.toggle("hidden");
		}, 500);
	}
});

const editLinkModal = document.querySelector(".edit-link-modal-container");

function showEditLinkModal(data) {
	if(data) {
		document.querySelector("#editLink-title-form").value = data.Title;
		document.querySelector("#editBack-half").value = data.Backhalf;
		document.querySelector("#editLink-longurl").value = data.Long_url;
		document.querySelector("#editLink-domain").value = data.Domain;
		document.querySelector(".submit-edit-link-button").dataset.linkid = data.LinkId;
	}
    editLinkModal.classList.toggle("-mr-72");
}

document.addEventListener("click", async e => {
	if(e.target && e.target.classList.contains("edit-link-button")) {	
		const data = await fetchLinkData(`/users/edit/${e.target.dataset.linkid}`);
		showEditLinkModal(data);
	}
})

document.addEventListener("click", e => {
	if(e.target && e.target.classList.contains("edit-link-modal-close") || e.target.parentElement.classList.contains("edit-link-modal-close")) {
		showEditLinkModal();
	}
});

const submitEditLinkBtn = document.querySelector(".submit-edit-link-button");

submitEditLinkBtn.addEventListener("click", async e => { 
	e.preventDefault();
	const form = {
		linkId: parseInt(submitEditLinkBtn.dataset.linkid),
		title: document.getElementById("editLink-title-form").value,
		domain: document.getElementById("editLink-domain"),
		backHalf: document.getElementById("editBack-half").value,
		longUrl: document.getElementById("editLink-longurl").value
	}

	var formBody = [];
	for (var property in form) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(form[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");

    if(form.longUrl && form.backHalf && form.title) {
        const result = await fetch("/users/storeEditLink", {
			method: "PUT",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody
        }).then(response => response.json());
		generateSideBar(result);  
    }
	editLinkModal.classList.toggle("-mr-72");	
});

document.addEventListener("click", async e => {
	if(e.target && e.target.classList.contains("delete-link-button") || e.target.parentElement.classList.contains("delete-link-button")) {
		const isContinue = confirm("Apakah ingin melanjutkan menghapus link ?");
		if(isContinue) {
			const newLinkData = await fetch(`/users/deleteLink/${e.target.dataset.linkid}`, {"method" : "DELETE"}).then(response => response.json());
			generateSideBar(newLinkData);
		}
	}
})
