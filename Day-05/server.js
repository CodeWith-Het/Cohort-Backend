require("dotenv").config()

const app = require('./src/app')
const mongoose = require("mongoose")
const user = require('./src/models/user')



function connectToDB(){
  return mongoose.connect(process.env.MONGO_URI)

  .then(()=>{

    console.log("Database Connected")

    return user.create([
        {name:"het",surname:"patel"},
        {name:"vishv",surname:"patel"},
        {name:"nidhi",surname:"jariwala"}
    ])
  })

    .then(()=>{
        console.log("Data inserted")
    })

    .catch((err)=>{
        console.log("error not connected",err)
    })
}

connectToDB()

app.get("/" ,(req,res)=>{
    res.send("hello day 5 ka server kaise ho")
})

app.listen(3000,()=>{
    console.log("server started at port 3000")
})