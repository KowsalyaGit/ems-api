var express = require('express');
var data = express.Router();

var dataController = require('../controller/dataController');

data.route('/')
    .get(dataController.index)
    .post(dataController.new);
    
data.route('/:id')
    .get(dataController.view)
    .put(dataController.update)
    .post(dataController.upload);
data.route('/ApplnNo/AllDetails/:ApplnNo')
    .get(dataController.Application);
data.route('/ApplicationSales/:coutype/:FromDate/:ToDate')
    .get(dataController.ApplicationSales);
data.route('/AllCourse/:Course/:FromDate/:ToDate')
    .get(dataController.AllCourse);   

data.route('/Course/AllCourse/:Course')
    .get(dataController.Courses);

data.route('/Attendance/:Course/:Section/:Semester')
    .get(dataController.Attendance);

data.route('/Course/UG')
    .get(dataController.UGCourse);

data.route('/download/:file')
    .get(dataController.download);
data.route('/appNoMail/sentEmail')
    .post(dataController.appNo);
data.route('/ApplnNo/updateStatus')
    .put(dataController.updateStatus);
data.route('/App/updateForm')
    .put(dataController.AppUpdateForm);
data.route('/deleteData/:aadhaarNum')
    .delete(dataController.deleteData);
module.exports = data;
