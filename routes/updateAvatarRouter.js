var express = require("express")
var router = express.Router()
var path = require("path")
var bodyParser = require("body-parser")
var Client = require("./pgClient")

var jsonParser = bodyParser.json()

/* GET users listing. */
router.post("/updateavatar", jsonParser, async function(req, res, next) {
  let client = new Client()
  client.connect()
  let game = await client.getGame(req.body.id)

  if (game.rows.length != 1) {
    res.status(404).send("This game does not exsit")
    return
  }

  let avatar = await client.getAvatar(req.body.id)
  let gender = avatar.rows[0].gender_id

  let idValue = await client.getValue(gender, req.body.table, req.body.name)

  if (idValue.rows.length != 1) {
    res.status(404).send("The value of the body part does not exsit")
    return
  }

  await client.updateAvatar(
    game.rows[0].id,
    req.body.table,
    idValue.rows[0][req.body.table + "_id"]
  )

  res.render(path.join(__dirname, "../views", "home.ejs"))
})

module.exports = router
