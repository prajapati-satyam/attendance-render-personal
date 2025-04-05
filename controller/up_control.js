const Attendance = require("../models/attendance.model")

async function up(req, res) {
    try {
        const find = await Attendance.findOne({
            Subject: req.body.Subject,
            SlotType: req.body.SlotType
        })
        // console.log(find)
        if (!find) {
            console.log("Subject NOT FOUND")
            res.status(404).json({ mes: "SUBJECT NOT FOUND" })
        }
        const Present = find.Present
        const Absent = find.Absent
        const upPresent = Present + req.body.Present
        const upAbsent = Absent + req.body.Absent
        const upConducted = upPresent + upAbsent
        const AttPer = upPresent / upConducted * 100
        const fixedAttPer = AttPer.toFixed(2)
        const update = await Attendance.updateOne({ Subject: req.body.Subject }, {
            $set: {
                Present: upPresent, Absent: upAbsent,
                Conducted: upConducted, AttendancePercentage: `${fixedAttPer}%`
            }
        })
        console.log(Present, Absent)
        // console.log(find)
        res.status(200).json({ mes: "ALL DONE" })
    }
    catch (err) {
        console.log("Something Wrong went Wrong", err)
        res.status(404).json({ mes: "failed try again" })
    }
}
module.exports = up