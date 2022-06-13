const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let link = await connection.query(`SELECT * FROM Link_Details
                                       WHERE Backhalf = "${req.params.backhalf}"`);
    if(link.length != 0) {
        link = link[0];
        console.log(`(${link.LinkId}, "${req.ip}`);
        await connection.query(`INSERT INTO History (LinkId, IP) VALUES (${link.LinkId}, "${req.ip}")`);
        res.redirect(link.Long_url);
    } else {
        res.render("notfound");
    }
}