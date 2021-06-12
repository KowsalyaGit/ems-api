var express = require('express');
var courseDetails = express.Router();

var courseDetailsController = require('../controller/courseDetailsController');

courseDetails.route('/saveCourseDetails').post(courseDetailsController.saveCourseDetails);
courseDetails.route('/getCourseDetails').get(courseDetailsController.getCourseDetails);
courseDetails.route('/getIdCourseDetails/:CNo').get(courseDetailsController.getIdCourseDetails);
courseDetails.route('/updateCourseDetails').put(courseDetailsController.updateCourseDetails);
courseDetails.route('/deleteCourseDetails').delete(courseDetailsController.deleteCourseDetails);

module.exports = courseDetails;
