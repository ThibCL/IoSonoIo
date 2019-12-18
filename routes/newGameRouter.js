var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var logger = require("../logger")
var Avatar = require("./avatar")
var BadRequestError = require("../error")

/* GET users listing. */
router.get("/newGame", async function(req, res, next) {
  try {
    let client = new Client()

    let newGameResp = await client.newGame()

    let id = newGameResp.id

    logger.info("New game created", { id: id })
    res.render(path.join(__dirname, "../public/views", "2.ejs"), { id: id })
  } catch (err) {
    logger.error(err.message, err)

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "error.ejs"), {
        error: "Unexpected error, please try again"
      })
  }
})

module.exports = router
