var express = require("express")
var router = express.Router()
var path = require("path")
var Client = require("./pgClient")

/* GET users listing. */
router.get("/startGame", async function(req, res, next) {
  let client = new Client()
  let query = await client.startGame()

  if (query.rows.length != 1) {
    res.status(500).send("Internal Error")
  } else {
    let id = query.rows[0].id
    res.render(path.join(__dirname, "../views", "home.ejs"), { id: id })
  }
})

module.exports = router
