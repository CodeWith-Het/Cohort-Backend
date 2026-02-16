const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email:{
    type: String,
    unique: [true, "this email account aleardy exists"],
  },
  password: String,
});

const userSchemaModels = mongoose.model("User", userSchema)
module.exports=userSchemaModels