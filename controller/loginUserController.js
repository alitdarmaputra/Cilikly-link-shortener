const bcrypt = require("bcrypt");
const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    const {username, password} = req.body;
	const error = [];
	if(username == "") {
		error.push("Username is required");
	}

	if(password == "") {
		error.push("Password is required");
	} 

	req.flash("data", req.body);
	
	if(error.length > 0) {
		req.flash("validationError", error);
		res.redirect("/auth/login");
	} else {
		try {
			const rows = await connection.query(`SELECT * FROM Users WHERE username = "${username}"`);

			if(rows.length != 0) {
				const isMatch = await bcrypt.compare(password, rows[0].password);

				if(isMatch) {
					req.session.userId = rows[0].UserId;
					res.redirect("/users/dashboard");
				} else {
					error.push("Invalid username and password");
					req.flash("validationError", error);
					res.redirect("/auth/login");
				}
			} else {
				error.push("Invalid username and password");
				req.flash("validationError", error);
				res.redirect("/auth/login");
			}
		} catch(e) {
			console.log(e);
		}
	}
}
