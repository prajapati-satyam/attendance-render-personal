const Attendance = require('../models/attendance.model');

require('dotenv').config()

async function del(req,res){
    try{
        const apikey = process.env.API
        if(req.headers.api !== apikey){
            res.status(401).json({mes:"KEY Wrong"})
        }
        else{
            await Attendance.deleteMany({})
            res.status(200).json({mes:"DELETED Successfully!"})
        }
    }
    catch(err){
        console.log("Unable to DELETE DATA",err)
        res.status(400).json({mes:"Failed to DELETE DATA"})
    }
    
}

module.exports = del
