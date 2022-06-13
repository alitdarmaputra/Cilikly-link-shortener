const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
	try {
		const linkDetail = await connection.query(`
			SELECT LinkId, UserId, username, Long_url, Title, Domain, Backhalf, Click_count, ld.DATE_UPDATE 
			FROM Link_Details ld 
			INNER JOIN Users USING (UserId)
			WHERE LinkId = ${req.params.LinkId}`);
		if(linkDetail.length > 0) {
			if(linkDetail[0].UserId == req.session.userId) {
				res.json({linkDetail});
			} else {
				res.json({error: "Access declined"});
			}
		} else {
			res.JSON({
				error: "Link is not found"
			})
		}
	} catch(e) {
		console.log(e);
	}
	
	
}
