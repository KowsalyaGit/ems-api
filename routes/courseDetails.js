var express = require('express');
var courseDetails = express.Router();

var courseDetailsController = require('../controller/courseDetailsController');

courseDetails.route('/saveCourseDetails').post(courseDetailsController.saveCourseDetails);
courseDetails.route('/getCourseDetails').get(courseDetailsController.getCourseDetails);
courseDetails.route('/getUGCourseDetails').get(courseDetailsController.getUGCourseDetails);
courseDetails.route('/getPGCourseDetails').get(courseDetailsController.getPGCourseDetails);
courseDetails.route('/getIdCourseDetails/:Sno').get(courseDetailsController.getIdCourseDetails);
courseDetails.route('/updateCourseDetails').put(courseDetailsController.updateCourseDetails);
courseDetails.route('/deleteCourseDetails/:Sno').delete(courseDetailsController.deleteCourseDetails);

module.exports = courseDetails;
