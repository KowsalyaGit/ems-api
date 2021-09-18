Attendance = require('../model/attendanceModel');
require('dotenv').config();

//save 
exports.saveAttendance = async (req, res) => {
   
    const Attendances = new Attendance({
       
    // SNo : req.body.SNo,
    // ADate : req.body.ADate,
    // Regno : req.body.Regno,
    // RollNo : req.body.RollNo,
    // SName : req.body.SName,
    // IsHosteller : req.body.IsHosteller,
    // Morning : req.body.Morning,
    // Evening : req.body.Evening,
    // Sem : req.body.Sem,
    // CNo : req.body.CNo,
    // Course : req.body.Course,
    // Mobile : req.body.Mobile,
    // Type : req.body.Type,
    // AMonth : req.body.AMonth,
    // Ayear : req.body.Ayear,
    
    ApplnNo : req.body.ApplnNo,
    ADate : req.body.ADate,
    SName : req.body.firstName,
    Section : req.body.Section,
    Semester : req.body.Semester,
    Session : req.body.Session,
    Mobile : req.body.mobileNum,
    Course : req.body.Course,
    CouType : req.body.CouType,
    IsHosteller : req.body.hostelReq,
    AType : req.body.Type,

   });
   const addAttendance = Attendances.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}


exports.getCoursewiseAttendance = async (req, res) => {

     Attendance.find({Course: req.params.Course ,AType: req.params.AType,Semester: req.params.Semester,Section: req.params.Section,Session: req.params.Session,ADate:{$gte: req.params.FromDate,$lte: req.params.ToDate} },function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
}


exports.getOverAllAttendance = async (req, res) => {


   //  Attendance.find({CouType: req.params.CouType,AType: req.params.AType,Session: req.params.Session,ADate:{$gte: req.params.FromDate,$lte: req.params.ToDate} },function(err,data){

var query;
if(req.params.CouType !== "All"){    
    query = {CouType: req.params.CouType,AType: req.params.AType,Session: req.params.Session,ADate:{$gte: req.params.FromDate,$lte: req.params.ToDate}}
}else{
    query = {AType: req.params.AType,Session: req.params.Session,ADate:{$gte: req.params.FromDate,$lte: req.params.ToDate}}    
}
Attendance.find(query,function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
}


// exports.getFeeList = async (req, res) => {

//     const getFeeList  = FeeList.find(function(err,data){

//         if (err) {
//             return res.json({
//                 status: "error",
//                 message: err,
//             });
//         }
//         res.json(data);

//     });
// }

// exports.getIdFeeList = async (req, res) => {

//     const getIdFeeList  = FeeList.find({FeeNo: req.params.FeeNo},function(err,data){

//         if (err) {
//             return res.json({
//                 status: "error",
//                 message: err,
//             });
//         }
//         res.json(data);

//     });
// }

// exports.updateFeeList = async (req, res) => {
    
//     const updateFeeList = FeeList.updateOne({FeeNo:req.body.FeeNo},{$set:{
            
//         FeeType : req.body.FeeType,
//         GroupName : req.body.GroupName,
//         Description : req.body.Description,

//     }},function(err,data){

//         if (err) {
//             return res.json({
//                 status: "error",
//                 message: err,
//             });
//         }
//         res.json(data); 
//     });
    
// }

// exports.deleteFeeList = async (req, res) => {

//     const DeleteFeeList = FeeList.deleteOne({FeeNo:req.params.FeeNo},function(err,data){
//         if (err) {
//             return res.json({
//                 status: "error",
//                 message: err,
//             });
//         }
//         res.json(data);   
//     });
// }