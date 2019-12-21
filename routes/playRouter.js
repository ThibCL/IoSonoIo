var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var bodyParser = require("body-parser")
var dgClient = require("./dialogflowClient")
var logger = require("../logger")
var Avatar = require("./avatar")
var BadRequestError = require("../error")

var jsonParser = bodyParser.urlencoded({ extended: true })

/* GET users listing. */
router.get("/game/:gameId/play", async function(req, res, next) {
  try {
    let client = new Client()

    let gameId = req.params.gameId
    await client.getGame(gameId)

    let getAvatarResp
    try {
      getAvatarResp = await client.getAvatar(gameId)
    } catch (err) {
      if (err instanceof BadRequestError) {
        res.redirect("/game/" + gameId + "/begin")
        return
      }

      throw err
    }

    let getPlayerTurnResp = await client.getPlayerTurn(gameId)

    let playingPlayer = getPlayerTurnResp.name
    logger.info("It is the turn of", { palying_player: playingPlayer })

    let describedPlayer = getAvatarResp.name
    let getActiveQuestionResp = await client.getActiveQuestion(gameId)

    var question
    if (getActiveQuestionResp.waiting_confirmation == false) {
      question = getActiveQuestionResp.question.replace(
        /Described/g,
        describedPlayer
      )
      question = question.replace(/User/g, playingPlayer)
      logger.info("The question active is", { active_question: question })
    } else {
      let context = getActiveQuestionResp.context
      let component = await client.getIdiomaticAnswer(
        context,
        getAvatarResp[context + "_id"]
      )
      question =
        playingPlayer +
        ", you said: " +
        component.idomatic_answer.replace(/Name/g, component.name) +
        ". Is what you want?"
    }

    let getAvatarValueResp = await client.getAvatarValue(gameId)

    let av = new Avatar(
      getAvatarValueResp.gender_id,
      getAvatarValueResp.eye_value,
      getAvatarValueResp.hair_value,
      getAvatarValueResp.mouth_value,
      getAvatarValueResp.nose_value,
      getAvatarValueResp.hair_tone_value,
      getAvatarValueResp.pupil_tone_value
    )
    logger.info("The avatar is", { avatar: av })

    res.render(path.join(__dirname, "../public/views", "3.ejs"), {
      id: gameId,
      response: "",
      playing_player: playingPlayer,
      described_player: describedPlayer,
      question: question,
      avatar: av.url,
      end: false
    })
  } catch (err) {
    if (err instanceof BadRequestError) {
      res
        .status(400)
        .render(path.join(__dirname, "../public/views", "error.ejs"), {
          error: err.message
        })
    }

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "error.ejs"), {
        error: err.message
      })
  }
})

