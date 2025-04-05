const express = require('express')
const cookieParser = require("cookie-parser");
const connectdb = require('./connectdb/connect')
const Attendance = require('./models/attendance.model')
const route_add = require('./routes/adddata')
const route_del = require('./routes/delalldata')
const route_all = require('./routes/alldata')
const route_up = require('./routes/update')
const {validate, cookieCheker} = require('./middleware/auth.middleware')
const logout = require('./routes/user.route')
const app = express()
const path = require('path')
const cors = require('cors');
const user = require('./routes/user.route');
const deleteOne = require('./routes/deleteone.route');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

connectdb()

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.post('/', validate)

app.get('/view', cookieCheker, (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.get("/robot", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robot.jpg'))
})

app.get("/blackbox", (req, res) => {
    res.sendFile(path.join(__dirname, 'utils/extra', 'blackbox.html'))
})


app.get("/gpt", (req, res) => {
    res.sendFile(path.join(__dirname, 'utils/extra', 'gpt.html'))
})



app.get("/gpt2", (req, res) => {
    res.sendFile(path.join(__dirname, 'utils/extra', 'gpt2.html'))
})


app.get("/find", async (req, res) => {
    const find = await Attendance.find({})
    console.log(find)
    res.json(find)
})

app.use("/all", route_all) // ALL - apikey 
app.use("/add", route_add)
app.use("/del", route_del)
app.use("/up",route_up)
app.use('/deleteone', deleteOne)

// 
app.use('/user', logout)


app.listen(port, () => {
    console.log("Server is Running!")
})
