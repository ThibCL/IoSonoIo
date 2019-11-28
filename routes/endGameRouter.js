var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")

/* GET users listing. */
router.get("/game/:gameId/endgame", async function(req, res, next) {
  console.log("test")
  let client = new Client()
  client.connect()
  let game = await client.getGame(req.params.gameId)

  if (game.rows.length != 1) {
    res.status(400).send("The game does not exist")
    return
  }
  await client.endGame(req.params.gameId)

  res.render(path.join(__dirname, "../views", "home.ejs"))
})

module.exports = router
