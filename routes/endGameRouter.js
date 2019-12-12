var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")

/* GET users listing. */
router.get("/game/:gameId/endgame", async function(req, res, next) {
  let client = new Client()
  client.connect()
  let game = await client.getGame(req.params.gameId)

  if (game.error == true) {
    res.status(400).send("The game does not exist")
    return
  }
  await client.endGame(game.game.id)

  res.render(path.join(__dirname, "../public/views", "home.ejs"))
})

module.exports = router
