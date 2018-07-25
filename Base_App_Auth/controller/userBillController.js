var User = require('../models/usersBill');

exports.creatUserBill = function(req,res) {
    var user = new User(req.body);
    user.save()
    .then(item => {
        res.status(200).json({'user': 'user added successfully'});
        console.log("post user");
    })
    .catch(err => {
        res.status(400).send({
            message:"unable to save to database",
            Error: err
        });
    });
}
exports.updateUserForConversion = function(_id) {
    console.log(_id);
    User.findById(_id, function(err, user) {
        if (!user){
            console.log("User not Found");
            return err;
        }
        else {
            User.update({'_id':_id},{$set: {status:0}},
            function(err, user) {
                if (err){
                    console.log(err.message);  // returns error if no matching object found
                }else{
                    console.log("user");
                }
            });
        }
    });
}
var response_id; // set varible access outside function
function getUser(){
    User.find(({Status:'Not Paid'}, {status:'1'}), function(err, Users){
        if (err)
            console.log(err);

        if (Users) {
            console.log("Users count : " + Users.length);
            
            Users.forEach(function(Users) {
                response = Users;
                response_id = Users._id;
                exports.updateUserForConversion(response_id);
            });
        }
    });
}

//  Defined update route
// exports.updateUserBill = function(req,res) {
//     console.log(response_id);
//     response_id = req.params.id;
//     User.findById(response_id, function(err, user) {
//         if (!user)
//             return next(new Error('Could not load Document'));
//         else {
//             // console.log(user);
//             User.update({'_id':req.params.id},{$set: {status:1}},
//             function(err, user) {
//                 if (err){
//                     res.send(err.message);  // returns error if no matching object found
//                 }else{
//                     res.send(user);
//                 }
//             });
//         }
//     });
// }



// Defined get data(index or listing) route
// userBillRoutes.route('/').get(function (req, res) {
//     User.find(function (err, coins){
//     if(err){
//       console.log(err);
//     }
//     else {
//       res.json(coins);
//       console.log("get coins");
//     }
//   });
// });

// Defined edit route
exports.getUserEdit = function (req, res) {
    console.log(req.params.id);
//   var id = req.params.id;
  User.findById({_id: req.params.id}, function (err, user){
      if(err){
          res.send(err);
      }
      res.json(user);
  });
};

// // Defined delete | remove | destroy route
// userBillRoutes.route('/delete/:id').get(function (req, res) {
//    Coin.findByIdAndRemove({_id: req.params.id}, function(err, coin){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });
exports.getUser = getUser;