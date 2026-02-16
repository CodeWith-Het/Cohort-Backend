const mongoose = require("mongoose")

const cconnectToDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connect to  database")
    })
}

module.exports=cconnectToDB