var express = require("express")
var router = express.Router()
var path = require("path")
var bodyParser = require("body-parser")
var Client = require("./pgClient")

var jsonParser = bodyParser.json()

/* GET users listing. */
router.post("/updateavatar", jsonParser, async function(req, res, next) {
  let clientG = new Client()
  let game = clientG.getGame(req.body.id)

  if (game.rows.length != 1) {
    res.status(404).send("This game does not exsit")
    return
  }

  let clientB = new Client()
  let idValue = await clientB.getValue(req.body.table, req.body.name)

  if (idValue.rows.length != 1) {
    res.status(404).send("The value of the body part does not exsit")
    return
  }

  let clientS = new Client()
  await clientS.updateAvatar(req.body.table, idValue.rows[0])

  res.render(path.join(__dirname, "../views", "home.ejs"))
})

module.exports = router
