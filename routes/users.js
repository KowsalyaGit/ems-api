var express = require('express');
var user = express.Router();

var userController = require('../controller/userController');

user.route('/login').post(userController.login);
user.route('/register').post(userController.register);

module.exports = user;
