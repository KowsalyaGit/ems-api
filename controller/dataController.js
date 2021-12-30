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


exports.BcCount = function (req, res) {

    Data.countDocuments({community:"BC",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

 
exports.OcCount = function (req, res) {

    Data.countDocuments({community:"OC",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

exports.BcmCount = function (req, res) {

    Data.countDocuments({community:"BCM",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

exports.MbcCount = function (req, res) {

    Data.countDocuments({community:"MBC",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

exports.DncCount = function (req, res) {

    Data.countDocuments({community:"DNC",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

exports.DntCount = function (req, res) {

    Data.countDocuments({community:"DNT",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

 
exports.ScCount = function (req, res) {

    Data.countDocuments({community:"SC",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

 exports.ScaCount = function (req, res) {

    Data.countDocuments({community:"SCA",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

exports.StCount = function (req, res) {

    Data.countDocuments({community:"ST",coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };

 exports.TotalCount = function (req, res) {

    Data.countDocuments({coutype:req.params.coutype,Course:req.params.Course,Admissionstatus:"Confirm"},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
 };


//AppSales

exports.ApplicationSales = function (req, res) {

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

exports.Translist = function (req, res) {
    Data.find({Academicyear:req.params.Academicyear,coutype:req.params.coutype,TransferFrom:{$ne:" "}}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};

exports.StudentNameList = function (req, res) {
     var stdlist;
   
    if (req.params.Course == "All" , req.params.Admissionstatus == "All"){
         stdlist = {Academicyear:req.params.Academicyear,Sem:req.params.Semester}
    }
    else if (req.params.Course != "All",req.params.Admissionstatus != "All"){
        stdlist =  {Course:req.params.Course,Admissionstatus:req.params.Admissionstatus,Academicyear:req.params.Academicyear,Sem:req.params.Semester}
    }
    else if ( req.params.Course == "All",req.params.Admissionstatus != "All"){
          stdlist = {Admissionstatus:req.params.Admissionstatus,Academicyear:req.params.Academicyear,Sem:req.params.Semester}
     }
    else if (req.params.Course != "All",req.params.Admissionstatus == "All"){
        stdlist = {Course:req.params.Course,Academicyear:req.params.Academicyear,Sem:req.params.Semester}
    }
    Data.find(stdlist, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};

exports.StudentFullData = function (req, res) {
    Data.find({Academicyear:req.params.Academicyear,Course:req.params.Course}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};


exports.SectionAllotment = function (req, res) {
    Data.find({Academicyear:req.params.Academicyear,Course:req.params.Course,Admissionstatus:"Confirm"}, function (err, data) {
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
exports.AllCourses = function (req, res) {
    Data.find({Course:req.params.Course,Sem:req.params.Semester,Admissionstatus:"Confirm"}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};


exports.UniversityAdmission = function (req, res) {
    Data.find({Course:req.params.Course,Academicyear:req.params.Academicyear,Admissionstatus:"Confirm"}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
    });
};

exports.Courses = function (req, res) {
    Data.find({Course:req.params.Course}, function (err, data) {
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
    
    Data.deleteOne({aadhaarNum:req.params.aadhaarNum},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data); 
    });
};

//Attendance
exports.Attendance = function (req, res) {
    Data.find({Course:req.params.Course,Section:req.params.Section,Sem:req.params.Semester}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        res.json({
            status: 'success',
            data: data
        });
       
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


exports.CourseTransfer = function (req, res) {

    Data.updateOne({ApplnNo:req.body.ApplnNo},{$set:{  
             
        Course : req.body.Course,
        CNo : req.body.CNo,   
        TransferFrom : req.body.TransferFrom,
        TransferFromCNo : req.body.TransferFromCNo,
        DateOfTransfer : req.body.DateOfTransfer,
        FromCourseTotal : req.body.FromCourseTotal,
        ToCourseTotal : req.body.ToCourseTotal,
        DiffAmount : req.body.DiffAmount,

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

exports.SectionAlertment = function (req, res) {

    Data.updateOne({ApplnNo:req.body.ApplnNo},{$set:{  
             
        Section : req.body.Section,

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


exports.TcUpdate = function (req, res) {

    Data.updateOne({ApplnNo:req.params.ApplnNo},{$set:{  
             
        Admissionstatus : "Left",

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



exports.ChallonGenerate = function (req, res) {


// Data.aggregate([
    
//     { "$match": { Academicyear:req.params.Academicyear,Course:req.params.Course,Sem:req.params.FeeSem } },
    
//     {
// $lookup:
//     {
//         from: "feemasters",
//         // localField: "CNo",
//         // foreignField : "CNo",
//         as: "dataFeeMaster",
//         let: { CNo: '$CNo' },
//          pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   { $eq: ['$CNo', '$$CNo'] },
//                   { $eq: ['$Sem', req.params.FeeSem ] },
//                 ]
//               }
//             }
//           }
//         ]
//     }
//     }]).exec((err, result)=>{
//       if (err) {
//           res.json("error" ,err);
//       }
//                 if (result) {
//           res.json(result);
//       }
//     })




Data.aggregate([
    
     { "$match": { Academicyear:req.params.Academicyear,Course:req.params.Course,Sem:parseInt(req.params.FeeSem) } },
    
    {
$lookup:
    {
        from: "feemasters",
        localField: "CNo",
        foreignField : "CNo",
        as: "dataFeeMaster"
    }
    }]).exec((err, result)=>{
      if (err) {
          res.json("error" ,err);
      }
                if (result) {
          res.json(result);
      }
    })   

};



exports.lastappNo = async (req, res) => {

   
    Data.find().limit(1).sort({createdAt : -1}).lean().exec(function(err,data){
        if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
    });
    
}










