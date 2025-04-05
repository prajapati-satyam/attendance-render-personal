const mongoose = require("mongoose")


require('dotenv').config()


async function connectdb() {
    try {
        const connect = await mongoose.connect(process.env.URL)
        if (connect) {
            console.log("DB Connection Succesfull")
        }
        else {
            console.log("Failed")
        }
    }
    catch (err) {
        console.log("Unable to Connect the Server", err)
    }
}

module.exports = connectdb
