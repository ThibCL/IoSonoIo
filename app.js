const express = require("express")
const app = express()
const port = 3132

app.use(express.static("public"))

var homeRouter = require("./routes/homeRouter")
var newgameRouter = require("./routes/newGameRouter")
var addMembersRouter = require("./routes/addMembersRouter")
var endGameRouter = require("./routes/endGameRouter")
var beginRouter = require("./routes/beginRouter")
var playRouter = require("./routes/playRouter")
var hintRouter = require("./routes/hintRouter")

app.use("/", endGameRouter)
app.use("/", homeRouter)
app.use("/", newgameRouter)
app.use("/", addMembersRouter)
app.use("/", beginRouter)
app.use("/", playRouter)
app.use("/", hintRouter)

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
)
