var express = require('express');
var feeList = express.Router();

var feeListController = require('../controller/feeListController');

feeList.route('/saveFeeList').post(feeListController.saveFeeList);
feeList.route('/getFeeList').get(feeListController.getFeeList);
feeList.route('/getIdFeeList/:FeeNo').get(feeListController.getIdFeeList);
feeList.route('/updateFeeList').put(feeListController.updateFeeList);
feeList.route('/deleteFeeList/:FeeNo').delete(feeListController.deleteFeeList);

module.exports = feeList;
