FeeMaster = require('../model/feeMasterModel');
require('dotenv').config();

//save
exports.saveFeeMaster = async (req, res) => {

 FeeMaster.find({Academicyear:req.body.Academicyear,Course:req.body.Course,FeeSem : req.body.FeeSem}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        if(data.length ==0){
           
           SaveFeeMaster();
        }
        else{
            return res.json({
            status: "error",
            message: err,
        });
           
        }
       
    });

        function SaveFeeMaster(){
    const FeeMasters = new FeeMaster({
    SNo : req.body.SNo,
    Course : req.body.Course,
    CNo : req.body.CNo,
    // FeeType : req.body.FeeType,
    Description : req.body.Description,
    Lateral : req.body.Lateral,
    Head : req.body.Head,
    FeeSem : req.body.FeeSem,
    Academicyear : req.body.Academicyear,
    Amount : req.body.Amount,

    CouType : req.body.CouType,
    Typeoffee : req.body.Typeoffee,
    //College Fees
    TuitionFee : req.body.TuitionFee,
    LabFee : req.body.LabFee,
    InternetFee : req.body.InternetFee,
    SpecialFee : req.body.SpecialFee,
    InfrastructureFee : req.body.InfrastructureFee,
    CapsaFee : req.body.CapsaFee,
    DevelopmentchargeFee : req.body.DevelopmentchargeFee,
    StudentJournalFee : req.body.StudentJournalFee,
    AmenitiesFee : req.body.AmenitiesFee,
    Plus2verificationFee : req.body.Plus2verificationFee,
    ExamFees: req.body.ExamFees,
    ConvocationFees: req.body.ConvocationFees,
    OtherFees: req.body.OtherFees,
    TotalcollegeFee : req.body.TotalcollegeFee,
    //University Fees
    RegistrationFee : req.body.RegistrationFee,
    RecognitionFee : req.body.RecognitionFee,
    MatriculationFee : req.body.MatriculationFee,
    CulturalFee : req.body.CulturalFee,
    SportsFee : req.body.SportsFee,
    YouthDevelopmentFee : req.body.YouthDevelopmentFee,
    NSSFee : req.body.NSSFee,
    GroupInsuranceFee : req.body.GroupInsuranceFee,
    UnivInfrastructureFee : req.body.UnivInfrastructureFee,
    FlagDayFee : req.body.FlagDayFee,
    UniversityTotalFee : req.body.UniversityTotalFee,
    GrandTotalFee : req.body.GrandTotalFee,

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

exports.getTransferFromCNo = async (req,res) => {

    const getTransferFromCNo = FeeMaster.find({CNo: req.params.TransferFromCNo},function(err,data){

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
    
    const updateFee = FeeMaster.updateOne({SNo:req.body.SNo},{$set:{
        
        CNo : req.body.CNo,
        FeeType : req.body.FeeType,
        Description : req.body.Description,
        Amount : req.body.Amount,        
        FeeSem : req.body.FeeSem,
        Lateral : req.body.Lateral,
        Academicyear : req.body.Academicyear,
        Head : req.body.Head,

        CouType : req.body.CouType,
        Typeoffee : req.body.Typeoffee,
        //College Fees
        TuitionFee : req.body.TuitionFee,
        LabFee : req.body.LabFee,
        InternetFee : req.body.InternetFee,
        SpecialFee : req.body.SpecialFee,
        InfrastructureFee : req.body.InfrastructureFee,
        CapsaFee : req.body.CapsaFee,
        DevelopmentchargeFee : req.body.DevelopmentchargeFee,
        StudentJournalFee : req.body.StudentJournalFee,
        AmenitiesFee : req.body.AmenitiesFee,
        Plus2verificationFee : req.body.Plus2verificationFee,
        TotalcollegeFee : req.body.TotalcollegeFee,
        //University Fees
        RegistrationFee : req.body.RegistrationFee,
        RecognitionFee : req.body.RecognitionFee,
        MatriculationFee : req.body.MatriculationFee,
        CulturalFee : req.body.CulturalFee,
        SportsFee : req.body.SportsFee,
        YouthDevelopmentFee : req.body.YouthDevelopmentFee,
        NSSFee : req.body.NSSFee,
        GroupInsuranceFee : req.body.GroupInsuranceFee,
        UnivInfrastructureFee : req.body.UnivInfrastructureFee,
        FlagDayFee : req.body.FlagDayFee,
        UniversityTotalFee : req.body.UniversityTotalFee,
        GrandTotalFee : req.body.GrandTotalFee,

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

    const deleteFee = FeeMaster.deleteOne({SNo:req.params.SNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}