var express = require('express');
var payment = express.Router();

var paymentController = require('../controller/paymentController');

payment.route('/getUrl/:id').get(paymentController.getUrl);

module.exports = payment;
