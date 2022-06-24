const bcrypt = require("bcrypt");
const connection = require("../models/mysqlConnect");
const validator = require("validator");

module.exports = async (req, res) => {
	const error = [];
    let {email, username, password} = req.body;
	req.flash("data", req.body);

	if(email == "") error.push("Please provide email");
	if(username == "") error.push("Please provide username");
	if(password == "") error.push("Please provide password");

	if(error.length > 0) {
		req.flash("validationError", error);
		res.redirect("/auth/signup");
	} else if(!validator.isEmail(email)) {
		req.flash("validationError", "Invalid email format");
	}else {
		const userExist = await connection.query(
			`SELECT * FROM Users 
			WHERE email = "${email}" OR 
			username = "${username}";`);

		if(userExist.length != 0) {
			req.flash("validationError", "Use another email and username");
			res.redirect("/auth/signup");
		} else {
			password = await bcrypt.hash(password, 12);
			await connection.query(`
				INSERT INTO Users (email, username, password) 
				VALUES ("${email}", "${username}", "${password}")`
			);
			res.redirect("/auth/login");
		}
	}
    
}
