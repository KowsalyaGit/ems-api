Course = require('../model/courseModel');
require('dotenv').config();

//save course
exports.saveCourse = async (req, res) => {
        
    const course = new Course({
    
    CNo : req.body.CNo,
    Branch : req.body.Branch,
    Course : req.body.Course,    
    Intake : req.body.Intake,
    AddlSeats : req.body.AddlSeats,
    GQ : req.body.GQ,
    MQ : req.body.MQ,
    
   });
   const courses = course.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}

exports.getCourse = async (req, res) => {

    const course  = Course.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.getIdCourse = async (req, res) => {

    const courseId  = Course.find({CNo: req.params.CNo},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.updateCourse = async (req, res) => {
    
    const courseUpdate = Course.updateOne({CNo:req.body.CNo},{$set:{
       
        Branch : req.body.Branch,
        Course : req.body.Course,    
        Intake : req.body.Intake,
        AddlSeats : req.body.AddlSeats,
        GQ : req.body.GQ,
        MQ : req.body.MQ,

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

exports.deleteCourse = async (req, res) => {

    const DeleteCourse = Course.deleteOne({CNo: req.body.CNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}