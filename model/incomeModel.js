var mongoose = require('mongoose');

var incomeSchema = mongoose.Schema({
    RNo : Number,
    PDate :{ type: Date, default: Date.now()},
    TempNo :{ type: Number, unique: true},
    StuRollNo :{ type: String, unique: true},
    Sem :{ type: Number, unique: true},
    FeeType :{ type: String, unique: true},
    Description : String,
    Amount :{ type: Number, default: 0 },
    Discount :{ type: Number, default: 0 },
    Head : String,
    StuName : String,
    Course : String,
    CNo : Number,
    Paid :{ type: Number, default: 0 },
    Balance :{ type: Number, default: 0 },
    Fine :{ type: Number, default: 0 },
    Remark : String,
    Status : String,
    CashType : String,
    GrpName : String,
    Syear : String,
    temp : String,
    CashType1 : String,
    GrpName1 : String,
    Syear1 : String,
    FeeTerm : String,
    temp1 : String,
    BusNo : String,
    BusMonth : Number,
    PaidStatus : { type: Number, default: 0 },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('income', incomeSchema);