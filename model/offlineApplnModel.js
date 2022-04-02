var mongoose = require('mongoose');

var offlineApplnSchema = mongoose.Schema({

    ApplnNo:  { type: String, unique: true},
    firstName : String,
    lastName : String,
    mobileNum : Number,
    courseChoice1 : String,
    dob : String,
    aadhaarNum: { type: Number, unique: true},
    religion : String,
    community : String,
    permanentAddress : String,
    permanentPincode : Number,
    Academicyear : String,
    coutype: String,
    Amount : Number,
    Sem: Number, 
    Admissionstatus: { type: String, default: " " },
    Course:  { type: String, default: " " }, 
    FeeStatus : String,
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('offlineAppln', offlineApplnSchema);