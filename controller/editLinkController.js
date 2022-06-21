const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
	const data = (await connection.query(`SELECT * FROM Link_Details WHERE LinkId = ${req.params.LinkId}`))[0];
	res.json(data);	
}
