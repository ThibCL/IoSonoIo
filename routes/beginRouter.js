var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var logger = require("../logger")

router.get("/game/:gameId/begin", async function(req, res, next) {
  let client = new Client()
  await client.connect()

  let gameId = req.params.gameId
  let getGameResp = await client.getGame(gameId)
  if (getGameResp.error == true) {
    logger.error(getGameResp.message, { id: gameId })
    res.status(getGameResp.status).send(getGameResp.message)
    return
  }

  let getAvatarResp = await client.getAvatar(gameId)
  if (getAvatarResp.rowCount != 0) {
    res.redirect("/game/" + gameId + "/play")
    return
  }

  //Choose the player to describe
  let getMembersResp = await client.getMembers(gameId)
  if (getMembersResp.rowCount == 0) {
    logger.error("No players have been added to the game", { id: gameId })
    res.status(400).send("No players have been added to the game")
  }

  let playerDescribed =
    getMembersResp.rows[
      Math.floor(Math.random() * Math.floor(getMembersResp.rowCount))
    ]

  let playingPlayer =
    getMembersResp.rows[
      Math.floor(Math.random() * Math.floor(getMembersResp.rowCount))
    ]

  await client.createAvatar(gameId, playerDescribed.player_id)
  logger.info("The avatar has been created", {
    id: gameId,
    player_described: playerDescribed
  })

  await client.beginPlayerTurn(playingPlayer.player_id)
  logger.info("The turn of the playing player has begun", {
    id: gameId,
    playing_player: playingPlayer
  })

  await client.nextTurn(1, gameId)
  logger.info("The first turn of the game has begun", {
    id: gameId
  })

  let getQuestionResp = await client.getQuestionId("gender")
  if (getQuestionResp.rowCount < 1) {
    logger.error("Question not found", { id: gameId, question: "gender" })
    res.status(500).send("Question on the gender not found")
    return
  }

  let question = getQuestionResp.rows[0].question.replace(
    "$name",
    playerDescribed.name
  )
  await client.activeQuestion(getQuestionResp.rows[0].question_id, gameId)
  logger.info("The question is now active", {
    id: gameId,
    question: getQuestionResp.rows[0]
  })

  res.render(path.join(__dirname, "../views", "home.ejs"), {
    player_described: playerDescribed.name,
    playing_player: playingPlayer,
    question: question,
    avatar_url: "url"
  })
})

module.exports = router
