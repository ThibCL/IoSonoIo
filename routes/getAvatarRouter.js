var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")

/* GET users listing. */
router.get("game/:gameId/getAvatar", function(req, res, next) {
  res.render(path.join(__dirname, "../views", "creategame.ejs"))
})

module.exports = router
