const express = require("express")
const jwt = require("jsonwebtoken")
const userDataModel = require("../models/userData.model")
const routes = express.Router()

routes.post("/register",async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userDataModel.findOne({name,email})
    
    if (isUserAlreadyExist) {
        res.status(409).json({
            message:"User is Already Exist"
        })
    }

    const userdata = await userDataModel.create({
        name,
        email,
        password
    })

    const token=jwt.sign(
        {
            id: userdata._id,
            email:userdata.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)
    
    res.status(201).json({
        message: "User Data is created",
        userdata,
        token
    })
})


module.exports=routes