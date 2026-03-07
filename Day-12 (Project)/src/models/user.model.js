const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exist"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    unique: [true, "password already exist"],
    requires: [true, "password is required"],
  },
  bio: String,
  profile_image: {
    type: String,
    default:
      "https://i.pinimg.com/originals/9d/d2/90/9dd2906190f0c1813429fe0c8695ed04.png",
  },
});

const userModel = mongoose.model("insta_user",userSchema)
module.exports=userModel