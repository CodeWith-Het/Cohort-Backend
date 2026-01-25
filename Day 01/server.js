const express = require("express")
const app=express();

app.get("/",(req,res)=>{
    res.send("Hello Backend bhai")
})

app.listen(3000)