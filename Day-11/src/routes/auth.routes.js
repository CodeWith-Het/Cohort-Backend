const express = require("express")
const authRouter = express.Router()
const userSchemaModel = require("../models/user.models")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

authRouter.post("/registor", async(req, res) => {
    const { name, email, password } = req.body
    
    const isUserExist = await userSchemaModel.findOne({ email })
    
    if (isUserExist) {
        return res.status(409).json({
            Message:"user allready exist"
        })
    }

    const user = await userSchemaModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex') 
    })
    console.log(user.password)

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,{expiresIn:"1h"}
    );

    res.cookie("token", token)

    res.status(201).json({
        Message: "User Created Successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })
})

authRouter.get("/get-me",async (req, res) => {
    const token = req.cookies.token

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    const user=await userSchemaModel.findById(decode.id)

    res.status(201).json({
        name: user.name,
        email:user.email
    })
})

authRouter.post("/login", async (req, res) => {
    const { email, password }=req.body
    
    const user = await userSchemaModel.findOne({ email })
    
    if (!user) {
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex')

    const isPassword = (passwordHash === user.password)

    if (!isPassword) {
        return res.status(404).json({
            message:"Invaild Password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    
    res.cookie("token", token)
    
    res.status(200).json({
        message: "User Logging successfully",
        name: user.name,
        email:user.email
    })
})


module.exports=authRouter