var mongoose = require('mongoose');

var FeeMasterSchema = mongoose.Schema({
    
    SNo :{ type: Number, unique: true},
    Course: String,
    CNo : Number,
    FeeType : String,
    Description : String,
    Lateral : String,
    Head  : String,
    FeeSem : Number, 
    Academicyear : String,
    Amount : { type: Number, default: 0 },

    CouType: String,
    Typeoffee: String,
    //College Fees
    TuitionFee: { type: Number, default: 0 },
    LabFee: { type: Number, default: 0 },
    InternetFee: { type: Number, default: 0 },
    SpecialFee: { type: Number, default: 0 },
    InfrastructureFee: { type: Number, default: 0 },
    CapsaFee: { type: Number, default: 0 },
    DevelopmentchargeFee: { type: Number, default: 0 },
    StudentJournalFee: { type: Number, default: 0 },
    AmenitiesFee: { type: Number, default: 0 },
    Plus2verificationFee: { type: Number, default: 0 },
    TotalcollegeFee: { type: Number, default: 0 },
    //University Fees
    RegistrationFee: { type: Number, default: 0 },
    RecognitionFee: { type: Number, default: 0 },
    MatriculationFee: { type: Number, default: 0 },
    CulturalFee: { type: Number, default: 0 },
    SportsFee: { type: Number, default: 0 },
    YouthDevelopmentFee: { type: Number, default: 0 },
    NSSFee: { type: Number, default: 0 },
    GroupInsuranceFee: { type: Number, default: 0 },
    UnivInfrastructureFee: { type: Number, default: 0 },
    FlagDayFee: { type: Number, default: 0 },
    UniversityTotalFee: { type: Number, default: 0 },
    GrandTotalFee: { type: Number, default: 0 },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('FeeMaster', FeeMasterSchema);