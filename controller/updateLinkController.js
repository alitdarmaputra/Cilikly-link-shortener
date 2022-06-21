const connection = require("../models/mysqlConnect.js");

module.exports = async (req, res, next) => {
	const {linkId, title, domain, backHalf, longUrl} = req.body;

	try {
		await connection.query(`UPDATE Link_Details SET Title="${title}", Domain="${domain}", BackHalf="${backHalf}", Long_url="${longUrl}" WHERE LinkId = ${linkId} && UserId = ${req.session.userId}`);
	
	} catch (e) {
		console.log(e);
	}
	next();
}
