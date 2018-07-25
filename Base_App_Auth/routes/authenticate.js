const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const config = require('../config/config');
const Auth = require('../models/auth');
const jsonMessage = require('../message/jsonMessage');

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
//Genarating Access Token From Refresh Token
router.post('/token', (req,res) => {
  // refresh the damn token
  // if refresh token exists
  if(req.body.refreshToken) {
      const token = jwt.sign(req.body, config.secret, { expiresIn: '604840'})
      const response = {
          "Access Token": token,
      }
      res.status(200).json(response);        
  } else {
      res.status(404).send('Invalid request')
  }
})
// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
//   console.log("Token" + req.cookies["Token"]);
  var token = req.body.token || req.query.token || req.headers['x-access-token'] ;

  // decode token
  if (token) {
    console.log(token);
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {     
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
    
  }
  
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
router.post('/logout',function(req, res){
  res.json({ message: 'successfully Log Out!' });
  /*req.session.destroy(function(){
    res.redirect('/');
  });*/
}); 
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

router.get('/users', function(req, res) {
  Auth.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/check', function(req, res) {
  res.json(req.decoded);
});


module.exports = router;
