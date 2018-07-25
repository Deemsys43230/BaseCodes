const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/config');

module.exports = function(passport){
  let opts = {};      //how the token is extracted from the request or verified
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); //accepts a request as the only parameter and returns either the JWT as a string or null
  opts.secretOrKey = config.secret;   //verifying the token's signature
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => { //JWT authentication strategy (options, verify)
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
