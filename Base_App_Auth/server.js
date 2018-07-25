// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
/*const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');*/
const coinRoutes = require('./routes/coinRoutes');
const contactRoutes = require('./routes/contactRoutes');
/*// const fileSystem = require('./routes/fileSystem')

const app = express();

const users = require('./routes/users');
const auth = require('./routes/authenticate');

// Port Number
const port = 4000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/coins', coinRoutes);
app.use('/authenticate', auth);


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// var express = require('express'),
  oauthserver = require('node-oauth2-server');
 
// var app = express();
 
app.configure(function() {
  app.oauth = oauthserver({
    model: {}, // See below for specification
    grants: ['password'],
    debug: true
  });
  app.use(express.bodyParser()); // REQUIRED
});
 
app.all('/oauth/token', app.oauth.grant());
 
app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area');
});
 
app.use(app.oauth.errorHandler());*/
 
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var permission = require('permission');
var config = require('./config.js')
var authenticate = require('./oauth2Modules/oauth/authenticate')
var routes = require('./routes/index');
var users = require('./routes/users');
var usersController =require('./oauth2Modules/oauth/controllers/users'); 
var formController =require('./routes/contactRoutes'); 
var xslToJsonController = require('./routes/xslToJsons');
var userBill = require('./routes/userBill');
var userSchedule = require('./routes/schedule'); //importing schedule file

var app = express();

// view engine setup
app.set('src', path.join(__dirname, 'index'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'index')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

if (config.seedMongoDB) { require('./oauth2Modules/oauth/seed-mongo'); }

/** Public Area **/

require('./oauth2Modules/oauth')(app)

/** Control Private through OAuth **/

app.use('/', routes);
app.post('/users', usersController.createUser);
app.get('/users', usersController.createUser);
app.post('/contact', formController.createContact);
app.use('/upload', xslToJsonController);
app.use('/user', userBill);
app.use('/coins', coinRoutes);

app.get('/secure', authenticate(), function(req,res){
  res.json({message: 'Secure data'})
});

app.get('/me', authenticate(), function(req,res){
  res.json({
    me: req.user,
    messsage: 'Authorization success, Without Scopes, Try accessing /profile with `profile` scope',
    description: 'Try postman https://www.getpostman.com/collections/37afd82600127fbeef28',
    more: 'pass `profile` scope while Authorize'
  })
});

// for coach authenticate
app.get('/coach', authenticate({scope:'coach'}), function(req,res){   
  res.json({
    profile: req.user
  })
});

// for admin
app.get('/admin', authenticate({scope:'admin'}), function(req,res){   
  console.log(req.user);
  res.json({
    profile: req.user
  })
});

// for users
app.get('/user', authenticate({scope:'user'}), function(req,res){   
  res.json({
    profile: req.user
  })
});

// Get all user to caoch and admin 
app.get('/authusers', authenticate({scope:'coach'}), function(req, res) {
  app.use('/coins', coinRoutes);
  res.json({"message": coinRoutes});
})

app.get("/account", permission('admin', 'coach'),  (req, res) => 
  req.send({currentUser: request.user}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.send('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.listen(4000);
console.log("App listening Port On 4000");

module.exports = app;