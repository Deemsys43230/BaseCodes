var User = require('../models/user');
var UserContact = require('../models/userContact');

//Create User Post with contact details
exports.addUser = function(req,res) {
    var user = new User(req.body);
    user.save(function(err, user){
        if(err){
            res.status(400).json({
                Message: "Unable To save the user",
                Error: err
            });
        }
        
        var contact = new UserContact({
            phone: req.body.phone,
            address: req.body.address,
            user: user._id    // assign the _id from the person
          });
        
          contact.save(function (err, user) {
            if (err) return res.status(400).json(err);
            // thats it!
            else{
                res.status(200).json({
                    Message:"User Saved succefully",
                    user:user
                });
            }
          });
    });
}

// Populating user details with joins
exports.getUser = function(req,res) {
    UserContact.find({}).populate('user').exec(function (err, users) {
    if (err) return res.status(400).json(err);
    else{
        res.status(200).json({
            Message:"Get Method using user with join collection of contact",
            UserDetails: users
        });
    }
    // prints "The author is Ian Fleming"
  });
}

exports.updateFriends = function(req,res) {
    var requestSentId = req.body.userid;
    var requestSentIdrequestSentId = req.body.friendid;
    User.findOneAndUpdate({_id: requestSentId}, {$addToSet: {friends: requestSentIdrequestSentId}}, err => {
        if (err) {
          // failure - no friendship added
          res.status(400).json({
            Message:"1: Failed to update friends",
            Error:err
        });
        } else {
          // first friendship added, trying the second:
          User.findOneAndUpdate({_id: requestSentIdrequestSentId}, {$addToSet: {friends: requestSentId}}, (err,users) => {
            if (err) {
              // second friendship not added - rollback the first:
              res.status(400).json({
                    Message:"2: Failed to update friends",
                    Error:err
                });
              User.findOneAndUpdate({_id: requestSentId}, {$pull: {friends: requestSentIdrequestSentId}}, (err,user) => {
                if (err) {
                  // we're screwed
                  res.status(400).json({
                      Message:"3: Failed to update friends",
                      Error:err
                  });
                } else {
                  // rolled back - consistent state, no friendship
                    res.status(200).json({
                        Message:"No freindship",
                        UserDetails:user
                    });
                }
              });
            } else {
              // success - both friendships added
                res.status(200).json({
                    Message:"Updated",
                    UserDetails:users
                });
            }
          });
        }
    });
}

exports.getFriends = function(req,res) {
    User.find().populate('user').exec(function(err, users) {
        // console.log(users);
        if (err) throw err;
    
        var friends = [];
        users.forEach(function(user) {
            user.friends.forEach(function(friend) {
                console.log(friend);
                // friends.push(friend.adTime);
            });
        });
    
        res.send(users); // adTimes should contain all addTimes from his friends
    });
}