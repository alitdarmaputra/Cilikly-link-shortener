const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let link = await connection.query(`SELECT * FROM Link_Details
                                       WHERE Backhalf = "${req.params.backhalf}"`);
    if(link.length != 0) {
        link = link[0];
        console.log(`(${link.LinkId}, "${req.ip}`);
        await connection.query(`INSERT INTO History (LinkId, IP) VALUES (${link.LinkId}, "${req.ip}")`);
		connection.query(`UPDATE FROM Link_Details SET Click_count = Click_count + 1 WHERE LinkId = ${link.linkId`);
        res.redirect(link.Long_url);
    } else {
        res.render("notfound");
    }
}