/* Post users listing. */
router.post("/game/:gameId/play", jsonParser, async function(req, res, next) {
  try {
    let client = new Client()
    let dgC = new dgClient("buddytesting-mqohsv")

    let body = req.body
    if (body == undefined || body.text == undefined) {
      throw new BadRequestError("The body of the text is empty")
    }

    let text = body.text

    let gameId = req.params.gameId
    let getGameResp = await client.getGame(gameId)

    let getAvatarResp
    try {
      getAvatarResp = await client.getAvatar(gameId)
    } catch (err) {
      if (err instanceof BadRequestError) {
        res.redirect("/game/" + gameId + "/begin")
        return
      }

      throw err
    }
    logger.info("The avatar is", { avatar: getAvatarResp })

    let describedPlayer = getAvatarResp.name

    let getActiveQuestionResp = await client.getActiveQuestion(gameId)
    let context = getActiveQuestionResp.context
    logger.info("The context of the question is", { context: context })

    let getPlayerTurnRes = await client.getPlayerTurn(gameId)
    let playingPlayer = getPlayerTurnRes.name

    if (getActiveQuestionResp.waiting_confirmation == false) {
      let result = await dgC.runSample(text, context)
      logger.info(result)

      // If dialogflow does not understand the response
      if (result.intent.isFallback == true) {
        logger.info("Fallback Intent")

        let question = getActiveQuestionResp.question
        question = question.replace(/Described/g, describedPlayer)
        question = question.replace(/User/g, playingPlayer)
        let response = result.fulfillmentText

        let getAvatarValueResp = await client.getAvatarValue(gameId)

        let av = new Avatar(
          getAvatarValueResp.gender_id,
          getAvatarValueResp.eye_value,
          getAvatarValueResp.hair_value,
          getAvatarValueResp.mouth_value,
          getAvatarValueResp.nose_value,
          getAvatarValueResp.hair_tone_value,
          getAvatarValueResp.pupil_tone_value
        )

        res.render(path.join(__dirname, "../public/views", "3.ejs"), {
          id: gameId,
          response: response,
          playing_player: playingPlayer,
          described_player: getAvatarResp.name,
          question: question,
          avatar: av.url,
          end: false
        })
        return
      }

      var id

      // If the gender has not been set yet
      if (context == "gender") {
        let getGenderResp = await client.getGenderId(
          result.parameters.fields[context].stringValue
        )

        id = getGenderResp.gender_id
      } else {
        let gender = getAvatarResp.gender_id
        let getValueResp = await client.getValue(
          gender,
          context,
          result.parameters.fields[context].stringValue
        )

        id = getValueResp[context + "_id"]
      }

      await client.updateAvatar(gameId, context, id)
      await client.holdForConfirmation(
        gameId,
        getActiveQuestionResp.question_id
      )

      let getAvatarValueResp = await client.getAvatarValue(gameId)

      let av = new Avatar(
        getAvatarValueResp.gender_id,
        getAvatarValueResp.eye_value,
        getAvatarValueResp.hair_value,
        getAvatarValueResp.mouth_value,
        getAvatarValueResp.nose_value,
        getAvatarValueResp.hair_tone_value,
        getAvatarValueResp.pupil_tone_value
      )

      let response = result.fulfillmentText
      response = response.replace(/Described/g, describedPlayer)
      response = response.replace(/User/g, playingPlayer)

      res.render(path.join(__dirname, "../public/views", "3.ejs"), {
        id: gameId,
        response: response,
        playing_player: playingPlayer,
        described_player: getAvatarResp.name,
        question: "",
        avatar: av.url,
        end: false
      })
      return
    } else {
      /*let result = await dgC.runSample(text, "confirmation")

      // If dialogflow does not understand the response
      if (result.intent.isFallback == true) {
        logger.info("Fallback Intent")
        logger.info(result)

        component = await client.getIdiomaticAnswer(
          context,
          getAvatarResp[context + "_id"]
        )*/
      if (text.includes("yes") || text.includes("Yes")) {
        await client.playerNextTurn(
          getPlayerTurnRes.turn_played + 1,
          getPlayerTurnRes.player_id
        )

        await client.desactiveQuestion(
          getActiveQuestionResp.question_id,
          gameId
        )

        let getAvatarValueResp = await client.getAvatarValue(gameId)

        let av = new Avatar(
          getAvatarValueResp.gender_id,
          getAvatarValueResp.eye_value,
          getAvatarValueResp.hair_value,
          getAvatarValueResp.mouth_value,
          getAvatarValueResp.nose_value,
          getAvatarValueResp.hair_tone_value,
          getAvatarValueResp.pupil_tone_value
        )

        let getQuestionLeftResp = await client.getQuestionsLeft(
          gameId,
          getAvatarValueResp.gender_id
        )
        if (getQuestionLeftResp.length == 0) {
          res.render(path.join(__dirname, "../public/views", "3.ejs"), {
            id: gameId,
            response: "cool",
            playing_player: "",
            described_player: "",
            question: "Well done the game is finish",
            avatar: av.url,
            end: true
          })
          return
        }

        let questionId =
          getQuestionLeftResp[
            Math.floor(Math.random() * Math.floor(getQuestionLeftResp.length))
          ].question_id

        await client.activeQuestion(questionId, gameId)

        let getQuestionResp = await client.getQuestion(questionId)

        let getMembersToPlayResp = await client.getMembersToPlay(
          gameId,
          getGameResp.turn
        )

        // If everyone has done one turn
        if (getMembersToPlayResp.length == 0) {
          await client.nextTurn(getGameResp.turn + 1, gameId)

          getMembersToPlayResp = await client.getMembersToPlay(
            gameId,
            getGameResp.turn + 1
          )

          // Error improbable
          if (getMembersToPlayResp.length == 0) {
            logger.error("It the turn of no one")
            throw Error("Unexpected Error")
          }
        }

        let playing_player =
          getMembersToPlayResp[
            Math.floor(Math.random() * Math.floor(getMembersToPlayResp.length))
          ]

        await client.beginPlayerTurn(playing_player.player_id)

        let question = getQuestionResp.question.replace(
          /Described/g,
          describedPlayer
        )
        question = question.replace(/User/g, playing_player.name)

        res.render(path.join(__dirname, "../public/views", "3.ejs"), {
          id: gameId,
          response: "Ok cool",
          playing_player: playing_player.name,
          described_player: describedPlayer,
          question: question,
          avatar: av.url,
          end: false
        })
        return
      } else if (text.includes("no") || text.includes("No")) {
        await client.desupdateAvatar(gameId, context)
        await client.unholdForConfirmation(
          gameId,
          getActiveQuestionResp.question_id
        )

        let question = getActiveQuestionResp.question
        question = question.replace(/Described/g, describedPlayer)
        question = question.replace(/User/g, playingPlayer)

        let getAvatarValueResp = await client.getAvatarValue(gameId)

        let av = new Avatar(
          getAvatarValueResp.gender_id,
          getAvatarValueResp.eye_value,
          getAvatarValueResp.hair_value,
          getAvatarValueResp.mouth_value,
          getAvatarValueResp.nose_value,
          getAvatarValueResp.hair_tone_value,
          getAvatarValueResp.pupil_tone_value
        )

        res.render(path.join(__dirname, "../public/views", "3.ejs"), {
          id: gameId,
          response: "Ok, the update has been cancel.",
          playing_player: playingPlayer,
          described_player: getAvatarResp.name,
          question: question,
          avatar: av.url,
          end: false
        })
        return
      } else {
        let component = client.getIdiomaticAnswer(
          context,
          getAvatarResp[component + "_id"]
        )

        let question =
          playingPlayer +
          ", you said: " +
          component.idomatic_answer.replace(/Name/g, component.name) +
          ". Is what you want?"
        let response = "Please answer by yes or no"

        let getAvatarValueResp = await client.getAvatarValue(gameId)

        let av = new Avatar(
          getAvatarValueResp.gender_id,
          getAvatarValueResp.eye_value,
          getAvatarValueResp.hair_value,
          getAvatarValueResp.mouth_value,
          getAvatarValueResp.nose_value,
          getAvatarValueResp.hair_tone_value,
          getAvatarValueResp.pupil_tone_value
        )

        res.render(path.join(__dirname, "../public/views", "3.ejs"), {
          id: gameId,
          response: response,
          playing_player: playingPlayer,
          described_player: getAvatarResp.name,
          question: question,
          avatar: av.url,
          end: false
        })
        return
      }
    }
  } catch (err) {
    if (err instanceof BadRequestError) {
      res
        .status(400)
        .render(path.join(__dirname, "../public/views", "error.ejs"), {
          error: err.message
        })
      return
    }

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "error.ejs"), {
        error: err.message
      })
  }
})

module.exports = router
