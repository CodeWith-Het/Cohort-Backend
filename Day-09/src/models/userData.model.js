const mongoose = require("mongoose")

const userdataSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique:[true,"this email account already exist"]
    },
    password:String
})

const userDataModel = mongoose.model("UserData", userdataSchema)
module.exports=userDataModel