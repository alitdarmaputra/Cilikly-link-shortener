module.exports = (req, res) => {
	let email, username, password;
	
	if(req.flash("data")[0] != undefined) {
		email, username, password = req.flash("data")[0];
	}

	if(username == undefined) username = "";
	if(email == undefined) email = "";
	if(password == undefined) password = "";

	res.render("signup", {
		error: req.flash("validationError"),
		email, username, password
	});
};
