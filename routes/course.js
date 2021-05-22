var express = require('express');
var course = express.Router();

var courseController = require('../controller/courseController');

course.route('/saveCourse').post(courseController.saveCourse);
course.route('/getCourse').get(courseController.getCourse);
course.route('/getIdCourse/:CNo').get(courseController.getIdCourse);
course.route('/updateCourse').put(courseController.updateCourse);
course.route('/deleteCourse').delete(courseController.deleteCourse);

module.exports = course;
