
 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var paymentRouter = require('./routes/payment');
var courseDetailsRouter = require('./routes/courseDetails');
var userDetailsRouter = require('./routes/userDetails');
var courseRouter = require('./routes/course');
var feeMasterRouter = require('./routes/feeMaster');
var feeListRouter = require('./routes/feeList');
var incomeRouter = require('./routes/income');
var attendanceRouter = require('./routes/attendance');
var transportRouter = require('./routes/transport');
var TcRouter = require('./routes/Tc');
var BonafideRouter = require('./routes/Bonafide');
var FeeEstimateRouter = require('./routes/FeeEstimate');

require('dotenv').config()
var app = express();
app.use(cors());

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/data', dataRouter);
app.use('/payment', paymentRouter);
app.use('/course', courseRouter);
app.use('/courseDetails', courseDetailsRouter);
app.use('/userDetails', userDetailsRouter);
app.use('/feeMaster', feeMasterRouter);
app.use('/feeList', feeListRouter);
app.use('/income', incomeRouter);
app.use('/attendance', attendanceRouter);
app.use('/transport',transportRouter);
app.use('/Tc', TcRouter);
app.use('/Bonafide', BonafideRouter);
app.use('/FeeEstimate', FeeEstimateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
