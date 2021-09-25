Tc = require('../model/TcModel');
require('dotenv').config();

//save 
exports.saveTc = async (req, res) => {

    Tc.find().limit(1).sort({createdAt : -1}).lean().exec(function(err,data){
        if(err){
            res.json(err)
        }
        if(data.length !=0){
            var TcNumber = data[0].TcNo;           
            req.body.TcNo = ++TcNumber;
            saveData();
        }
        else{
            //console.log(data.length);
            req.body.TcNo = 1; 
            saveData();
        }
    });

    function saveData(){

    const Tcs = new Tc({
     
    ApplnNo : req.body.ApplnNo,
    TcNo : req.body.TcNo,
    Course : req.body.Course,
    Name : req.body.Name,
    FatherName : req.body.FatherName,
    MotherName : req.body.MotherName,
    Nationality : req.body.Nationality,
    Religion : req.body.Religion,
    DateofAdmission : req.body.DateofAdmission,
    DateofLeaving : req.body.DateofLeaving,
    Semester : req.body.Semester,
    AcademicYear : req.body.AcademicYear,
    Dob : req.body.Dob,
    Part1 : req.body.Part1,
    Part2 : req.body.Part2,
    Part3 : req.body.Part3,
    Promotion : req.body.Promotion,
    
    
   });
    const addTc = Tcs.save(function(err,data){
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


exports.getTc = async (req, res) => {

    const getTcs  = Tc.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}


exports.getCoursewiseTc = async (req, res) => {

    const getcoursewiseTcs  = Tc.find({Course: req.params.Course},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}