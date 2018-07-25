/**
 * Created by Manjesh on 14-05-2016.
 *
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var config = require('./../../config')
var mongodb = require('./mongodb');

var OAuthAccessToken = mongodb.OAuthAccessToken
var OAuthAuthorizationCode = mongodb.OAuthAuthorizationCode
var OAuthClient = mongodb.OAuthClient
var OAuthRefreshToken = mongodb.OAuthRefreshToken
var OAuthScope = mongodb.OAuthScope
var User = mongodb.User


//OAuthAccessToken.sync({force:config.seedDBForce})
//OAuthRefreshToken.sync({force:config.seedDBForce})
//OAuthAuthorizationCode.sync({force:config.seedDBForce})


OAuthScope.find({}).remove()
  .then(function() {
    OAuthScope.create({
        scope: 'admin',
        is_default: false
      },{
        scope: 'user',
        is_default: true
      },
      {
        scope: 'coach',
        is_default: false
      })
      .then(function() {
        console.log('finished populating OAuthScope');
      });
  });
User.find({})
  .then(function(req, res) {
    User.create = (req,res) => {
      const user = new User(req.body);
      User.save()    
      .then(function(user) {
        console.log('finished populating users',user);
        return OAuthClient.find({}).remove()
          .then(function() {
            OAuthClient.create({
                client_id:'democlient',
                client_secret:'democlientsecret',
                redirect_uri:'http://localhost/cb',
                User:user._id
              })
              .then(function(client) {
                console.log('finished populating OAuthClient',client);
              }).catch(console.log);
          });

      });
    }
  });

