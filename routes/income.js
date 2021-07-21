var express = require('express');
var income = express.Router();

var incomeController = require('../controller/incomeController');

income.route('/saveIncome').post(incomeController.saveIncome);
income.route('/getIncome').get(incomeController.getIncome);
income.route('/getIdIncome/:FeeType/:FromDate/:ToDate').get(incomeController.getIdIncome);
income.route('/updateIncome').put(incomeController.updateIncome);
income.route('/deleteIncome').delete(incomeController.deleteIncome);

module.exports = income;
