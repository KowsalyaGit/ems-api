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
data.route('/ApplnNo/AllDetails/:ApplnNo')
    .get(dataController.Application);
data.route('/download/:file')
    .get(dataController.download);
data.route('/appNoMail/sentEmail')
    .post(dataController.appNo);
data.route('/ApplnNo/updateStatus')
    .put(dataController.updateStatus);
data.route('/App/updateForm')
    .put(dataController.AppUpdateForm);
module.exports = data;
