const express = require("express")
const routes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const app = express()

// this all middleware
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",routes)

module.exports=app