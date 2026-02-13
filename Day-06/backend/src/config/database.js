const mongoose = require("mongoose")

const connectToDB =()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connect to database")
    })
}

module.exports=connectToDB