const connection = require("../models/mysqlConnect");

module.exports = async (req, res, next) => {
    let {longUrl, domain, title, backHalf} = req.body;
	console.log(domain);
    let UserId = req.session.userId;
    try {
        await connection.query(
            `INSERT INTO Link_Details
             (UserId, Long_url, Title, Backhalf, Domain)
             VALUES (${UserId}, "${longUrl}", "${title}", "${backHalf}", "${domain}")`
        )
		next();
    } catch(e) {
        console.log(e);
    }
}
