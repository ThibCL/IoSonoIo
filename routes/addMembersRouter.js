var express = require("express")
var router = express.Router()
var path = require("path")
var bodyParser = require("body-parser")
var Client = require("./pgClient")
var logger = require("../logger")

var jsonParser = bodyParser.urlencoded({ extended: true })

/* POST players list */
router.post("/game/:gameId/addmembers", jsonParser, async function(
  req,
  res,
  next
) {
  try {
    let client = new Client()
    await client.connect()

    let getGameResp = await client.getGame(req.params.gameId)
    if (getGameResp.error == true) {
      logger.error(getGameResp.message, req.params.gameId)
      res.status(getGameResp.status).send(getGameResp.message)
      await client.disconnect()

      return
    }

    let id = getGameResp.game.id
    let turn = getGameResp.game.turn

    console.log(req.body)

    let membersList = req.body.members
    if (membersList == undefined || membersList.length == 0) {
      logger.error("the list of members is empty", { id: id })
      res.status(400).send("The list should contains at least one player")
      await client.disconnect()
      return
    }

    //Deduplicate
    let verif = false
    membersList.forEach((value, index) => {
      if (membersList.indexOf(value) != index) {
        verif = true
        await client.disconnect()
        return
      }
    })

    if (verif) {
      logger.error("two players have the same name", { id: id })
      res.status(400).send("Two players can't have the same name")
      await client.disconnect()
      return
    }

    await client.disconnect()
    membersList.forEach(async member => {
      await client.addMember(id, member, turn)
    })
    console.info("All the members have been added", { members: membersList })

    res.render(path.join(__dirname, "../public/views", "begin.ejs"), {
      id: id
    })
  } catch (err) {
    await client.disconnect()
    logger.error(err.message, err)
    res.status(500).send("Unexpected error occured, please retry")
  }
})

module.exports = router
