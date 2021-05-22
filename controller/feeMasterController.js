FeeMaster = require('../model/feeMasterModel');
require('dotenv').config();

//save
exports.saveFeeMaster = async (req, res) => {
        
    const FeeMasters = new FeeMaster({
    SNo : req.body.SNo,
    FeeType : req.body.FeeType,
    Description : req.body.Description,
    Amount : req.body.Amount,
    CNo : req.body.CNo,
    FeeSem : req.body.FeeSem,
    Lateral : req.body.Lateral,
    Academicyear : req.body.Academicyear,
    Head : req.body.Head,
    
   });
   const fee = FeeMasters.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}

exports.getFeeMaster = async (req, res) => {

    const getfee  = FeeMaster.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.getIdFeeMaster = async (req,res) => {

    const getIdFee = FeeMaster.find({CNo: req.params.CNo},function(err,data){

        if(err){
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
    });
}

exports.updateFeeMaster = async (req, res) => {
    
    const updateFee = FeeMaster.updateOne({CNo:req.body.CNo},{$set:{
        
        SNo : req.body.SNo,
        FeeType : req.body.FeeType,
        Description : req.body.Description,
        Amount : req.body.Amount,        
        FeeSem : req.body.FeeSem,
        Lateral : req.body.Lateral,
        Academicyear : req.body.Academicyear,
        Head : req.body.Head,

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

exports.deleteFeeMaster = async (req, res) => {

    const deleteFee = FeeMaster.deleteOne({CNo:req.body.CNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}