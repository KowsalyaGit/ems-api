var mongoose = require('mongoose');

var transportSchema = mongoose.Schema({

    BusName : String,
    BusNo : Number,
    VehicleNo : String,
    SingleTripKM : Number,
    
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('transport', transportSchema);