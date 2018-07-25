var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Coin = new Schema({
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  name: {
    type: String
  },
  price: {
    type: Number
  }
},{
    collection: 'coins'
});

module.exports = mongoose.model('Coin', Coin);