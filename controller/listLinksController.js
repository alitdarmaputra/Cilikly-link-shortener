const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
	const links = await connection.query(`
		SELECT * FROM Link_Details
		WHERE UserId = ${req.session.userId}
	`);

	if(links.length > 0) { 
		res.json({
			data: links
		});
	} else {
		res.json({
			data: [],
			error: "No Links is Found"
		});
	}
}
