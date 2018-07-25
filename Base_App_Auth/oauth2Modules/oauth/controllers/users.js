const mongodb = require('../mongodb');

const User = mongodb.User;
var OAuthClient = mongodb.OAuthClient;

module.exports.createUser = (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(function(user) {
       res.json({
           user: user
       })
        return OAuthClient.find({}).remove()
          .then(function() {
            OAuthClient.create({
                client_id:'democlient',
                client_secret:'democlientsecret',
                redirect_uri:'http://localhost/cb',
                User:user._id
              })
              .then(function(client) {
              }).catch(console.log);
          });

      }).catch(function (err) {
        res.json({
            Error: err
        })
      });
};
