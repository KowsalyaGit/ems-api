var mongoose = require('mongoose');

var FeeMasterSchema = mongoose.Schema({
    SNo : Number,
    FeeType :{ type: String, unique: true},
    Description : { type: String, unique: true},
    Amount : { type: Number, default: 0 },
    CNo : { type: Number, unique: true},
    FeeSem : { type: Number, unique: true},
    Lateral : String, 
    Academicyear : { type: String, unique: true},
    Head  : String,  
   
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('FeeMaster', FeeMasterSchema);