offlineAppln = require('../model/offlineApplnModel');
require('dotenv').config();

//save 
exports.saveofflineAppln = async (req, res) => {

    offlineAppln.find({mobileNum: req.body.mobileNum},function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
      
       //  res.json(data);
    if(data.length != 0){
        return res.json({
            status: "Mobile Number _Exist",
            message: "Mobile Number Already Exist",
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

         offlineAppln.find({coutype:req.body.coutype}).limit().sort({ApplnNo : -1}).lean().exec(function(err,data){
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
    const offlineApplns = new offlineAppln({
    
        ApplnNo: req.body.ApplnNo,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        mobileNum : req.body.mobileNum,
        courseChoice1 : req.body.courseChoice1,
        dob : req.body.dob,
        aadhaarNum : req.body.aadhaarNum,
        religion : req.body.religion,
        community : req.body.community,
        permanentAddress : req.body.permanentAddress,
        permanentPincode : req.body.permanentPincode,
        Academicyear : req.body.Academicyear,
        coutype : req.body.coutype,
        Amount : req.body.Amount,
        Sem : req.body.Sem,
        FeeStatus : req.body.FeeStatus,
        
    
       });
       offlineApplns.save(function (err) {
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
}


exports.getUGofflineAppln = async (req, res) => {

    offlineAppln.find({coutype:"UG"},function(err,data){

       if (err) {
           return res.json({
               status: "error",
               message: err,
           });
       }
       res.json(data);
       
   });
}


exports.DatewiseReport = function (req, res) {


    var query;
     
           query = {FeeStatus:"PAID",createdAt:{$gte: req.params.FromDate+'T00:00:00.000Z',$lte: req.params.ToDate+'T23:59:59.000Z'} }
       


       offlineAppln.find(query, function (err, data) {
       if(err){
           res.json(err)
       }
     
       res.json({
           status: 'success',
           data: data
       });
      
   });
};


exports.CoursewiseReport = function (req, res) {


    var query;
     
           query = {FeeStatus:"PAID",Academicyear:req.params.Academicyear,courseChoice1:req.params.Course  }
       

       offlineAppln.find(query, function (err, data) {
       if(err){
           res.json(err)
       }
     
       res.json({
           status: 'success',
           data: data
       });
      
   });
};


exports.getApplnNo = async (req, res) => {

    offlineAppln.find({ApplnNo:req.params.ApplnNo},function(err,data){

       if (err) {
           return res.json({
               status: "error",
               message: err,
           });
       }
       res.json(data);
       
   });
}


exports.getUGAcademicyear = async (req, res) => {

    offlineAppln.find({Academicyear:req.params.Academicyear,coutype:"UG"},function(err,data){

       if (err) {
           return res.json({
               status: "error",
               message: err,
           });
       }
       res.json(data);
       
   });
}


exports.getPGAcademicyear = async (req, res) => {

    offlineAppln.find({Academicyear:req.params.Academicyear,coutype:"PG"},function(err,data){

       if (err) {
           return res.json({
               status: "error",
               message: err,
           });
       }
       res.json(data);
       
   });
}



exports.getAYearCourse = async (req, res) => {

    offlineAppln.find({Academicyear: req.params.Academicyear,Course:req.params.Course},function(err,data){

       if (err) {
           return res.json({
               status: "error",
               message: err,
           });
       }
       res.json(data);
       
   });
}


exports.getPGofflineAppln = async (req, res) => {

    offlineAppln.find({coutype:"PG"},function(err,data){

       if (err) {
           return res.json({
               status: "error",
               message: err,
           });
       }
       res.json(data);
       
   });
}


exports.updateofflineAppln = async (req, res) => {
    
    offlineAppln.updateOne({ApplnNo:req.body.ApplnNo},{$set:{
       
        firstName : req.body.firstName,
        lastName : req.body.lastName,    
        mobileNum : req.body.mobileNum,
        courseChoice1 : req.body.courseChoice1,
        dob : req.body.dob,
        aadhaarNum : req.body.aadhaarNum,
        religion : req.body.religion,
        community : req.body.community,
        permanentAddress : req.body.permanentAddress,
        permanentPincode : req.body.permanentPincode,
        
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


exports.updateAdmissionstatus = async (req, res) => {
    
    offlineAppln.updateOne({ApplnNo:req.body.ApplnNo},{$set:{
       
        Course : req.body.Course,
        Admissionstatus : req.body.Admissionstatus,    
        
        
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



exports.updateStatus = async (req, res) => {
    
    offlineAppln.updateOne({ApplnNo:req.params.ApplnNo},{$set:{
       
        FeeStatus : "PAID",
       
        
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


exports.deleteofflineAppln = async (req, res) => {

    offlineAppln.deleteOne({ApplnNo: req.params.ApplnNo},function(err,data){
           if (err) {
               return res.json({
                   status: "error",
                   message: err,
               });
           }
           res.json(data);   
       });       
   }
   