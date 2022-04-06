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

data.route('/ApplnNo/AllDetailss/:aadhaarNum')
    .get(dataController.aadhaarNum);

data.route('/BcCount/:coutype/:Course')
    .get(dataController.BcCount);

data.route('/OcCount/:coutype/:Course')
    .get(dataController.OcCount);

data.route('/BcmCount/:coutype/:Course')
    .get(dataController.BcmCount);

data.route('/MbcCount/:coutype/:Course')
    .get(dataController.MbcCount);

data.route('/DncCount/:coutype/:Course')
    .get(dataController.DncCount);

data.route('/DntCount/:coutype/:Course')
    .get(dataController.DntCount);   

data.route('/ScCount/:coutype/:Course')
    .get(dataController.ScCount);
    
data.route('/ScaCount/:coutype/:Course')
    .get(dataController.ScaCount);

data.route('/StCount/:coutype/:Course')
    .get(dataController.StCount);   
 
data.route('/TotalCount/:coutype/:Course')
    .get(dataController.TotalCount);

data.route('/StudentNameList/:Course/:Admissionstatus/:Academicyear/:Semester')
    .get(dataController.StudentNameList);

data.route('/StudentFullData/:Academicyear/:Course/:Semester')
    .get(dataController.StudentFullData);

data.route('/StudentConfirm/:Academicyear/:Course/:Semester')
    .get(dataController.StudentConfirm);

data.route('/SectionAllotment/:Academicyear/:Course/:Semester')
    .get(dataController.SectionAllotment);

data.route('/ApplicationSales/:coutype/:FromDate/:ToDate')
    .get(dataController.ApplicationSales);

data.route('/AllCourse/:Course/:FromDate/:ToDate')
    .get(dataController.AllCourse);   

data.route('/Course/AllCourse/:Course/:Semester')
    .get(dataController.AllCourses);

data.route('/UniversityAdmission/:Academicyear/:Course')
    .get(dataController.UniversityAdmission);
    
data.route('/Course/AllCourse/:Academicyear/:Course/:Semester')
    .get(dataController.Courses);
   
data.route('/Transferlist/:Academicyear/:coutype')
    .get(dataController.Translist);

data.route('/Attendance/:Course/:Section/:Semester')
    .get(dataController.Attendance);

data.route('/Course/UG')
    .get(dataController.UGCourse);

    
data.route('/Course/ChallonGenerate/:Academicyear/:Course/:FeeSem')
    .get(dataController.ChallonGenerate);

       
data.route('/Course/lastappNo')
    .get(dataController.lastappNo);



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
data.route('/App/UpdateApplnNo')
    .put(dataController.UpdateApplnNo);
data.route('/Section/Alertment')
    .put(dataController.SectionAlertment);
data.route('/TcUpdate/:ApplnNo')
    .put(dataController.TcUpdate);


// data.route('ChallonGenerate')
//     .get(dataController.ChallonGenerate);

data.route('/deleteData/:aadhaarNum')
    .delete(dataController.deleteData);
module.exports = data;
