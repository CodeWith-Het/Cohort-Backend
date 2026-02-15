const mongoose = require("mongoose")

const connnectToDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connect to database")
    })
}

module.exports = connnectToDB;