var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var Avatar = require("./avatar")
var History = require("./history")
var logger = require("../logger")
var BadRequestError = require("../error")

router.get("/game/:gameId/endgame", async function(req, res, next) {
  try {
    let client = new Client()
    await client.getGame(req.params.gameId)

    let gHR = await client.getHistory(req.params.gameId)

    let history = new History(
      gHR.gender_idiomatic_answer,
      replaceOrNot(gHR.eye_idiomatic_answer, gHR.eye_name),
      replaceOrNot(gHR.hair_idiomatic_answer, gHR.hair_name),
      replaceOrNot(gHR.mouth_idiomatic_answer, gHR.mouth_name),
      replaceOrNot(gHR.nose_idiomatic_answer, gHR.nose_name),
      replaceOrNot(gHR.hair_tone_idiomatic_answer, gHR.hair_tone_name),
      replaceOrNot(gHR.pupil_tone_idiomatic_answer, gHR.pupil_tone_name),
      replaceOrNot(gHR.beard_idiomatic_answer, gHR.beard_name),
      replaceOrNot(gHR.brow_idiomatic_answer, gHR.brow_name),
      replaceOrNot(gHR.ear_idiomatic_answer, gHR.ear_name),
      replaceOrNot(gHR.eyelash_idiomatic_answer, gHR.eyelash_name),
      replaceOrNot(gHR.glasses_idiomatic_answer, gHR.glasses_name),
      replaceOrNot(gHR.jaw_idiomatic_answer, gHR.jaw_name),
      replaceOrNot(gHR.brow_tone_idiomatic_answer, gHR.brow_tone_name),
      replaceOrNot(gHR.beard_tone_idiomatic_answer, gHR.beard_tone_name),
      replaceOrNot(
        gHR.eyeshadow_tone_idiomatic_answer,
        gHR.eyeshadow_tone_name
      ),
      replaceOrNot(gHR.lipstick_tone_idiomatic_answer, gHR.lipstick_tone_name),
      replaceOrNot(gHR.skin_tone_idiomatic_answer, gHR.skin_tone_name),
      gHR.gender_value,
      gHR.eye_value,
      gHR.hair_value,
      gHR.mouth_value,
      gHR.nose_value,
      gHR.hair_tone_value,
      gHR.pupil_tone_value,
      gHR.beard_value,
      gHR.brow_value,
      gHR.ear_value,
      gHR.eyelash_value,
      gHR.glasses_value,
      gHR.jaw_value,
      gHR.brow_tone_value,
      gHR.beard_tone_value,
      gHR.eyeshadow_tone_value,
      gHR.lipstick_tone_value,
      gHR.skin_tone_value
    )

    res.render(path.join(__dirname, "../public/views", "end.ejs"), {
      id: req.params.gameId,
      history: history
    })
  } catch (e) {
    if (e instanceof BadRequestError) {
      res
        .status(400)
        .render(path.join(__dirname, "../public/views", "error.ejs"), {
          error: e.message
        })
    }

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "error.ejs"), {
        error: e.message
      })
  }
})

/* GET users listing. */
router.post("/game/:gameId/endgame", async function(req, res, next) {
  try {
    let client = new Client()
    await client.getGame(req.params.gameId)

    await client.endGame(req.params.gameId)

    res.render(path.join(__dirname, "../public/views", "home.ejs"))
  } catch (e) {
    if (e instanceof BadRequestError) {
      res
        .status(400)
        .render(path.join(__dirname, "../public/views", "error.ejs"), {
          error: e.message
        })
    }

    res
      .status(500)
      .render(path.join(__dirname, "../public/views", "error.ejs"), {
        error: e.message
      })
  }
})

function replaceOrNot(string, substring) {
  if (string == undefined) {
    return ""
  }

  return string.replace("Name", substring)
}

module.exports = router
