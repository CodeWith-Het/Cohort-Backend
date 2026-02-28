const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique:[true,'email already exist on this account']
    },
    password:String
})

const userSchemaModel=mongoose.model("userdata",userSchema)
module.exports=userSchemaModel