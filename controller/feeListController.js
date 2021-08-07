FeeList = require('../model/feeListModel');
require('dotenv').config();

//save 
exports.saveFeeList = async (req, res) => {
   
    const feeList = new FeeList({
       
    FeeNo : req.body.FeeNo,
    FeeType : req.body.FeeType,
    GroupName : req.body.GroupName,
    Description : req.body.Description,
    
   });
   const addFeeList = feeList.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}


exports.getFeeList = async (req, res) => {

    const getFeeList  = FeeList.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.getIdFeeList = async (req, res) => {

    const getIdFeeList  = FeeList.find({FeeNo: req.params.FeeNo},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.updateFeeList = async (req, res) => {
    
    const updateFeeList = FeeList.updateOne({FeeNo:req.body.FeeNo},{$set:{
            
        FeeType : req.body.FeeType,
        GroupName : req.body.GroupName,
        Description : req.body.Description,

    }},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });
    
}

exports.deleteFeeList = async (req, res) => {

    const DeleteFeeList = FeeList.deleteOne({FeeNo:req.params.FeeNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });
}