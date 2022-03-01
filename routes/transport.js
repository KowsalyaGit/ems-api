var express = require('express');
var transport = express.Router();

var transportController = require('../controller/transportController');

transport.route('/saveTransport').post(transportController.saveTransport);
transport.route('/getTransport').get(transportController.getTransport);
transport.route('/updateTransport').put(transportController.updateTransport);
transport.route('/deleteTransport/:BusNo').delete(transportController.deleteTransport);


module.exports = transport;
