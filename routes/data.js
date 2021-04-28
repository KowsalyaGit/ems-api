var express = require('express');
var data = express.Router();

var dataController = require('../controller/dataController');

data.route('/')
    .get(dataController.index)
    .post(dataController.new);
data.route('/:id')
    .get(dataController.view)
    .put(dataController.update);

module.exports = data;
