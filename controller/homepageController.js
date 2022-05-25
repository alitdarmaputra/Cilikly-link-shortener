module.exports = (req, res) => {
    if(req.session.userId)
        console.log(req.session.userId)
    res.render("index");
}