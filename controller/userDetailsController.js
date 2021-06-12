UserDetails = require('../model/userDetailsModel');
require('dotenv').config();

//save userDetails
exports.saveUserDetails = async (req, res) => {
   
    const userDetails = new UserDetails({

    ID : req.body.ID,
    UserID : req.body.UserID,
    Password : req.body.Password,
    UserName : req.body.UserName,
    Qualification : req.body.Qualification,
    Designation : req.body.Designation,
    Department : req.body.Department,
    Role : req.body.Role,
    Remark  : req.body.Remark,
    
   });
   const addUser = userDetails.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
}

//getUserDetails
exports.getUserDetails = async (req, res) => {

    const getUser  = UserDetails.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.getIdUserDetails = async (req, res) => {

    const getIdUser  = UserDetails.find({ID: req.params.ID},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);

    });
}

exports.updateUserDetails = async (req, res) => {
    //console.log("prasanth");
    const User = UserDetails.updateOne({UserID:req.body.UserID},{$set:{
    
    ID : req.body.ID,
    //UserID : req.body.UserID,
    Password : req.body.Password,
    UserName : req.body.UserName,
    Qualification : req.body.Qualification,
    Designation : req.body.Designation,
    Department : req.body.Department,
    Role : req.body.Role,
    Remark  : req.body.Remark, 
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

exports.deleteUserDetails = async (req, res) => {

    const DeleteCourse = UserDetails.deleteOne({UserID:req.body.UserID},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}