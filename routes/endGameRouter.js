var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")

/* GET users listing. */
router.get("/game/:gameId/endgame", async function(req, res, next) {
  console.log("test")
  let clientG = new Client()
  let game = await clientG.getGame(req.params.gameId)

  if (game.rows.length != 1) {
    res.status(400).send("The game does not exist")
    return
  }
  let clientE = new Client()
  await clientE.endGame(req.params.gameId)

  res.render(path.join(__dirname, "../views", "home.ejs"))
})

module.exports = router
