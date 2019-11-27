var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var bodyParser = require("body-parser")
var dgClient = require("./dialogflowClient")
var logger = require("../logger")
var Avatar = require("./avatar")

var jsonParser = bodyParser.json()

/* GET users listing. */
router.get("/game/:gameId/play", async function(req, res, next) {
  let client = new Client()
  await client.connect()

  let gameId = req.params.gameId
  let getGameResp = await client.getGame(gameId)
  if (getGameResp.error == true) {
    logger.error(getGameResp.message, { id: gameId })
    return getGameResp
  }

  let getAvatarResp = await client.getAvatar(gameId)

  // Check if the game has already begun and if it does not, redirect to the begin endpoint
  if (getAvatarResp.rowCount == 0) {
    logger.error("The game has not begun yet", { id: gameId })
    return {
      error: true,
      status: 400,
      message: "The game has not begun yet"
    }
  }

  let avatar = getAvatarResp.rows[0]

  let getPlayerTurnResp = await client.getPlayerTurn(gameId)

  //Check if it is the turn of someOne
  if (getPlayerTurnResp.rowCount < 1) {
    res.status(500).send("Please replay a new game")
    return
  }

  let playingPlayer = getPlayerTurnResp.rows[0].name
  logger.info("It is the turn of", { palying_player: playingPlayer })

  let getActiveQuestionResp = await client.getActiveQuestion(gameId)

  //Check if there is a activated question
  if (getActiveQuestionResp.rowCount < 1) {
    res.status(500).send("Please replay a new game")
  }

  let describedPlayer = avatar.name

  let question = getActiveQuestionResp.rows[0].question.replace(
    "$name",
    describedPlayer
  )
  logger.info("The question active is", { active_question: question })

  let getAvatarValueResp = await client.getAvatarValue(gameId)
  if (getAvatarResp.rowCount == 0) {
    res.status(500).send("Please replay a new game")
  }

  let avValue = getAvatarValueResp.rows[0]
  let av = new Avatar(
    avValue.gender_id,
    avValue.eye_value,
    avValue.hair_value,
    avValue.mouth_value,
    avValue.nose_value,
    avValue.hair_tone_value,
    avValue.pupil_tone_value
  )
  logger.info("THe avatar is", { avatar: av })

  res.render(path.join(__dirname, "../views", "home.ejs"), {
    playing_player: playingPlayer,
    described_player: describedPlayer,
    question: question,
    avatar: av.url
  })
})

