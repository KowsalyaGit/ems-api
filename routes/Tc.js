var express = require('express');
var Tc = express.Router();

var TcController = require('../controller/TcController');

Tc.route('/saveTc').post(TcController.saveTc);
Tc.route('/getTc').get(TcController.getTc);
Tc.route('/getCoursewiseTc/:Course').get(TcController.getCoursewiseTc);


module.exports = Tc;
