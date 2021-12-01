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

data.route('/BcCount/:coutype/:Course')
    .get(dataController.BcCount);

data.route('/MbcCount/:coutype/:Course')
    .get(dataController.MbcCount);

data.route('/OcCount/:coutype/:Course')
    .get(dataController.OcCount);

data.route('/ScCount/:coutype/:Course')
    .get(dataController.ScCount);
    
data.route('/ScaCount/:coutype/:Course')
    .get(dataController.ScaCount);
 
data.route('/TotalCount/:coutype/:Course')
    .get(dataController.TotalCount);

data.route('/StudentNameList/:Course/:Admissionstatus/:Academicyear/:Semester')
    .get(dataController.StudentNameList);

data.route('/StudentFullData/:Academicyear/:Course')
    .get(dataController.StudentFullData);

data.route('/SectionAllotment/:Academicyear/:Course')
    .get(dataController.SectionAllotment);

data.route('/ApplicationSales/:coutype/:FromDate/:ToDate')
    .get(dataController.ApplicationSales);

data.route('/AllCourse/:Course/:FromDate/:ToDate')
    .get(dataController.AllCourse);   

data.route('/Course/AllCourse/:Course/:Semester')
    .get(dataController.AllCourses);

data.route('/UniversityAdmission/:Academicyear/:Course')
    .get(dataController.UniversityAdmission);
    
data.route('/Course/AllCourse/:Course')
    .get(dataController.Courses);
   
data.route('/Transferlist/:Academicyear/:coutype')
    .get(dataController.Translist);

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
data.route('/CTrans/CourseTransfer')
    .put(dataController.CourseTransfer);
data.route('/App/updateForm')
    .put(dataController.AppUpdateForm);
data.route('/Section/Alertment')
    .put(dataController.SectionAlertment);
data.route('/TcUpdate/:ApplnNo')
    .put(dataController.TcUpdate);
data.route('/deleteData/:aadhaarNum')
    .delete(dataController.deleteData);
module.exports = data;
