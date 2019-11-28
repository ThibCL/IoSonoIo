var express = require("express")
var router = express.Router()
var path = require("path")
var bodyParser = require("body-parser")
var Client = require("./pgClient")

var jsonParser = bodyParser.json()

/* POST players list */
router.post("/game/:gameId/addmembers", jsonParser, async function(
  req,
  res,
  next
) {
  let client = new Client()
  client.connect()
  let query = await client.getGame(req.params.gameId)

  if (query.rows.length != 1) {
    res.status(400).send("The game does not exist")
    return
  }

  let id = query.rows[0].id
  let turn = query.rows[0].turn

  let list = req.body.members
  if (list == undefined || list.length == 0) {
    res.status(400).send("The list should contains at least one player")
    return
  }

  //Deduplicate
  let verif = false
  list.forEach((value, index) => {
    if (list.indexOf(value) != index) {
      verif = true
      return
    }
  })

  if (verif) {
    res.status(400).send("Two players can't have the same name")
    return
  }

  list.forEach(member => {
    client.addMember(id, member, turn)
  })

  res.render(path.join(__dirname, "../views", "home.ejs"), {
    id: query.rows[0].id
  })
})

module.exports = router
