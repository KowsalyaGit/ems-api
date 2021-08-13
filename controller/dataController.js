// Import data model
Data = require('../model/dataModel');
const multer = require('multer');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const get = require('mongoose/lib/helpers/get');
const nodemailer = require('nodemailer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, '' + Date.now() + '-' + file.originalname);
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/)) {
        req.fileValidationError = 'Please select .JPG, .PNG or .PDF files only';
        return cb(new Error('Please select .JPG, .PNG or .PDF files only'), false);
    }
    cb(null, true);
};

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

//Get All
exports.index = function (req, res) {
    Data.get(function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: data
        });
    });
};

exports.appNo = function (req, res) {
 const mailData = {
            from: process.env.SMTP_USER,  // sender address
              to: req.body.email,   // list of receivers
              subject: 'Admission Details',
              text: 'Your Application Number is: ',
              html: '<b>Hey there, Welcome! </b>' +
                     '<br> <strong>Your Admission details:</strong><br/>'+
                     '<br> <strong>Your Application has been submitted successfully !!! </strong><br/>'+                     
                     '<br> Your Application Number is: '+ req.body.appno
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
               // console.log(info);
                res.json({
                    status: "success",
                    data: info
                  });
                
            }
               
        });
}
// Save
exports.new = function (req, res) {

    Data.find({aadhaarNum: req.body.aadhaarNum},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
      
       //  res.json(data);
    if(data.length != 0){
        return res.json({
            status: "Aadhaar_Exist",
            message: "Aadhaar Number Already Exist",
        });
    }
    else
        {
        var currentYear = new Date();
         req.body.Syear = currentYear.getFullYear();
         var acyear=currentYear.getFullYear() + 1;
         req.body.Academicyear = currentYear.getFullYear() + '-' + acyear; 
       
         var ayear=currentYear.getFullYear();
         var twoDigitYear = ayear.toString().substr(-2);
        //  req.body.ApplnNo = twoDigitYear + 'U' + '0001';          

        Data.find({coutype:req.body.coutype}).limit().sort({ApplnNo : -1}).lean().exec(function(err,data){
          if (err) {
            res.json({
                status: "error",
                message: err,
            });
           } 

                if(data.length !=0){           
                
                var appNoArray = data[0].ApplnNo.split(req.body.coutype == 'UG' ? 'U' : 'P');
                var lastappNo = parseInt(appNoArray[appNoArray.length - 1]);
                lastappNo ++;    
                var int_length = (''+lastappNo).length;                 
                     if (int_length==1)  {
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '000' + lastappNo;
                     }   
                     else if (int_length==2){
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '00' + lastappNo;
                     }   
                     else if (int_length==3){
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '0' + lastappNo;
                    }  
                     else if (int_length==4){
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '' + lastappNo;
                    }                        
                //req.body. ApplnNo= twoDigitYear + (req.body.coutype == 'UG' ? 'U' : 'P') + '000' + lastappNo;
               
            }else{
                //console.log(data.length);
                req.body.ApplnNo = twoDigitYear + (req.body.coutype == 'UG' ? 'U' : 'P') + '0001';
            }


        var appn ;
        var flag = 0;
        appn =  req.body.ApplnNo                    
        if(data.length !=0){                                                      
              for(i = 0; i < data.length; i++) {                  
                  var appno = data[i].ApplnNo;
                  if (appno == appn) {
                      flag++;
                  } 
              }

              function LoopData(){
                  flag = 0;
                  if(data.length !=0){ 
                  for(i = 0; i < data.length; i++) {                  
                  var appno = data[i].ApplnNo;
                  if (appno == appn) {
                      flag++;
                  } 
                 }
                }
              }

            if (flag == 0 && data.length !=0) {
                    saveData()
            } else if (flag != 0 && data.length !=0){
                    appn = appn.split(req.body.coutype == 'UG' ? 'U' : 'P');
                    var lastappNo = parseInt(appn[appn.length - 1]);
                    lastappNo ++;    
                    var int_length = (''+lastappNo).length;                 
                     if (int_length==1)  {
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '000' + lastappNo;
                     }   
                     else if (int_length==2){
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '00' + lastappNo;
                     }   
                     else if (int_length==3){
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '0' + lastappNo;
                    }  
                     else if (int_length==4){
                        req.body. ApplnNo= twoDigitYear +  (req.body.coutype == 'UG' ? 'U' : 'P')  + '' + lastappNo;
                    }  
                    if (flag != 0 && data.length !=0) {
                        Data.find({coutype:req.body.coutype}).limit().sort({ApplnNo : -1}).lean().exec(function(err,data){
                            if (err) {
                            res.json({
                            status: "error",
                            message: err,
                            });
                           } 
                        appn =  req.body.ApplnNo   
                        if(data.length !=0){ 
                            LoopData();
                            //goto loop1;  
                        } 
                      });                                               
                    }                                                
                    //saveData();         
            }
         }  else if(data.length ==0){                    
                    req.body.ApplnNo = twoDigitYear + (req.body.coutype == 'UG' ? 'U' : 'P') + '0001'; 
                    saveData(); 
            }                       
     });
   function saveData(){
    var data = new Data(req.body);
    data.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }       
        
        res.json({
            status: "success",
            data: data
        });
    });
   }
    }
         
    });  
       
};

