var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Socket.io
var socketio = require('socket.io');
var app = express();
var io = socketio();
app.io = io;

// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ged');
var Vote = require('./models/votes');
var Punch = require('./models/punch');

// routes
var routes = require('./routes/index')(io, Vote, Punch);

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
      if (req.path.substr(-1) != '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path + '/' + query);
      } else {
        next();
      }
    }
);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// expose socket(io, Vote) so that the server's socket
// listens to the functions defined in ./socket.js file
var socket_ = require('./socket')(io, Vote);
module.exports = app;
