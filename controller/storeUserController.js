const bcrypt = require("bcrypt");
const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let {email, username, password} = req.body;

    const userExist = await connection.query(
        `SELECT * FROM Users 
        WHERE email = "${email}" OR 
        username = "${username}";`);

    if(userExist.length != 0) {
        res.redirect("/auth/signup");
    } else {
        password = await bcrypt.hash(password, 12);
        await connection.query(`
            INSERT INTO Users (email, username, password) 
            VALUES ("${email}", "${username}", "${password}")`
        );
		res.redirect("/auth/login");
    }
}
