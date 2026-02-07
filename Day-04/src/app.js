const express = require("express")
const app = express()

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{
    notes.push(req.body)

    res.status(201).json({
        message:"note created successfully"
    })
})

app.get("/notes",(req,res)=>{
//    res.status(200).json(notes)   // simple format me json data milega

   res.status(200).json({
    note:notes
   })
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message:"delete note successfully"
    })
})

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].desc = req.body.desc
    res.status(200).json({
        message:"notes successfully modified"
    })
})

module.exports = app