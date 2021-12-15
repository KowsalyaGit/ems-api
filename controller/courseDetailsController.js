CourseDetails = require('../model/courseDetailsModel');
require('dotenv').config();

//save courseDetails
exports.saveCourseDetails = async (req, res) => {
        
    const courseDetails = new CourseDetails({
    Sno : req.body.Sno,
    CNo : req.body.CNo,
    Course : req.body.Course,
    Branch : req.body.Branch,
    MajorSubject : req.body.MajorSubject,
    CouOrder : req.body.CouOrder,
    CouType : req.body.CouType,
    Intake : req.body.Intake,
    AddlSeats : req.body.AddlSeats,
    OCM : req.body.OCM,
    BCM : req.body.BCM,
    MBCM : req.body.MBCM,
    SCM : req.body.SCM,
    STM : req.body.STM,
    DNCM : req.body.DNCM,
    OCF : req.body.OCF,
    BCF : req.body.BCF,
    MBCF : req.body.MBCF,
    SCF : req.body.SCF,
    STF : req.body.STF,
    DNCF : req.body.DNCF,
    GoiQuota : req.body.GoiQuota,
    MgtQuota : req.body.MgtQuota, 
   });
   const course = courseDetails.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}

exports.getUGCourseDetails = async (req, res) => {

    CourseDetails.find({CouType:"UG"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}


exports.getPGCourseDetails = async (req, res) => {

    CourseDetails.find({CouType:"PG"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}


exports.getCourseDetails = async (req, res) => {

    const course  = CourseDetails.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.getIdCourseDetails = async (req,res) => {

    const course = CourseDetails.find({CNo: req.params.CNo},function(err,data){

        if(err){
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
    });
}

exports.updateCourseDetails = async (req, res) => {
    
    const course = CourseDetails.updateOne({Sno:req.body.Sno},{$set:{
    CNo : req.body.CNo,   
    Course : req.body.Course,
    Branch : req.body.Branch,
    MajorSubject : req.body.MajorSubject,
    CouOrder : req.body.CouOrder,
    CouType : req.body.CouType,
    Intake : req.body.Intake,
    AddlSeats : req.body.AddlSeats,
    // OCM : req.body.OCM,
    // BCM : req.body.BCM,
    // MBCM : req.body.MBCM,
    // SCM : req.body.SCM,
    // STM : req.body.STM,
    // DNCM : req.body.DNCM,
    // OCF : req.body.OCF,
    // BCF : req.body.BCF,
    // MBCF : req.body.MBCF,
    // SCF : req.body.SCF,
    // STF : req.body.STF,
    // DNCF : req.body.DNCF,
    // GoiQuota : req.body.GoiQuota,
    // MgtQuota : req.body.MgtQuota, 
    }},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });
    
}

exports.deleteCourseDetails = async (req, res) => {

    const DeleteCourse = CourseDetails.deleteOne({Sno:req.params.Sno},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}

exports.getCourseType = async (req, res) => {

    CourseDetails.findone({CouType:req.params.CouType},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}
