var express = require('express');
var attendance = express.Router();

var attendanceController = require('../controller/attendanceController');

attendance.route('/saveAttendance').post(attendanceController.saveAttendance);
// attendance.route('/getAttendance').get(attendanceController.getAttendance);
// attendance.route('/getIdAttendance/:SNo').get(attendanceController.getIdAttendance);
// attendance.route('/updateAttendance').put(attendanceController.updateAttendance);
// attendance.route('/deleteAttendance/:SNo').delete(attendanceController.deleteAttendance);

module.exports = attendance;
