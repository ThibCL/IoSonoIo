var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var logger = require("../logger")
var Avatar = require("./avatar")

/* GET users listing. */
router.get("/newGame", async function(req, res, next) {
  try {
    let client = new Client()
    await client.connect()

    let newGameResp = await client.newGame()
    if (newGameResp.error == true) {
      logger.error(newGameResp.message)
      res.status(newGameResp.status).send(newGameResp.message)
      return
    }

    let id = newGameResp.game.id
    logger.info("New game created", { id: id })
    res.render(path.join(__dirname, "../views", "home.ejs"), { id: id })
  } catch (err) {
    logger.error(err.message, err)
    res.status(500).send("Unexpected error occured, please retry")
  }
})

module.exports = router
