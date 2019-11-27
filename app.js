const express = require("express")
const app = express()
const port = 3131

app.use(express.static("public"))

var homeRouter = require("./routes/homeRouter")
var creategameRouter = require("./routes/startGameRouter")
var addMembersRouter = require("./routes/addMembersRouter")
var endGameRouter = require("./routes/endGameRouter")
var updateAvatarRouter = require("./routes/updateAvatarRouter")

app.use("/", endGameRouter)
app.use("/", homeRouter)
app.use("/", creategameRouter)
app.use("/", addMembersRouter)
app.use("/", updateAvatarRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
