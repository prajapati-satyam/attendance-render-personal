const Attendance = require("../models/attendance.model")

async function all(req,res){
    const data = await Attendance.find({})
    res.status(200).send(data)

}

module.exports = all