const express = require('express')
const del = require('../controller/del_control')
const route = express.Router()
const { cookieCheker } = require("../middleware/auth.middleware")

route.post("/",cookieCheker,del)

module.exports = route
