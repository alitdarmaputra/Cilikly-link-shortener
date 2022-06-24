module.exports = (req, res) => {	
	let username, password;
	const data = req.flash("data")[0];
	
	if(data != undefined) {
		if(data.username != undefined) username = data.username;

		if(data.password != undefined) password = data.password;
	}

	if(username == undefined) username = "";

	if(password == undefined) password = "";
	
	res.render("login", {
		error: req.flash("validationError"),
		username,
		password
	});
}
