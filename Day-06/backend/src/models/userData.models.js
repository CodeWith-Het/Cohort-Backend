const mongoose = require("mongoose")

const userDataSchema = new mongoose.Schema({
    name:String,
    surname:String,
    age:Number,
    course:String
})

const userDataModel = mongoose.model("userData",userDataSchema)
module.exports=userDataModel