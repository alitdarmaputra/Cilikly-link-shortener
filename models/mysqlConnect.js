const mysql = require("mysql2/promise");

const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cilikly_db",
    port: process.env.DB_PORT
}

async function query(sql, params) {
    try{
        const connection = await mysql.createConnection(db_config);
        const [results, ] = await connection.execute(sql, params);
        return results;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    query
}
