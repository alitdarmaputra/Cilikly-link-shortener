const bcrypt = require("bcrypt");
const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    const {username, password} = req.body;

    try {
        const rows = await connection.query(`SELECT * FROM Users WHERE username = "${username}"`);

        if(rows) {
            const isMatch = await bcrypt.compare(password, rows[0].password);
            if(isMatch) {
                req.session.userId = rows[0].UserId;
                res.redirect("/");
            } else {
                res.redirect("/auth/login");
            }
        } else {
            res.redirect("/auth/login");
        }
    } catch(e) {
        console.log(e);
    }
}