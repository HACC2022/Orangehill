module.exports = app => {
    const urls = require("../controllers/url.controller")

    let router = require("express").Router();

    router.post("/", urls.create);
    router.get("/:short", urls.findOne)

    app.use("/", router)
}