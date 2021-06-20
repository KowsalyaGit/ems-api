var mongoose = require('mongoose');

var FeeMasterSchema = mongoose.Schema({
    SNo : Number,
    Course: String,
    CNo : Number,
    FeeType : String,
    Description : String,
    Lateral : String,
    Head  : String,
    FeeSem : Number, 
    Academicyear : String,
    Amount : { type: Number, default: 0 },
    
   
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('FeeMaster', FeeMasterSchema);