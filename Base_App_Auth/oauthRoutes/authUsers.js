const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config/config');
const Auth = require('../oauthModels/authUsers');
const jsonMessage = require('../message/jsonMessage');

// For oauth Server 2 
var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;

router.post('/signUp', (req, res) => {
  var newUser = new Auth(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

  // Checking mail id
  Auth.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
    return res.status(401).send({ 
      message: 'The email address ' + req.body.email});
    }
    else {
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.status(200).send({
          success:true,
          message: jsonMessage.successMessage,
          user: user
        });
      }
    });
  }
  });
});

// Authenticate
router.post('/signIn', (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
  
    Auth.getUserByUsername(name, (err, user) => {
      if(err) throw err;
      if(!user){
          console.log(res.json.msg);
        return res.json({success: false, msg: 'User not found'});
    }
  
      Auth.comparePassword(password, user.hash_password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });
          const refreshToken = jwt.sign({data: user}, config.refreshTokenSecret, { expiresIn: '300'})
         
          res.json({
            success: true,
            token: 'JWT '+token,
            refreshToken: refreshToken,
            user: {
              id: user._id,
              name: user.name,
              password: user.password
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });

module.exports = router;
