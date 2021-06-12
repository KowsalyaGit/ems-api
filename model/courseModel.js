var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    
    CNo:{ type: Number, unique: true},
    Branch : String,
    Course: String,    
    Intake:  { type: Number, default: 0 },
    AddlSeats : { type: Number, default: 0 },
    GQ: { type: Number, default: 0 },
    MQ : { type: Number, default: 0 },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('course', courseSchema);