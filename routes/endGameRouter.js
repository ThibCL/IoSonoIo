var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var BadRequestError = require("../error")

/* GET users listing. */
router.get("/game/:gameId/endgame", async function(req, res, next) {
  try {
    let client = new Client()
    await client.getGame(req.params.gameId)

    await client.endGame(req.params.gameId)

    res.render(path.join(__dirname, "../public/views", "home.ejs"))
  } catch (e) {
    if (e instanceof BadRequestError) {
      res
        .status(400)
        .render(path.join(__dirname, "../public/views", "error.ejs"), {
          error: e.message
        })
    }

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "error.ejs"), {
        error: e.message
      })
  }
})

module.exports = router
