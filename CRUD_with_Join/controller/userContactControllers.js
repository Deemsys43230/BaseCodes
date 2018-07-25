var User = require('../models/userContact');

//Create User Post
exports.addUserContact = function(req,res) {
    var user = new User(req.body);
    user.save(function(err, user){
        if(err){
            res.status(400).json({
                Message: "Unable To save the user",
                Error: err
            });
        }
        else{
            res.status(200).json({
                Message:"User Saved succefully",
                user:user
            });
        }
    });
}