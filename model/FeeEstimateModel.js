var mongoose = require('mongoose');

var FeeEstimateSchema = mongoose.Schema({

    ApplnNo : String,
    Name : String,    
    FatherName : String,
    AcademicYear : String,
    Yearofstudy : String,
    Sem1TutionFee : String,
    Sem1SpecialFee : String,
    Sem1InfrastructureFee : String,
    Sem1UniversityFee : String,
    Sem2TutionFee : String,
    Sem2SpecialFee : String,
    Sem2InfrastructureFee : String,
    Sem2UniversityFee : String,
    Sem3TutionFee : String,
    Sem3SpecialFee : String,
    Sem3InfrastructureFee : String,
    Sem3UniversityFee : String,
    Sem4TutionFee : String,
    Sem4SpecialFee : String,
    Sem4InfrastructureFee : String,
    Sem4UniversityFee : String,
    Sem5TutionFee : String,
    Sem5SpecialFee : String,
    Sem5InfrastructureFee : String,
    Sem5UniversityFee : String,
    Sem6TutionFee : String,
    Sem6SpecialFee : String,
    Sem6InfrastructureFee : String,
    Sem6UniversityFee : String,
    HostelFee : String,
    MessFee : String,
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Estimate', FeeEstimateSchema);