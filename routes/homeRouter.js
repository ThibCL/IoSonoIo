var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
/* GET users listing. */

router.get("/", function(req, res, next) {
  res.render(path.join(__dirname, "../public/views", "home.ejs"))
})

module.exports = router
