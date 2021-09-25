var express = require('express');
var Bonafide = express.Router();

var BonafideController = require('../controller/BonafideController');

Bonafide.route('/saveBonafide').post(BonafideController.saveBonafide);
Bonafide.route('/getBonafide').get(BonafideController.getBonafide);

module.exports = Bonafide;
