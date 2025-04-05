const Attendance = require("../models/attendance.model");

const deleteOneSubject = async (req,res) => {
    // console.log(req.body);
    const {Subject,SlotType} = req.body;
    const isDataExist = await Attendance.findOne({Subject, SlotType})
    console.log(isDataExist);
    console.log(Subject, SlotType);
    
    if (isDataExist) {
       await Attendance.deleteOne({_id: isDataExist._id});
       res.status(200).json({mess: "delete succefully"});
    } else {
        res.status(400).json({mess: "Unable to find data"});
    }
}


module.exports = deleteOneSubject;