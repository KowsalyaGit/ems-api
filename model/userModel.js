var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    mobileNo: String,
    emailId: String,
    password: String,
    role: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user', userSchema);