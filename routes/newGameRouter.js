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
      await client.disconnect()
      return
    }

    let id = newGameResp.game.id
    await client.disconnect()
    logger.info("New game created", { id: id })
    res.render(path.join(__dirname, "../public/views", "2.ejs"), { id: id })
  } catch (err) {
    await client.disconnect()
    logger.error(err.message, err)
    res.status(500).send("Unexpected error occured, please retry")
  }
})

module.exports = router
