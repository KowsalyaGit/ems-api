var express = require('express');
var userDetails = express.Router();

var userDetailsController = require('../controller/userDetailsController');

userDetails.route('/saveUserDetails').post(userDetailsController.saveUserDetails);
userDetails.route('/getUserDetails').get(userDetailsController.getUserDetails);
userDetails.route('/getIdUserDetails/:ID').get(userDetailsController.getIdUserDetails);
userDetails.route('/updateUserDetails').put(userDetailsController.updateUserDetails);
userDetails.route('/deleteUserDetails').delete(userDetailsController.deleteUserDetails);

module.exports = userDetails;
