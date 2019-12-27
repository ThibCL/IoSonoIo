var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")
var BadRequestError = require("../error")
var logger = require("../logger")
var Avatar = require("./avatar")

/* GET users listing. */
router.get("/game/:gameId/hint", async function(req, res, next) {
  try {
    let client = new Client()
    await client.getGame(req.params.gameId)

    let getActQuestionResp = await client.getActiveQuestion(req.params.gameId)
    let questionId = getActQuestionResp.question_id

    let getQuestionResp = await client.getQuestion(questionId)
    let context = getQuestionResp.context
    let gender = getQuestionResp.gender_id

    let getHintsResp = await client.getHints(context, gender)
    let hints = []

    getHintsResp.forEach(function(item) {
      let carac = { gender: gender }
      carac[context] = item.value
      let av = new Avatar(carac)
      hints.push({
        answer: item.idiomatic_answer.replace("Name", item.name),
        avatar: av
      })
    })

    res.render(path.join(__dirname, "../public/views", "hint.ejs"), {
      id: req.params.gameId,
      hints: hints
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

module.exports = router
