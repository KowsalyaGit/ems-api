var mongoose = require('mongoose');

var BonafideSchema = mongoose.Schema({

    ApplnNo : String,
    Course : String,
    Name : String,    
    FatherName : String,
    Semester : String,
    AcademicYear : String,
    Dob : String,
    Hosteller : String,
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Bonafide', BonafideSchema);