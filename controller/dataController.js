// Import data model
Data = require('../model/dataModel');
const multer = require('multer');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, '' + Date.now() + '-' + file.originalname);
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/)) {
        req.fileValidationError = 'Please select .JPG, .PNG or .PDF files only';
        return cb(new Error('Please select .JPG, .PNG or .PDF files only'), false);
    }
    cb(null, true);
};

//Get All
exports.index = function (req, res) {
    Data.get(function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: data
        });
    });
};

// Save
exports.new = function (req, res) {

    var currentYear = new Date();
         req.body.Syear = currentYear.getFullYear();
         req.body.Academicyear = currentYear.getFullYear(); 

    var data = new Data(req.body);

    data.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: data
        });
    });
};

//View
exports.view = function (req, res) {
    Data.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
        res.json({
            status: 'success',
            data: data
        });
    });
};

// Update
exports.update = function (req, res) {
    Data.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
        data = Object.assign(data, req.body);

        data.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: 'success',
                data: data
            });
        });
    });
};

exports.upload = function (req, res) {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('certificate');

    upload(req, res, function(err) {

        if (req.fileValidationError) {
            return res.json({
                status: 'error',
                msg: req.fileValidationError
            });
        }
        else if (!req.file) {
            return res.json({
                status: 'error',
                msg: 'Please upload a file'
            });
        }
        else if (err) {
            return res.json({
                status: 'error',
                msg: err
            });
        }

        return res.json({
            status: 'success',
            file: req.file.filename
        });
    });
}

exports.download = function (req, res) {
    const file = __dirname + '../../uploads/' + req.params.file;
    const filename = path.basename(file);
    const mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    const filestream = fs.createReadStream(file);
    filestream.pipe(res);
}