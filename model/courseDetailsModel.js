var mongoose = require('mongoose');

var courseDetailsSchema = mongoose.Schema({
    Sno	: Number,
    CNo:{ type: Number, unique: true},
    Course: String,
    Branch : String,
    MajorSubject: String,
    CouOrder: Number,
    CouType: String,
    Intake:  { type: Number, default: 0 },
    AddlSeats : { type: Number, default: 0 },
    OCM: { type: Number, default: 0 },
    BCM: { type: Number, default: 0 },
    MBCM: { type: Number, default: 0 },
    SCM: { type: Number, default: 0 },
    STM: { type: Number, default: 0 },
    DNCM: { type: Number, default: 0 },
    OCF: { type: Number, default: 0 },
    BCF : { type: Number, default: 0 },
    MBCF : { type: Number, default: 0 },
    SCF : { type: Number, default: 0 },
    STF : { type: Number, default: 0 },
    DNCF : { type: Number, default: 0 },
    GoiQuota : { type: Number, default: 0 },
    MgtQuota : { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('courseDetails', courseDetailsSchema);