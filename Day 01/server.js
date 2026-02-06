const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello Customer")
})

app.get("/profile",(req,res)=>{
    res.send("Hello This my profile")
})

app.listen(3000)