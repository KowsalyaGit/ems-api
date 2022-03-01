transport = require('../model/transportModel');
require('dotenv').config();

//save 
exports.saveTransport = async (req, res) => {

    
    transport.find({BusNo : req.body.BusNo}, function (err, data) {
        if(err){
            res.json(err)
        }
      
        if(data.length ==0){
           
           SaveTransport();
        }
        else{
            return res.json({
            status: "err",
            message: err,
        });
           
        }
       
    });
    function SaveTransport(){
    const transports = new transport({
    
    BusName : req.body.BusName,
    BusNo : req.body.BusNo,
    VehicleNo : req.body.VehicleNo,
    SingleTripKM : req.body.SingleTripKM,
    

   });
    transports.save(function(err,data){
    if (err) {
        return res.json({
            status: "error",
            message: err,
        });
    }
    res.json(data);
});
    }
}


exports.getTransport = async (req, res) => {

     transport.find(function(err,data){

        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);
        
    });
}


exports.updateTransport = async (req, res) => {
    
    transport.updateOne({BusNo:req.body.BusNo},{$set:{
       
        BusName : req.body.BusName,
        VehicleNo : req.body.VehicleNo,    
        SingleTripKM : req.body.SingleTripKM,
        

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


exports.deleteTransport = async (req, res) => {

 transport.deleteOne({BusNo: req.params.BusNo},function(err,data){
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json(data);   
    });       
}
