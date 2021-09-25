Bonafide = require('../model/BonafideModel');
require('dotenv').config();

//save 
exports.saveBonafide = async (req, res) => {

    const Bonafides = new Bonafide({
     
    ApplnNo : req.body.ApplnNo,
    Course : req.body.Course,
    Name : req.body.Name,
    FatherName : req.body.FatherName,
    Semester : req.body.Semester,
    AcademicYear : req.body.AcademicYear,
    Dob : req.body.Dob,
    Hosteller : req.body.Hosteller,
    
   });
    const addBonafide = Bonafides.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
   
   
}


exports.getBonafide = async (req, res) => {

    const getTcs  = Bonafide.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}