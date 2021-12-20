var mongoose = require('mongoose');

var incomeSchema = mongoose.Schema({
    // RNo : Number,
    // PDate :{ type: Date, default: Date.now()},
    // TempNo : { type: Number, default: 0 },
    // StuRollNo :{ type: String, unique: true},
    // Sem :{ type: Number, unique: true},
    // FeeType :{ type: String, unique: true},
    // Description : String,
    // Amount :{ type: Number, default: 0 },
    // Discount :{ type: Number, default: 0 },
    // Head : String,
    // StuName : String,
    // Course : String,
    // CNo : Number,
    // Paid :{ type: Number, default: 0 },
    // Balance :{ type: Number, default: 0 },
    // Fine :{ type: Number, default: 0 },
    // Remark : String,
    // Status : String,
    // CashType : String,
    // GrpName : String,
    // Syear : String,
    // temp : String,
    // CashType1 : String,
    // GrpName1 : String,
    // Syear1 : String,
    // FeeTerm : String,
    // temp1 : String,
    // BusNo : String,
    // BusMonth : Number,
    // PaidStatus : { type: Number, default: 0 },
     RNo : { type: Number, unique: true},
     ApplnNo : { type: String, unique: true},
     Regno: { type: String, unique: true},
     Name : String,
     ReceiptDate : Date,
     Course : String,
     //Amount : Number,
     CNo : Number,
     FeeType : String,
     FeeSem : Number,
     Academicyear : String,
     Status: String,
     paymentMode: String,

     Typeoffee:String,


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
    

    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }
}
,{
    timestamps : true
});


module.exports = mongoose.model('income', incomeSchema);