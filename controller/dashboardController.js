const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let user = await connection.query(`SELECT * FROM Users WHERE UserId = ${req.session.userId}`)
    user = user[0];
	const domain = process.env.APP_DOMAIN;
    res.render("dashboard", {user, domain});
}
