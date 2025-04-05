const express = require('express');
const logout = require('../controller/logout');
const route =  express.Router();



route.get('/logout', logout);


module.exports = route