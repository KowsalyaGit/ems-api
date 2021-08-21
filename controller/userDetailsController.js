UserDetails = require('../model/userDetailsModel');
require('dotenv').config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const { userId, password, role} = req.body;
    
     let userdetails = await UserDetails.findOne({
        $or: [
          { 'UserID': userId },
          { 'Password': password },
          { 'Role': role}
        ]
      });

      if(!userdetails) {
        return res.json({
            status: "error",
            message: "User does not exist",
        });
      }

      //const isMatch = await bcrypt.compare(password, userdetails.Password);
            
      const isMatch = await (req.body.password == userdetails.Password);  

      const rolenew = userdetails.userId ? userdetails[0].userId : userdetails.Role;

      //console.log(rolenew);  

                                                    
      if(!isMatch) {
        return res.json({
            status: "error",
            message: "Incorrect password",
        });
      }

      const payload = {
        userdetails: {
            id: userdetails._id,
            role: userdetails.role
        }
        };

        jwt.sign( payload, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                return res.json({
                    status: "error",
                    message: err,
                });
            }

            return res.json({status: "success", token: token, role: rolenew});
        });                  

}