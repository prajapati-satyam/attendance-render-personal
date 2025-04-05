const mongoose = require("mongoose")

// Define the schema
const attendanceSchema = new mongoose.Schema({
    Sr: { type: Number, required: true }, 
    Subject: { type: String, required: true }, 
    SlotType: { type: String, required: true }, 
    Conducted: { type: Number, required: true }, 
    Present: { type: Number, required: true }, 
    Absent: { type: Number, required: true }, 
    AttendancePercentage: { type: String, required: true }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance

// taking user input for subname
// finding data from database according to userinput
// then updating data
// then finding attendance percentage and conducted lectures and
// SAVE TO DATABASE