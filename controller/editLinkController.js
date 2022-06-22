const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
	try { 
		const data = (await connection.query(`SELECT * FROM Link_Details WHERE LinkId = ${req.params.LinkId}`))[0];
		res.json(data);	
	} catch (e) { 
		console.log(e);
	}
}
