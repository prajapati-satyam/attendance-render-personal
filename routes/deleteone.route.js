const express = require('express');
const deleteOneSubject = require('../controller/deleteone.controller');
const {cookieCheker, passwordChekerAndCookieValidator} = require('../middleware/auth.middleware')
const deleteone = express.Router();



deleteone.post('/' ,passwordChekerAndCookieValidator,deleteOneSubject);



module.exports = deleteone;