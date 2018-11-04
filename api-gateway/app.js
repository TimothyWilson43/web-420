var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); 
mongoose.Promise = require('bluebird');
var apiCatalog = require('./routes/api-catalog');

var indexRouter = require('./routes/index');

// Database connection
mongoose.connect('mongodb://admin:password1@ds031892.mlab.com:31892/api-gateway', {
promiseLibrary: require('bluebird')
}).then ( () => console.log('mongoose connection successful')) .catch( (err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiCatalog);

app.use('/', indexRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('request made', request); 
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

module.exports = app