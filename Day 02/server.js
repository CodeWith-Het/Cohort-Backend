const express = require("express")
const app = express()

app.use(express.json())

const note = []

app.post("/notes",(req,res)=>{
    console.log(req.body)

    note.push(req.body)

    res.send("notes created")
})

app.get("/notes",(req,res)=>{
    res.send(note)
})

app.listen(3000,()=>{
    console.log("server is started port no at 3000")
})