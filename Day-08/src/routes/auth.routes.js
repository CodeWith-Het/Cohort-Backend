const express = require("express")
const jwt = require("jsonwebtoken")
const userSchemaModels = require("../models/user.models")

const authRouter = express.Router()

authRouter.post("/register",async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userSchemaModels.findOne({ email })
    
    if (isUserAlreadyExist) {
        res.status(409).json({
            message:"This Email Account already exist"
        })
    }

    const userData = await userSchemaModels.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: userData._id,
        email: userData.email,
      },
      process.env.JWT_SECRET,
  );
  
  res.cookie("jwt_token",token)

    res.status(201).json({
        messgae: "user data created",
        userData,
        token
    })
    
})

module.exports=authRouter