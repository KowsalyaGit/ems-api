// Import data model
Data = require('../model/dataModel');

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