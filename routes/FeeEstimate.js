var express = require('express');
var FeeEstimate = express.Router();

var FeeEstimateController = require('../controller/FeeEstimateController');

FeeEstimate.route('/saveFeeEstimate').post(FeeEstimateController.saveFeeEstimate);

module.exports = FeeEstimate;
