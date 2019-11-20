const express = require("express")
const app = express()
const port = 3131

app.use(express.static("public"))

var homeRouter = require("./routes/homeRouter")
var creategameRouter = require("./routes/creategameRouter")

app.use("/", homeRouter)
app.use("/", creategameRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
