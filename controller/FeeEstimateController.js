FeeEstimate = require('../model/FeeEstimateModel');
require('dotenv').config();

//save 
exports.saveFeeEstimate = async (req, res) => {

    const FeeEstimates = new FeeEstimate({
     
    ApplnNo : req.body.ApplnNo,
    Name : req.body.Name,
    FatherName : req.body.FatherName,
    AcademicYear : req.body.AcademicYear,
    Yearofstudy : req.body.Yearofstudy,
    Sem1TutionFee : req.body.Sem1TutionFee,
    Sem1SpecialFee : req.body.Sem1SpecialFee,
    Sem1InfrastructureFee : req.body.Sem1InfrastructureFee,
    Sem1UniversityFee : req.body.Sem1UniversityFee,
    Sem2TutionFee : req.body.Sem2TutionFee,
    Sem2SpecialFee : req.body.Sem2SpecialFee,
    Sem2InfrastructureFee : req.body.Sem2InfrastructureFee,
    Sem2UniversityFee : req.body.Sem2UniversityFee,
    Sem3TutionFee : req.body.Sem3TutionFee,
    Sem3SpecialFee : req.body.Sem3SpecialFee,
    Sem3InfrastructureFee : req.body.Sem3InfrastructureFee,
    Sem3UniversityFee : req.body.Sem3UniversityFee,
    Sem4TutionFee : req.body.Sem4TutionFee,
    Sem4SpecialFee : req.body.Sem4SpecialFee,
    Sem4InfrastructureFee : req.body.Sem4InfrastructureFee,
    Sem4UniversityFee : req.body.Sem4UniversityFee,
    Sem5TutionFee : req.body.Sem5TutionFee,
    Sem5SpecialFee : req.body.Sem5SpecialFee,
    Sem5InfrastructureFee : req.body.Sem5InfrastructureFee,
    Sem5UniversityFee : req.body.Sem5UniversityFee,
    Sem6TutionFee : req.body.Sem6TutionFee,
    Sem6SpecialFee : req.body.Sem6SpecialFee,
    Sem6InfrastructureFee : req.body.Sem6InfrastructureFee,
    Sem6UniversityFee : req.body.Sem6UniversityFee,
    
   });
    const addFeeEstimate = FeeEstimates.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
   
   
}