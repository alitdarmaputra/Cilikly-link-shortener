const connection = require("../models/mysqlConnect.js");

module.exports = async (req, res, next) => {
	try {
		await connection.query(`DELETE FROM Link_Details WHERE LinkId = ${req.params.LinkId} && UserId = ${req.session.userId}`);
		next();
	} catch(e) {
		console.log(e);
	}
}
