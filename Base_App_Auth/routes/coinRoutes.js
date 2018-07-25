var express = require('express');
var app = express();
var coinRoutes = express.Router();

// Require Item model in our routes module
var Coin = require('../models/coin');

// Defined store route
coinRoutes.route('/add').post(function (req, res) {
  var coin = new Coin(req.body);
   coin.save()
    .then(item => {
    res.status(200).json({'coin': 'Coin added successfully'});
    console.log("post coins");
    })
    .catch(err => {
    res.status(400).send({
      message:"unable to save to database",
      Error: err
    });
    });
});

// Defined get data(index or listing) route
coinRoutes.route('/').get(function (req, res) {
   Coin.find(function (err, coins){
    if(err){
      console.log(err);
    }
    else {
      res.json(coins);
      console.log("get coins");
    }
  });
});

coinRoutes.route('/search').post(function(req, res, next) {
  var query = {}
if(req.body.name){
  query.name={$regex:req.body.name,$options:"i"};
}
if(req.body.price){
  query.price=req.body.price;
}
console.log(query);
  var perPage = parseInt(req.body.perPage);
  var page = req.body.page;

  var fields ={
    'name': true,'price':true
  }
  Coin.find(query, fields, {
  skip: ((perPage * page) - perPage),
  limit:(perPage),offset : (page - 1) * perPage
  },function(err, coins) {
    // coins.count().exec(function(err, count) {  // For total record count
      // console.log(count);
      if (err) return next(err)
      res.send({
        coins: coins,
          currentPage: page,
          totalPages: Math.ceil(coins.length / perPage),
          limit: perPage,
          offset: (page - 1) * perPage
      })
    // })
  })
})

coinRoutes.route('/filter').post(function(req, res, next) {
  var name=req.body.name;
  console.log(name);
  if(req.body.firstname!="" && req.body.name!=""){
  var query = {$and:[{firstname:{$regex: req.body.firstname, $options: 'i'}},{name:{$regex: req.body.name, $options: 'i'}}]}

  console.log(query);
  // if(req.body.name){
  //   query.name={$regex:req.body.name,$options:"i"};
  // }
  // if(req.body.price){
  //   query.price=req.body.price;
  // }
  // if(req.body.firstname){
  //   query.firstname={$regex:req.body.firstname,$options:"i"};
  // }
  // if(req.body.lastname){
  //   query.price=req.body.lastname;
  // }


  var perPage = parseInt(req.body.perPage);
  var page = req.body.page;

  var fields ={
    'name': true,'price':true, 'firstname':true,"lastname":true
  }
  Coin.find(query, fields, {
  skip: ((perPage * page) - perPage),
  limit:(perPage),offset : (page - 1) * perPage
  },function(err, coins) {
    // coins.count().exec(function(err, count) {  // For total record count
      // console.log(count);
      if (err) return next(err)
      res.send({
        coins: coins,
          currentPage: page,
          totalPages: Math.ceil(coins.length / perPage),
          limit: perPage,
          offset: (page - 1) * perPage
      })
    // })
  })
}
else{
  res.send("send proper message");
}
})



// Defined edit route
coinRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Coin.findById(id, function (err, coin){
      res.json(coin);
  });
});

//  Defined update route
coinRoutes.route('/update/:id').post(function (req, res) {
   Coin.findById(req.params.id, function(err, coin) {
    if (!coin)
      return next(new Error('Could not load Document'));
    else {
      coin.name = req.body.name;
      coin.price = req.body.price;

      coin.save().then(coin => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send({
              message:"unable to update the database",
              Error:err
            });
      });
    }
  });
});

// Defined delete | remove | destroy route
coinRoutes.route('/delete/:id').get(function (req, res) {
   Coin.findByIdAndRemove({_id: req.params.id}, function(err, coin){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = coinRoutes;