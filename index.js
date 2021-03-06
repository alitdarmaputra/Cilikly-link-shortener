require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const flash = require("connect-flash");
const app = express();

// Controllers
const homePageController = require("./controller/homepageController.js");
const loginController = require("./controller/loginController.js");
const signupController = require("./controller/signupController.js");
const storeUserController = require("./controller/storeUserController.js");
const loginUserController = require("./controller/loginUserController.js");
const dashboardController = require("./controller/dashboardController.js");
const storeLinkController = require("./controller/storeLinkController.js");
const listLinkController = require("./controller/listLinksController");
const getLinkDetailController = require("./controller/getLinkDetailController");
const redirectLinkController = require("./controller/redirectLinkController.js");
const logoutController = require("./controller/logoutController.js");
const editLinkController = require("./controller/editLinkController.js");
const updateLinkController = require("./controller/updateLinkController.js");
const deleteLinkController = require("./controller/deleteLinkController.js");
// Middleware
const auth = require("./middleware/authMiddleware");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configuration to connect with mysql database
const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "cilikly_db",
    port: process.env.DB_PORT
}

// Database connect
const connection = mysql.createPool(db_config)

// Session connect to database
app.use(session({
    secret: "nyanmo cat",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({},connection)
}));

// flash
app.use(flash());

// Route
app.get("/", homePageController);
app.get("/auth/login", loginController);
app.get("/auth/signup", signupController);
app.post("/users/signup", storeUserController);
app.post("/users/login", loginUserController);
app.get("/users/dashboard", auth, dashboardController);
app.post("/users/createLink", auth, storeLinkController, listLinkController);
app.get("/users/links", auth, listLinkController);
app.get("/users/links/:LinkId", auth, getLinkDetailController);
app.get("/users/logout", auth, logoutController);
app.get("/users/edit/:LinkId", auth, editLinkController);
app.put("/users/storeEditLink", auth, updateLinkController, listLinkController);
app.delete("/users/deleteLink/:LinkId", auth, deleteLinkController, listLinkController);
app.get("/:backhalf", redirectLinkController);
app.use((req, res) => res.render("notfound"));

let port = process.env.PORT;
if(port == null || port == "") {
    port = 4000;
}

app.listen(port, () => {
    console.log(`[${new Date().toLocaleString()}]: Cilikly server listen on port ${port}`);
});
