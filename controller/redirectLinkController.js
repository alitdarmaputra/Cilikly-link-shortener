const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let link = await connection.query(`SELECT * FROM Link_Details
                                       WHERE Backhalf = "${req.params.backhalf}"`);
    if(link.length != 0) {
        link = link[0];
        res.redirect(link.Long_url);
    }
}