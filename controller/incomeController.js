Income = require('../model/incomeModel');
require('dotenv').config();

//save 
exports.saveIncome = async (req, res) => {
   
    const income = new Income({
       
    RNo : req.body.RNo,
    PDate : req.body.PDate,
    TempNo : req.body.TempNo,
    StuRollNo : req.body.StuRollNo,
    Sem : req.body.Sem,
    FeeType : req.body.FeeType,
    Description : req.body.Description,
    Amount : req.body.Amount,
    Discount : req.body.Discount,
    Head : req.body.Head,
    StuName : req.body.StuName,
    Course : req.body.Course,
    CNo : req.body.CNo,
    Paid : req.body.Paid,
    Balance : req.body.Balance,
    Fine : req.body.Fine,
    Remark : req.body.Remark,
    Status : req.body.Status,
    CashType : req.body.CashType,
    GrpName : req.body.GrpName,
    Syear : req.body.Syear,
    temp : req.body.temp,
    CashType1 : req.body.CashType1,
    GrpName1 : req.body.GrpName1,
    Syear1 : req.body.Syear1,
    FeeTerm : req.body.FeeTerm,
    temp1 : req.body.temp1,
    BusNo : req.body.BusNo,
    BusMonth : req.body.BusMonth,
    PaidStatus : req.body.PaidStatus,
    
   });
   const addIncome = income.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}


exports.getIncome = async (req, res) => {

    const getIncome  = Income.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.getIdIncome = async (req, res) => {

    const getIdIncome  = Income.find({StuRollNo: req.params.StuRollNo},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.updateIncome = async (req, res) => {
    
    const updateIncome = Income.updateOne({StuRollNo:req.body.StuRollNo},{$set:{
            
    RNo : req.body.RNo,
    PDate : req.body.PDate,
    TempNo : req.body.TempNo,    
    Sem : req.body.Sem,
    FeeType : req.body.FeeType,
    Description : req.body.Description,
    Amount : req.body.Amount,
    Discount : req.body.Discount,
    Head : req.body.Head,
    StuName : req.body.StuName,
    Course : req.body.Course,
    CNo : req.body.CNo,
    Paid : req.body.Paid,
    Balance : req.body.Balance,
    Fine : req.body.Fine,
    Remark : req.body.Remark,
    Status : req.body.Status,
    CashType : req.body.CashType,
    GrpName : req.body.GrpName,
    Syear : req.body.Syear,
    temp : req.body.temp,
    CashType1 : req.body.CashType1,
    GrpName1 : req.body.GrpName1,
    Syear1 : req.body.Syear1,
    FeeTerm : req.body.FeeTerm,
    temp1 : req.body.temp1,
    BusNo : req.body.BusNo,
    BusMonth : req.body.BusMonth,
    PaidStatus : req.body.PaidStatus,
    
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

exports.deleteIncome = async (req, res) => {

    const DeleteIncome = Income.deleteOne({StuRollNo:req.body.StuRollNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });      
}