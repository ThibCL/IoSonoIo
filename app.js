const express = require("express")
const app = express()
const port = 3132

app.use(express.static("public"))

var homeRouter = require("./routes/homeRouter")
var newgameRouter = require("./routes/newGameRouter")
var addMembersRouter = require("./routes/addMembersRouter")
var endGameRouter = require("./routes/endGameRouter")
var updateAvatarRouter = require("./routes/updateAvatarRouter")
var beginRouter = require("./routes/beginRouter")
var playRouter = require("./routes/playRouter")

app.use("/", endGameRouter)
app.use("/", homeRouter)
app.use("/", newgameRouter)
app.use("/", addMembersRouter)
app.use("/", updateAvatarRouter)
app.use("/", beginRouter)
app.use("/", playRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
