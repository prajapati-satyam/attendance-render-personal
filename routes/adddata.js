const express = require('express')
const add = require('../controller/add_control')
const { cookieCheker, passwordChekerAndCookieValidator } = require("../middleware/auth.middleware")
const route = express.Router()


route.post("/", passwordChekerAndCookieValidator,add)

module.exports = route
