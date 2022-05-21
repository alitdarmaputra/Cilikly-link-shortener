require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql2");
const app = express();
const { env } = require("process");

app.set("view engine", "ejs");
app.set("views", path.resolve("./web/views"));
app.use(express.static(path.resolve(__dirname + "/web/public")));

// Database connect
const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cilickly_db"
}

const connection = mysql.createConnection(db_config)

// Controllers
const homePageController = require("./controller/homepageController.js");
const loginController = require("./controller/loginController.js");
const signupController = require("./controller/signupController.js");
// Route
app.get("/", homePageController);
app.get("/login", loginController);
app.get("/signup", signupController);

app.listen(process.env.PORT, () => {
    console.log(`[${new Date().toLocaleString()}]: Cilikly server listen on port ${process.env.PORT}`);
});