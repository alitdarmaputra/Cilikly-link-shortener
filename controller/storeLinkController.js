const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
	console.log(req.body);
    let {longUrl, domain, backHalf} = req.body;
    let UserId = req.session.userId;
    try {
        await connection.query(
            `INSERT INTO Link_Details
             (UserId, Long_url, Backhalf, Domain)
             VALUES (${UserId}, "${longUrl}", "${backHalf}", "cilikly.herokuapp.com")`
        )
		res.json({
			error: null,
			status: "success"
		});
    } catch(e) {
        console.log(e);
    }

}
