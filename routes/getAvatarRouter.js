var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")

/* GET users listing. */
router.get("/game/:gameId/getAvatar", async function(req, res, next) {
  let client = new Client()
  client.connect()
  let query = await client.getAvatar(req.params.gameId)

  if (query.rows.length == 0) {
    let membersQuery = await client.getMembers(req.params.gameId)

    if (membersQuery.rows.length == 0) {
      res.status(400).send("Members should be add to the game")
    }

    let avatarPlayer =
      membersQuery.rows[
        Math.floor(Math.random() * Math.floor(membersQuery.rows.length))
      ]

    await client.createAvatar(req.params.gameId, avatarPlayer.player_id)
  }

  let avatar = await client.getAvatar(req.params.gameId)

  res.render(path.join(__dirname, "../views", "home.ejs"), { avatar: avatar })
})

module.exports = router
