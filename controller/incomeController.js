Income = require('../model/incomeModel');
require('dotenv').config();

//save 
exports.saveIncome = async (req, res) => {
   
    Income.find().limit(1).sort({createdAt : -1}).lean().exec(function(err,data){
        if(err){
            res.json(err)
        }
        if(data.length !=0){
            var ReceiptNo = data[0].RNo;           
            req.body.RNo = ++ReceiptNo;
            saveData();
        }
        else{
            //console.log(data.length);
            req.body.RNo = 1; 
            saveData();
        }
    });
    function saveData(){
    const income = new Income({
     
    RNo : req.body.RNo,
    ApplnNo : req.body.ApplnNo,
    Name : req.body.Name,
    ReceiptDate : req.body.ReceiptDate,
    Course : req.body.Course,
     Amount : req.body.Amount,
     FeeSem : req.body.FeeSem,
     Academicyear : req.body.Academicyear,
     CNo : req.body.CNo,
     FeeType : req.body.FeeType,
    
    
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

    const getIdIncome  = Income.find({FeeType: req.params.FeeType , ReceiptDate:{$gte: req.params.FromDate,$lte: req.params.ToDate} },function(err,data){

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
    
    const updateIncome = Income.updateOne({RNo:req.body.RNo},{$set:{
            
        ApplnNo : req.body.ApplnNo,
        Name : req.body.Name,
        ReceiptDate : req.body.ReceiptDate,
        Course : req.body.Course,
         Amount : req.body.Amount,
         FeeSem : req.body.FeeSem,
         Academicyear : req.body.Academicyear,
         CNo : req.body.CNo,
         FeeType : req.body.FeeType,
    
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

    const DeleteIncome = Income.deleteOne({RNo:req.params.RNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });      
}