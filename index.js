require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./web/views"));

app.use(express.static(path.resolve(__dirname + "/web/public")));
// Route
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(process.env.PORT, () => {
    console.log(`[${new Date().toLocaleString()}]: Cilikly server listen on port ${process.env.PORT}`);
});