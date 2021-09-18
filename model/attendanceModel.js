var mongoose = require('mongoose');

var attendanceSchema = mongoose.Schema({
    // SNo : Number,
    // ADate : String,
    // Regno : Number,
    // RollNo : Number,
    // SName : String,
    // RollNo : Number,
    // IsHosteller : String,
    // Morning : String,
    // Evening : String,
    // Sem : Number,
    // CNo : Number,
    // Course : String,
    // Mobile : Number,
    // Type : String,
    // AMonth : String,
    // Ayear : String,

    ApplnNo : String,
    ADate : Date,
    SName : String,
    Mobile : Number,
    Course : String,
    IsHosteller : String,
    Section : String,
    Semester : Number,
    Session : String,
    CouType : String,
    AType : { type: String, default: "Present" },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('attendance', attendanceSchema);