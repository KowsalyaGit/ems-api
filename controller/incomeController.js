Income = require('../model/incomeModel');
require('dotenv').config();

//save 
exports.saveIncome = async (req, res) => {

    Income.find({ApplnNo:req.body.ApplnNo,Academicyear:req.body.Academicyear,Course:req.body.Course,FeeSem : req.body.FeeSem}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        if(data.length ==0){
           
           SaveReceipt();
        }
        else{
            return res.json({
            status: "error",
            message: err,
        });
           
        }
       
    });
   function SaveReceipt(){
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
           
            req.body.RNo = 1; 
            saveData();
        }
    });
   }
    function saveData(){
    const income = new Income({
     

    RNo : req.body.RNo,
    Regno : req.body.Regno,
    ApplnNo : req.body.ApplnNo,   
    Name : req.body.Name,
    ReceiptDate : req.body.ReceiptDate,
    Course : req.body.Course,
    //Amount : req.body.Amount,
    FeeSem : req.body.FeeSem,
    Academicyear : req.body.Academicyear,
    CNo : req.body.CNo,
    //FeeType : req.body.FeeType,
    Status : "UNPAID",

    Typeoffee : req.body.Typeoffee,

    TuitionFee : req.body.TuitionFee,
    LabFee : req.body.LabFee,
    InternetFee : req.body.InternetFee,
    SpecialFee : req.body.SpecialFee,
    InfrastructureFee : req.body.InfrastructureFee,
    CapsaFee : req.body.CapsaFee,
    DevelopmentchargeFee : req.body.DevelopmentChargeFee,
    StudentJournalFee : req.body.StudentJournalFee,
    AmenitiesFee : req.body.AmenitiesFee,
    Plus2verificationFee : req.body.Plus2verificationFee,
    ExamFees: req.body.ExamFees,
    ConvocationFees: req.body.ConvocationFees,
    OtherFees: req.body.OtherFees,
    TotalcollegeFee : req.body.TotalcollegeFee,

    RegistrationFee : req.body.RegistrationFee,
    RecognitionFee : req.body.RecognitionFee,
    MatriculationFee : req.body.MatriculationFee,
    CulturalFee : req.body.CulturalFee,
    SportsFee : req.body.SportsFee,
    YouthDevelopmentFee : req.body.YouthDevelopmentFee,
    NSSFee : req.body.NSSFee,
    GroupInsuranceFee : req.body.GroupInsuranceFee,
    UnivInfrastructureFee : req.body.UnivInfrastructure,
    FlagDayFee : req.body.FlagDay,
    UniversityTotalFee : req.body.UniversityTotalFee,
    GrandTotalFee : req.body.GrandTotalFee,
    
    
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

exports.feeConfirmation = function (req, res) {

    Income.find({Academicyear:req.params.Academicyear,Course:req.params.Course}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};


exports.PaidReport = function (req, res) {

    Income.find({Academicyear:req.params.Academicyear,Course:req.params.Course,Typeoffee:req.params.Typeoffee,FeeSem:req.params.FeeSem,Status:"PAID"}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};


exports.UnpaidReport = function (req, res) {

    Income.find({Academicyear:req.params.Academicyear,Course:req.params.Course,Typeoffee:req.params.Typeoffee,FeeSem:req.params.FeeSem,Status:"UNPAID"}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};


exports.updateConfirmation = function (req, res) {
    Income.updateOne({RNo:req.body.RNo},{$set:(req.body)
        
    },function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });
};

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