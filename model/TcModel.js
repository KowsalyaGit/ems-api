var mongoose = require('mongoose');

var TcSchema = mongoose.Schema({
   
    ApplnNo : String,
    TcNo : { type: Number, unique: true},
    Course : String,
    Name : String,    
    FatherName : String,
    MotherName : String,
    Nationality : String,
    Religion : String,
    DateofAdmission : String,
    DateofLeaving : String,
    Semester : String,
    AcademicYear : String,
    Dob : String,
    Part1 : String,
    Part2 : String,
    Part3 : String,
    Promotion : String,
    
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }
}
,{
    timestamps : true
});

module.exports = mongoose.model('Tc', TcSchema);