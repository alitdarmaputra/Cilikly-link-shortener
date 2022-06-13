const mysql = require("mysql2");

const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cilikly_db",
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

async function query(sql) {
    try{
        const pool = mysql.createPool(db_config);
        const promisePool = pool.promise(); 
        const [results, ] = await promisePool.query(sql);
        return results;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    query
}