/* GET users listing. */
router.post("/game/:gameId/play", jsonParser, async function(req, res, next) {
  let client = new Client()
  await client.connect()

  let dgC = new dgClient("newagent-aribph")

  let body = req.body
  if (body == undefined || body.text == undefined) {
    res.status(400).send("The request must have a text in the body")
    return
  }

  let text = body.text

  let gameId = req.params.gameId
  let getGameResp = await client.getGame(gameId)
  if (getGameResp.error == true) {
    logger.error(getGameResp.message, { id: gameId })
    return getGameResp
  }

  let getAvatarResp = await client.getAvatar(gameId)

  // Check if the game has already begun and if it does not, redirect to the begin endpoint
  if (getAvatarResp.rowCount == 0) {
    logger.error("The game has not begun yet", { id: gameId })
    return {
      error: true,
      status: 400,
      message: "The game has not begun yet"
    }
  }

  let game = getGameResp.game
  let avatar = getAvatarResp.rows[0]
  logger.info("The avatar is", { avatar: avatar })

  let getActiveQuestionResp = await client.getActiveQuestion(gameId)
  if (getActiveQuestionResp.rowCount < 1) {
    res.status(500).send("Please replay a new game")
    return
  }

  let context = getActiveQuestionResp.rows[0].context
  logger.info("The context of the question is", { context: context })
  let result = await dgC.runSample(text, context)

  let getPlayerTurnRes = await client.getPlayerTurn(gameId)

  //Check if it is the turn of someOne
  if (getPlayerTurnRes.rowCount < 1) {
    res.status(500).send("Please replay a new game")
    return
  }

  // If dialogflow does not understand the response
  if (result.intent.isFallback == true) {
    logger.info("Fallback Intent")
    let playingPlayer = getPlayerTurnRes.rows[0].name
    let describedPlayer = avatar.name
    let question = getActiveQuestionResp.rows[0].question
    let response = result.fulfillmentText

    let getAvatarResp = await client.getAvatar(gameId)
    if (getAvatarResp.rowCount == 0) {
      res.status(500).send("Please replay a new game")
    }

    let avValue = getAvatarResp.rows[0]
    let av = new Avatar(
      avValue.gender_id,
      avValue.eye_value,
      avValue.hair_value,
      avValue.mouth_value,
      avValue.nose_value,
      avValue.hair_tone_value,
      avValue.pupil_tone_value
    )

    console.log(playingPlayer + ": " + question)
    res.render(path.join(__dirname, "../views", "home.ejs"), {
      response: response,
      playing_player: playingPlayer,
      described_player: describedPlayer,
      question: question,
      avatar: av.url
    })
    return
  }

  var id

  // If the gender has not been set yet
  if (context == "gender") {
    let getGenderResp = await client.getGenderId(
      result.parameters.fields[context].stringValue
    )
    if (getGenderResp.rowCount < 1) {
      res.status(500).send("Please replay a new game")
      return
    }

    id = getGenderResp.rows[0].gender_id
  } else {
    let gender = avatar.gender_id
    let getValueResp = await client.getValue(
      gender,
      context,
      result.parameters.fields[context].stringValue
    )
    if (getValueResp.rowCount < 1) {
      res
        .status(500)
        .send("Value send by dg does not coorespond with value in db")
      return
    }

    id = getValueResp.rows[0][context + "_id"]
  }

  await client.updateAvatar(gameId, context, id)

  await client.playerNextTurn(
    getPlayerTurnRes.rows[0].turn_played + 1,
    getPlayerTurnRes.rows[0].player_id
  )

  await client.desactiveQuestion(
    getActiveQuestionResp.rows[0].question_id,
    gameId
  )

  let getQuestionLeftResp = await client.getQuestionsLeft(gameId)
  if (getQuestionLeftResp.rowCount == 0) {
    res.status(200).send("The game is finished")
    return
  }

  let questionId =
    getQuestionLeftResp.rows[
      Math.floor(Math.random() * Math.floor(getQuestionLeftResp.rowCount))
    ].question_id

  await client.activeQuestion(questionId, gameId)

  let getQuestionResp = await client.getQuestion(questionId)
  if (getQuestionResp.rowCount == 0) {
    res.status(500).send("Question does not exist..")
    return
  }

  let getMembersToPlayResp = await client.getMembersToPlay(gameId, game.turn)

  // If everyone has done one turn
  if (getMembersToPlayResp.rowCount == 0) {
    await client.nextTurn(game.turn + 1, gameId)

    getMembersToPlayResp = await client.getMembersToPlay(gameId, game.turn + 1)

    // Error improbable
    if (getMembersToPlayResp.rowCount == 0) {
      res.status(500).send("Please replay a new game")
      return
    }
  }

  let playing_player =
    getMembersToPlayResp.rows[
      Math.floor(Math.random() * Math.floor(getMembersToPlayResp.rowCount))
    ]
  await client.beginPlayerTurn(playing_player.player_id)

  let response = result.fulfillmentText
  let describedPlayer = avatar.name

  let getAvatarValueResp = await client.getAvatarValue(gameId)
  if (getAvatarValueResp.rowCount == 0) {
    res.status(500).send("Please replay a new game")
  }

  let question = getQuestionResp.rows[0].question.replace(
    "$name",
    describedPlayer
  )

  let avValue = getAvatarValueResp.rows[0]
  let av = new Avatar(
    avValue.gender_id,
    avValue.eye_value,
    avValue.hair_value,
    avValue.mouth_value,
    avValue.nose_value,
    avValue.hair_tone_value,
    avValue.pupil_tone_value
  )

  console.log(playing_player.name + ": " + question)
  res.render(path.join(__dirname, "../views", "home.ejs"), {
    response: response,
    playing_player: playing_player.name,
    described_player: describedPlayer,
    question: question,
    avatar: av.url
  })
  return
})

module.exports = router

async function checkGameHasBegun(client, gameId) {
  let getGameResp = await client.getGame(gameId)
  if (getGameResp.error == true) {
    logger.error(getGameResp.message, { id: gameId })
    return getGameResp
  }

  let getAvatarResp = await client.getAvatar(gameId)

  // Check if the game has already begun and if it does not, redirect to the begin endpoint
  if (getAvatarResp.rowCount == 0) {
    logger.error("The game has not begun yet", { id: gameId })
    return {
      error: true,
      status: 400,
      message: "The game has not begun yet"
    }
  }

  return {
    error: false,
    game: getGameResp.game,
    avatar: getAvatarResp.rows[0]
  }
}
