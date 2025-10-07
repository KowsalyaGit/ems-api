UserDetails = require('../model/userDetailsModel');
User = require('../model/userModel');
require('dotenv').config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDetails = require('../routes/userDetails');

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
    Contact : req.body.Contact,
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
    
    const User = UserDetails.updateOne({ID:req.body.ID},{$set:{
    
    UserID : req.body.UserID,
    //UserID : req.body.UserID,
    Password : req.body.Password,
    UserName : req.body.UserName,
    Qualification : req.body.Qualification,
    Designation : req.body.Designation,
    Department : req.body.Department,
    Contact : req.body.Contact,
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

    const DeleteCourse = UserDetails.deleteOne({ID:req.params.ID},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}

//AdminLogin
exports.Adminlogin = async (req, res) => {

     const { userId, password, role } = req.body;

    let user = await User.findOne({
        $or: [
            { 'mobileNo': userId },
            { 'emailId': userId }
        ]
    });
    
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User does not exist",
        });
    }

    // Plain text password comparison
    if (password !== user.password) {
        return res.status(401).json({
            status: "error",
            message: "Incorrect password",
        });
    }

    // If role is provided, check it
    if (role && role !== user.role) {
        return res.status(403).json({
            status: "error",
            message: "Incorrect role",
        });
    }

    const payload = {
        userdetails: {
            id: user._id,
            role: user.role
        }
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
        return res.status(200).json({ status: "success", token: token, role: user.role });
    });

}