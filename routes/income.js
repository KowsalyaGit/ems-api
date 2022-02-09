var express = require('express');
var income = express.Router();

var incomeController = require('../controller/incomeController');

income.route('/saveIncome').post(incomeController.saveIncome);
income.route('/getIncome').get(incomeController.getIncome);
income.route('/VariousRNo/:Regno').get(incomeController.VariousRNo);
income.route('/getRNo').get(incomeController.getRNo);
income.route('/ReceiptNo/:Academicyear/:Course/:FeeSem/:Regno').get(incomeController.ReceiptNo);
income.route('/AcademicyearCourseFeeSem/:Academicyear/:Course/:FeeSem').get(incomeController.AcademicyearCourseFeeSem);
income.route('/VariousAcademicyearCourseFeeSem/:Academicyear/:Course/:FeeSem').get(incomeController.VariousAcademicyearCourseFeeSem);
income.route('/feeConfirmation/:Academicyear/:Course/:Semester').get(incomeController.feeConfirmation);
income.route('/PaidReport/:Academicyear/:Course/:Typeoffee/:FeeSem').get(incomeController.PaidReport);
income.route('/DatewisePaidReport/:Academicyear/:Course/:Typeoffee/:FeeSem/:FromDate/:ToDate').get(incomeController.DatewisePaidReport);
income.route('/variousFeesDatewise/:FromDate/:ToDate').get(incomeController.variousFeesDatewise);
income.route('/UnpaidReport/:Academicyear/:Course/:Typeoffee/:FeeSem').get(incomeController.UnpaidReport);
income.route('/getIdIncome/:FeeType/:FromDate/:ToDate').get(incomeController.getIdIncome);
income.route('/updateConfirmation').put(incomeController.updateConfirmation);
income.route('/updateIncome').put(incomeController.updateIncome);
income.route('/UGPaidCount/:Academicyear/:Course/:Semester').get(incomeController.UGPaidCount);
income.route('/UGUnpaidCount/:Academicyear/:Course/:Semester').get(incomeController.UGUnpaidCount);
income.route('/PGPaidCount/:Academicyear/:Course/:Semester').get(incomeController.PGPaidCount);
income.route('/PGUnPaidCount/:Academicyear/:Course/:Semester').get(incomeController.PGUnPaidCount);
income.route('/deleteIncome/:RNo').delete(incomeController.deleteIncome);

module.exports = income;
