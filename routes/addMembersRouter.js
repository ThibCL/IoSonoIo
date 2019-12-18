var express = require("express")
var router = express.Router()
var path = require("path")
var bodyParser = require("body-parser")
var Client = require("./pgClient")
var logger = require("../logger")
var BadRequestError = require("../error")

var jsonParser = bodyParser.urlencoded({ extended: true })

/* POST players list */
router.post("/game/:gameId/addmembers", jsonParser, async function(
  req,
  res,
  next
) {
  try {
    let client = new Client()

    let getGameResp = await client.getGame(req.params.gameId)
    let id = getGameResp.id
    let turn = getGameResp.turn

    let membersList = req.body.members
    if (membersList == undefined || membersList.length == 0) {
      logger.error("the list of members is empty", { id: id })
      throw new BadRequestError("The list of members should not be empty")
    }

    //Verif that there are not two time the same name
    let verif = false
    membersList.forEach((value, index) => {
      if (membersList.indexOf(value) != index) {
        verif = true
        return
      }
    })

    if (verif) {
      logger.error("two players have the same name", { id: id })
      throw new BadRequestError("You can't add two player with the same name")
    }

    membersList.forEach(async member => {
      await client.addMember(id, member, turn)
    })
    logger.info("All the members have been added", { members: membersList })

    res.render(path.join(__dirname, "../public/views", "begin.ejs"), {
      id: id
    })
  } catch (err) {
    logger.error(err.message, err)
    if (err instanceof BadRequestError) {
      res
        .status(400)
        .render(path.join(__dirname, "../public/views", "begin.ejs"), {
          error: err.message
        })
    }

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "begin.ejs"), {
        error: err.message
      })
  }
})

module.exports = router
