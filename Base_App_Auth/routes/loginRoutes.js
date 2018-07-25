const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/login');
const users = require('../models/register');
const jwt = require('jsonwebtoken');
var VerifyToken = require('./loginVerify');
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable

router.get('/users', function(req, res) {
  let user = users.find({});
  user.exec((err, users) => {
    res.json(users);
  });
});   

router.post('/login', function(req, res) {
  // find the user
  let loginData = {
    email: req.body.email,
    password: req.body.password
  };
  users.findOne(loginData).lean().exec(function(err, user){
    if(err){
        return res.json({error: true});
    }
    if(!user){
        return res.status(404).json({'message':'User not found!'});
    }
    console.log(user);
    let token = jwt.sign(user, global.config.jwt_secret, {
        expiresIn: 1440 // expires in 1 hour
    });
    res.json({error:false, token: token});
})

  // User  .findOne({
  //   email: req.body.email
  // }, function(err, user) {
  //   if (err) throw err;

  //   if (!user) {
  //     res.json({ success: false, message: 'Authentication failed. User not found.' });
  //   } else if (user) {

  //     // check if password matches
  //     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  //     if (!passwordIsValid) {
  //       res.json({ success: false, message: 'Authentication failed. Wrong password.' });
  //     } else {

  //       // if user is found and password is right
  //       // create a token with only our given payload
  //   // we don't want to pass in the entire user since that has the password
  //       const payload = {
  //         email: user.email,
  //         username : user.username,
  //         password: user.password
  //       };
  //       var token = jwt.sign(payload, 'superSecret', {expiresIn: 1440 });
  //       res.json({
  //         success: true,
  //         message: 'Enjoy your token!',
  //         token: token
  //       });
  //     }   

  //   }

  // });
});

router.get('/me', VerifyToken, function(req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

module.exports = router;