Income = require('../model/incomeModel');
require('dotenv').config();

//save 
exports.saveIncome = async (req, res) => {

    Income.find({FeeSem : req.body.FeeSem,Academicyear:req.body.Academicyear,Course:req.body.Course,Regno:req.body.Regno,Typeoffee:req.body.Typeoffee}, function (err, data) {
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
    FeeSem : req.body.FeeSem,
    Academicyear : req.body.Academicyear,
    CNo : req.body.CNo,
    Status : "UNPAID",
    Remark : req.body.Remark,
    Description : req.body.Description,
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
    income.save(function(err,data){
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


exports.AcademicyearCourseFeeSem = function (req, res) {

    Income.find({Academicyear:req.params.Academicyear,Course:req.params.Course,FeeSem:req.params.FeeSem,Remark: "Challan"}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',              
            data: data
        });
       
    });
};


exports.VariousAcademicyearCourseFeeSem = function (req, res) {

    Income.find({Academicyear:req.params.Academicyear,Course:req.params.Course,FeeSem:req.params.FeeSem,Remark:"Various Fees"}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',              
            data: data
        });
       
    });
};

exports.feeConfirmation = function (req, res) {

    Income.find({Academicyear:req.params.Academicyear,Course:req.params.Course,FeeSem:req.params.Semester}, function (err, data) {
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

exports.DatewisePaidReport = function (req, res) {


     var query;
        if( (req.params.Course === "All") && (req.params.FeeSem === "All") ){
            query =  {Academicyear:req.params.Academicyear,Typeoffee:req.params.Typeoffee,Status:"PAID",updatedAt:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
        }else if(req.params.Course === "All"){
             query =  {Academicyear:req.params.Academicyear,FeeSem:req.params.FeeSem,Typeoffee:req.params.Typeoffee,Status:"PAID",updatedAt:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
        }
        else if(req.params.FeeSem === "All"){
             query =  {Academicyear:req.params.Academicyear,Course:req.params.Course,Typeoffee:req.params.Typeoffee,Status:"PAID",updatedAt:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
        }
        else{
            query = {Academicyear:req.params.Academicyear,Course:req.params.Course,Typeoffee:req.params.Typeoffee,FeeSem:req.params.FeeSem,Status:"PAID",updatedAt:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
        }


    Income.find(query, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};


exports.variousFeesDatewise = function (req, res) {

    Income.find({Status:"PAID",Remark:"Various Fees",updatedAt:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }, function (err, data) {
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

exports.getRNo = async (req, res) => {

    Income.find({Remark: "Challan" },function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
}


exports.ReceiptNo = async (req, res) => {

    Income.find({Remark: "Challan",Regno:req.params.Regno },function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
}


exports.VariousRNo = async (req, res) => {

    Income.find({Remark: "Various Fees",Regno:req.params.Regno },function(err,data){

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


exports.UGPaidCount = function (req, res) {

 var que;
if(req.params.Course !== "All"){
   que = {Academicyear:req.params.Academicyear, Course:req.params.Course, FeeSem:req.params.Semester,Status:"PAID"}
}else{
    que = {Academicyear:req.params.Academicyear, FeeSem:req.params.Semester,Status:"PAID"}
    // que = {ReceiptDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'}}
}

    
    Income.countDocuments(que,function(err,data){

        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
        
    });
};


exports.UGUnpaidCount = function (req, res) {

 var que;
if(req.params.Course !== "All"){
   que = {Academicyear:req.params.Academicyear, Course:req.params.Course, FeeSem:req.params.Semester,Status:"UNPAID"}
}else{
    que = {Academicyear:req.params.Academicyear, FeeSem:req.params.Semester,Status:"UNPAID"}
    // que = {ReceiptDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'}}
}

    
    Income.countDocuments(que,function(err,data){

        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
        
    });
};

exports.PGPaidCount = function (req, res) {

 var que;
if(req.params.Course !== "All"){
   que = {Academicyear:req.params.Academicyear, Course:req.params.Course, FeeSem:req.params.Semester,Status:"PAID"}
}else{
    que = {Academicyear:req.params.Academicyear, FeeSem:req.params.Semester,Status:"PAID"}
    // que = {ReceiptDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'}}
}

    
    Income.countDocuments(que,function(err,data){

        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
        
    });
};


exports.PGUnPaidCount = function (req, res) {

 var que;
if(req.params.Course !== "All"){
   que = {Academicyear:req.params.Academicyear, Course:req.params.Course, FeeSem:req.params.Semester,Status:"UNPAID"}
}else{
    que = {Academicyear:req.params.Academicyear, FeeSem:req.params.Semester,Status:"UNPAID"}
    // que = {ReceiptDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'}}
}

    
    Income.countDocuments(que,function(err,data){

        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
        
    });
};

exports.deleteIncome = async (req, res) => {

    // const DeleteIncome = Income.deleteOne({RNo:req.params.RNo},function(err,data){
    //     if (err) {
    //         return res.json({
    //             status: "error",
    //             message: err,
    //         });
    //     }
    //     res.json(data);   
    // });      
}