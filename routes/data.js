var express = require('express');
var data = express.Router();

var dataController = require('../controller/dataController');

data.route('/')
    .get(dataController.index)
    .post(dataController.new);
    
data.route('/:id')
    .get(dataController.view)
    .put(dataController.update)
    .post(dataController.upload);

data.route('/download/:file')
    .get(dataController.download);
data.route('/appNoMail/sentEmail')
    .post(dataController.appNo);
module.exports = data;
