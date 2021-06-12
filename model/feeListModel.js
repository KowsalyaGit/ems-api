var mongoose = require('mongoose');

var feeListSchema = mongoose.Schema({
    FeeNo : Number,
    FeeType :{ type: String, unique: true},
    GroupName : String,
    Description : String,
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('feeList', feeListSchema);