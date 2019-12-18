var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var logger = require("../logger")

router.get("/game/:gameId/begin", async function(req, res, next) {
  try {
    let client = new Client()

    let getGameResp = await client.getGame(gameId)
    let gameId = getGameResp.id

    try {
      await client.getAvatar(gameId)
      res.redirect("/game/" + gameId + "/play")
      return
    } catch (e) {}

    //Choose the player to describe
    let getMembersResp = await client.getMembers(gameId)

    let playerDescribed =
      getMembersResp[
        Math.floor(Math.random() * Math.floor(getMembersResp.length))
      ]

    let playingPlayer =
      getMembersResp[
        Math.floor(Math.random() * Math.floor(getMembersResp.length))
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

    let question = getQuestionResp.question.replace(
      /Described/g,
      playerDescribed.name
    )
    question = question.replace(/User/g, playingPlayer.name)

    await client.activeQuestion(getQuestionResp.rows[0].question_id, gameId)
    logger.info("The question is now active", {
      id: gameId,
      question: getQuestionResp.rows[0]
    })

    res.render(path.join(__dirname, "../public/views", "3.ejs"), {
      id: gameId,
      response: "Ok let's begin!",
      player_described: playerDescribed.name,
      playing_player: playingPlayer.name,
      question: question,
      avatar:
        "https://preview.bitmoji.com/avatar-builder-v3/preview/head?scale=1&gender=1&style=1&rotation=0&beard=-1&brow=-1&cheek_details=-1&ear=-1&earring=-1&eye=-1&eyelash=-1&eye_details=-1&face_lines=-1&glasses=-1&hair=490&hat=-1&jaw=185&mouth=-1&nose=-1&pupil=-1&beard_tone=-1&blush_tone=-1&brow_tone=-1&eyeshadow_tone=-1&hair_tone=-1&lipstick_tone=-1&pupil_tone=-1&skin_tone=-1&body=0&face_proportion=0",
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

module.exports = router
