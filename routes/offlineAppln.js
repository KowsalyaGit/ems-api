var express = require('express');
var offlineAppln = express.Router();

var offlineApplnController = require('../controller/offlineApplnController');

offlineAppln.route('/saveofflineAppln').post(offlineApplnController.saveofflineAppln);
offlineAppln.route('/DatewiseReport/:coutype/:FromDate/:ToDate').get(offlineApplnController.DatewiseReport);
offlineAppln.route('/CoursewiseReport/:Academicyear/:Course').get(offlineApplnController.CoursewiseReport);
offlineAppln.route('/getApplnNo/:ApplnNo').get(offlineApplnController.getApplnNo);
offlineAppln.route('/getAcademicyear/:Academicyear').get(offlineApplnController.getAcademicyear);
offlineAppln.route('/getUGAcademicyear/:Academicyear').get(offlineApplnController.getUGAcademicyear);
offlineAppln.route('/getPGAcademicyear/:Academicyear').get(offlineApplnController.getPGAcademicyear);
offlineAppln.route('/getUGofflineAppln').get(offlineApplnController.getUGofflineAppln);
offlineAppln.route('/getAYearCourse/:Academicyear/:Course').get(offlineApplnController.getAYearCourse);
offlineAppln.route('/getPGofflineAppln').get(offlineApplnController.getPGofflineAppln);
offlineAppln.route('/updateofflineAppln').put(offlineApplnController.updateofflineAppln);
offlineAppln.route('/updateAdmissionstatus').put(offlineApplnController.updateAdmissionstatus);
offlineAppln.route('/updateStatus/:ApplnNo').put(offlineApplnController.updateStatus);
offlineAppln.route('/deleteofflineAppln/:ApplnNo').delete(offlineApplnController.deleteofflineAppln);
offlineAppln.route('/GenerateChallan/:Academicyear/:Course/:FeeSem').get(offlineApplnController.GenerateChallan);

module.exports = offlineAppln;
