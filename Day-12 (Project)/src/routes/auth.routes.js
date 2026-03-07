const express = require("express")
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

/* 
POST :  /api/auth/registor
*/
authRouter.post("/registor", async (req, res) => {
    
    const {username,email,password,bio,profile_image}=req.body
    
    const isuserAlreadyExistByUsername = await userModel.findOne({
        $or: [
            { username },
            {email}
        ]
    })

    if (isuserAlreadyExistByUsername) {
        res.status(409).json({
            message:"username already exist"+isuserAlreadyExistByUsername.email?"Email Already Exist":"Username Already Exist"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        bio,
        profile_image,
        password:hash
    })

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })
    
    res.cookie("token", token)
    
    res.status(201).json({
        message: "User Successfully Created",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_image:user.profile_image
        }
    })
})


/* 
POST: /api/auth/login
*/
authRouter.post("/login", async (req, res) => {
    const { username, email, password } = req.body
    
    // consition for user choose login method from username or email 
    const user = await userModel.findOne({
        $or: [
            { username: username },
            {email:email}
        ]
    })

    // user not found
    if (!user) {
        res.status(404).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordVaild = (hash == user.password)

    if (!isPasswordVaild) {
        res.status(401).json({
            message:"Invaild Password"
        })
    }

    // password is write then this...
    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    //store the token in cookie 
    res.cookie("token", token)
    
    res.status(200).json({
        message: "User logging successfully",
        user: {
            username: user.username,
            email: user.email,
            password:user.password
        }
    })
})

module.exports=authRouter