//View
exports.view = function (req, res) {
    Data.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
        res.json({
            status: 'success',
            data: data
        });
    });
};

exports.Application = function (req, res) {
    Data.findOne({ApplnNo:req.params.ApplnNo}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};

//AppSales

exports.ApplicationSales = function (req, res) {

    // Data.aggregate([
    //     {
    //         "$facet":{
    //             "UGtotal":[{ "$match":{
    //                 "coutype" :"UG",

    //                 //"AdmissionDate":{ "$cond": [ { "$lt": ["$value", "2021-07-25" ] }]}                  
       
    //                 //"AdmissionDate":{"$cond": { if: { "$gte": ["2021-07-25" ]}}}     
    //             }},{"$count":"UGtotal"}
    //             ]
    //     }
    //     }],function(err,data){
    //             if(err){
    //         res.json(err)
    //     }
    //   console.log(data)
    //     res.json({
    //         status: 'success',
    //         data: data
    //     });
        
    // });
    var query;
        if(req.params.coutype !== "All"){
            query =  {coutype: req.params.coutype , AdmissionDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
        }else{
            query =  { AdmissionDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
        }

    Data.countDocuments(query,function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };


exports.AllCourse = function (req, res) {

var que;
if(req.params.Course !== "All"){
   que = {courseChoice1:req.params.Course,AdmissionDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'}}
}else{
    que = {AdmissionDate:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'}}
}

    
    Data.countDocuments(que,function(err,data){

        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
        
    });
};


//getCourse
exports.Courses = function (req, res) {
    Data.find({courseChoice1:req.params.Course}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};

//UGCourse -- count
exports.UGCourse = function (req, res) {
    Data.find({coutype:"UG"},function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: data
        });
    });
};

// Update
exports.update = function (req, res) {
    Data.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
            
        //console.log(req.body.ApplnNo);    
        data = Object.assign(data, req.body);

        data.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: 'success',
                data: data
            });
        });
    });
};

exports.AppUpdateForm = function (req, res) {
    Data.updateOne({ApplnNo:req.body.ApplnNo},{$set:(req.body)
        
    },function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });
};

exports.deleteData = function (req, res) {
    
    Data.deleteOne({ApplnNo:req.params.ApplnNo},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });
};

exports.updateStatus = function (req, res) {

    Data.updateOne({ApplnNo:req.body.ApplnNo},{$set:{
        
        Sem : req.body.Sem,
        Section : req.body.Section,
        Admissionstatus : req.body.Admissionstatus,
        CNo : req.body.CNo,        
        Course : req.body.Course,

    }},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });

};

exports.upload = function (req, res) {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('certificate');

    upload(req, res, function(err) {

        if (req.fileValidationError) {
            return res.json({
                status: 'error',
                msg: req.fileValidationError
            });
        }
        else if (!req.file) {
            return res.json({
                status: 'error',
                msg: 'Please upload a file'
            });
        }
        else if (err) {
            return res.json({
                status: 'error',
                msg: err
            });
        }

        return res.json({
            status: 'success',
            file: req.file.filename
        });
    });
}

exports.download = function (req, res) {
    const file = __dirname + '../../uploads/' + req.params.file;
    const filename = path.basename(file);
    const mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    const filestream = fs.createReadStream(file);
    filestream.pipe(res);
}