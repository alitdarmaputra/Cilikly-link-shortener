const bcrypt = require("bcrypt");
const connection = require("../models/mysqlConnect");

module.exports = async (req, res) => {
    let {email, username, password} = req.body;

    const isNewUser = await connection.query(`SELECT * FROM Users WHERE email = "${email}" AND username = "${username}";`);

    if(!isNewUser) res.redirect("/auth/signup");

    password = await bcrypt.hash(password, 12);
    const newUser = await connection.query(`
        INSERT INTO Users (email, username, password) 
        VALUES ("${email}", "${username}", "${password}")`
    );

    res.redirect("/auth/login");
}