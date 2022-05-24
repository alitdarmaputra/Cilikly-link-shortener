require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

// Controllers
const homePageController = require("./controller/homepageController.js");
const loginController = require("./controller/loginController.js");
const signupController = require("./controller/signupController.js");
const storeUserController = require("./controller/storeUserController.js");
const loginUserController = require("./controller/loginUserController");
const { Session } = require("inspector");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Database connect
const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cilikly_db"
}

const connection = mysql.createConnection(db_config)
console.log(`[${new Date().toLocaleString()}]: Success conected to mysql database`);

// Route
app.get("/", homePageController);
app.get("/auth/login", loginController);
app.get("/auth/signup", signupController);
app.post("/users/signup", storeUserController);
app.post("/users/login", loginUserController);

app.listen(process.env.PORT, () => {
    console.log(`[${new Date().toLocaleString()}]: Cilikly server listen on port ${process.env.PORT}`);
});