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
    logger.info(gHR)

    let history = new History(
      gHR.gender_idiomatic_answer,
      gHR.eye_idiomatic_answer.replace("Name", gHR.eye_name),
      gHR.hair_idiomatic_answer.replace("Name", gHR.hair_name),
      gHR.mouth_idiomatic_answer.replace("Name", gHR.mouth_name),
      gHR.nose_idiomatic_answer.replace("Name", gHR.nose_name),
      gHR.hair_tone_idiomatic_answer.replace("Name", gHR.hair_tone_name),
      gHR.pupil_tone_idiomatic_answer.replace("Name", gHR.pupil_tone_name),
      gHR.beard_idiomatic_answer.replace("Name", gHR.beard_name),
      gHR.brow_idiomatic_answer.replace("Name", gHR.brow_name),
      gHR.ear_idiomatic_answer.replace("Name", gHR.ear_name),
      gHR.eyelash_idiomatic_answer.replace("Name", gHR.eyelash_name),
      gHR.glasses_idiomatic_answer.replace("Name", gHR.glasses_name),
      gHR.jaw_idiomatic_answer.replace("Name", gHR.jaw_name),
      gHR.brow_tone_idiomatic_answer.replace("Name", gHR.brow_tone_name),
      gHR.beard_tone_idiomatic_answer.replace("Name", gHR.beard_tone_name),
      gHR.eyeshadow_tone_idiomatic_answer.replace(
        "Name",
        gHR.eyeshadow_tone_name
      ),
      gHR.lipstick_tone_idiomatic_answer.replace(
        "Name",
        gHR.lipstick_tone_name
      ),
      gHR.skin_tone_idiomatic_answer.replace("Name", gHR.skin_tone_name),
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

module.exports = router
