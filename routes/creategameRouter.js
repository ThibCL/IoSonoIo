var express = require("express")
var router = express.Router()
var path = require("path")

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render(path.join(__dirname, "../views", "creategame.ejs"))
})

module.exports = router
