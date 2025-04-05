const Attendance = require("../models/attendance.model")

async function add(req,res){
    console.log(req.body)
    const {Sr,Subject,SlotType,Conducted,Present,Absent,AttendancePercentage} = req.body
    console.log(Sr,Subject,SlotType,Conducted,Present,Absent,AttendancePercentage)
    try{
    const newAttendance = new Attendance({
        Sr,
        Subject,
        SlotType,
        Conducted,
        Present,
        Absent,
        AttendancePercentage
      });

    await newAttendance.save()
    res.status(200).json({mes:"All OKAY"})
    }
    catch(err){
        console.log("Unable to SAVE",err)
        res.status(400).json({mes:"Failed to SAVE"})
    }
}

module.exports = add
