/**
 * Created by Manjesh on 14-05-2016.
 */

var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;
var config = require('../../config');
var db = config.db === require('./mongodb');

var oauth = require('./oauth')

module.exports = function(app){
  app.all('/oauth/token', function(req,res,next){
    // request is grant type
    var request = new Request(req);
    var response = new Response(res);

    oauth
      .token(request,response)
      .then(function(token) {
        // Todo: remove unnecessary values in response
        return res.json(token)
      }).catch(function(err){
        return res.status(500).json(err)
      })
  });

}
