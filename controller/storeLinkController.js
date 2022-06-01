const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
	console.log(req.body);
    let {longUrl, domain, title, backHalf} = req.body;
    let UserId = req.session.userId;
    try {
        await connection.query(
            `INSERT INTO Link_Details
             (UserId, Long_url, Title, Backhalf, Domain)
             VALUES (${UserId}, "${longUrl}", "${title}", "${backHalf}", "cilikly.herokuapp.com")`
        )
		res.json({
			error: null,
			status: "success"
		});
    } catch(e) {
        console.log(e);
    }

}
