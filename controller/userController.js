User = require('../model/userModel');
require('dotenv').config();

const password = require('secure-random-password');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
       auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
    secure: true,
    tls: {
        rejectUnauthorized: false
    }
    });

//Register
exports.register = async (req, res) => {

    const { mobileNo, emailId, role } = req.body;

    let user = await User.findOne({
        $or: [
          { 'mobileNo': mobileNo },
          { 'emailId': emailId }
        ]
      });

      if(user) {
        return res.json({
            status: "error",
            message: "User already exist",
        });
      }

      const pass = password.randomPassword();

      const salt = await bcrypt.genSalt(10);

      user = new User();
      user.mobileNo = mobileNo;
      user.emailId = emailId;
      user.role = role;
      user.password = await bcrypt.hash(pass, salt);

      user.save(function (err) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        const mailData = {
            from: process.env.SMTP_USER,  // sender address
              to: user.emailId,   // list of receivers
              subject: 'Login Details',
              text: 'Your password is: ' + pass,
              html: '<b>Hey there, Welcome! </b>' +
                     '<br> <strong>Your login details:</strong><br/>'+
                     '<br> Login URL: http://localhost:3001/login <br/>'+ 
                     '<br> Username: '+ user.emailId +' or '+ user.mobileNo +'<br/>' +
                     '<br> Password: '+ pass +'<br/>',
            };

        transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
               console.log(info);
        });

        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        jwt.sign( payload, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                return res.json({
                    status: "error",
                    message: err,
                });
                
            }

            return res.json({status: "success", token: token});
        });

    });
};
//forget Password
exports.forgetPassword = async (req, res) => {

User.findOne({emailId: req.body.emailId},async function(err,user){

    if(err){
        return res.json({           
            status: "error",
            message: "User does not exist",
        });
    }
   
if(user != null){
        const pass = password.randomPassword();
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(pass, salt);

        user.save(function (err) {
            if (err) {
                        return res.json({
                            status: "error",
                            message: err,
                        });
                    }
                    const mailData = {
                        from: process.env.SMTP_USER,  // sender address
                          to: req.body.emailId,   // list of receivers
                          subject: ' Your New Password Details ',
                          text: 'Your New password is: ',
                          html: '<b>Hey there, Welcome! </b>' +
                                 '<br> <strong>Your New Password Details:</strong><br/>'+                     
                                
                                 '<br> Your New Password is: '+ pass +'<br/>',
                        };
            
                    transporter.sendMail(mailData, function (err, info) {
                        if(err){
                           // console.log(err)
                           res.json({           
                            status: "error",
                            message: err,
                        }); 
                        }
                         
                        else{
                            //console.log(info);
                            res.json({           
                                status: "success",
                                message: info,
                            }); 
                        }
                           
                    });           
        
        });
       
    }else{
        return res.json({           
            status: "error",
            message: "User does not exist",
        });
    }
     
   

});

};
//Login
exports.login = async (req, res) => {
    const { userId, password, role } = req.body;

    let user = await User.findOne({
        $or: [
          { 'mobileNo': userId },
          { 'emailId': userId },
          { 'Role': role}
        ]
      });

      if(!user) {
        return res.json({
            status: "error",
            message: "User does not exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      const rolenew = user.userId ? user[0].userId : user.role;

      //console.log(rolenew);  

      if(!isMatch) {
        return res.json({
            status: "error",
            message: "Incorrect password",
        });
      }

      const payload = {
        user: {
            id: user._id,
            role: user.role
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