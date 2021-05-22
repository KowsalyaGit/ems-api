var express = require('express');
var feeMaster = express.Router();

var feeMasterController = require('../controller/feeMasterController');

feeMaster.route('/saveFeeMaster').post(feeMasterController.saveFeeMaster);
feeMaster.route('/getFeeMaster').get(feeMasterController.getFeeMaster);
feeMaster.route('/getIdFeeMaster/:CNo').get(feeMasterController.getIdFeeMaster);
feeMaster.route('/updateFeeMaster').put(feeMasterController.updateFeeMaster);
feeMaster.route('/deleteFeeMaster').delete(feeMasterController.deleteFeeMaster);

module.exports = feeMaster;
