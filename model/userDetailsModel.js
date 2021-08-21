var mongoose = require('mongoose');

var userDetailsSchema = mongoose.Schema({
    ID : { type: Number, unique: true},
    UserID :{ type: String, unique: true},
    Password : String,
    UserName : String,
    Qualification : String,
    Designation : String,
    Department : String, 
    Contact : String,
    Role : String,  
    Remark : String, 
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('userDetails', userDetailsSchema);