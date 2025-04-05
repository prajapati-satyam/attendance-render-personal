const express = require('express')
const up = require('../controller/up_control')
const route = express.Router()
const { cookieCheker, passwordChekerAndCookieValidator } = require("../middleware/auth.middleware")


route.post("/", passwordChekerAndCookieValidator,up)


module.exports = route