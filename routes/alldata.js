const express = require('express')
const all = require('../controller/all_control')
const route = express.Router()
const { cookieCheker } = require("../middleware/auth.middleware")

route.get("/", cookieCheker,all)

module.exports = route