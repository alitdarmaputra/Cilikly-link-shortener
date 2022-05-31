const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let longUrl = req.body;
    let UserId = req.sessions.userId;
    try {
        await connection.query(
            `INSERT INTO link_details
             (UserId, Long_url, Short_url)
             VALUES (${UserId}, "${longUrl}", "cilikly.herokuapp.com")`
        )
    } catch(e) {
        console.log(e);
    }

}