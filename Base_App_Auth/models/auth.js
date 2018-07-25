var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
    validation = require('../message/apiMessage');

var Schema = mongoose.Schema;

var AuthSchema = new Schema({
  name: {
    type: String,
    validate: validation.nameValidator,
    required: true       
  },
  hash_password : {
    type: String,
    require: true
  },
  email : {
    type: String,
    validate: validation.emailValidator,
    required: true
   },
  phone : {
    type: String,
    validate : validation.phoneValidator,
    required: true
  }
});

var Auth = module.exports = mongoose.model('Auth', AuthSchema);
  
module.exports.getUserByUsername = function(name, callback){
    const query = {name: name}
    Auth.findOne(query, callback);
}
module.exports.comparePassword = function(password, hash_password, callback){
    bcrypt.compare(password, hash_password, (err, isMatch) => {
      if(err) {
          console.log(err);
          throw err;
      };
      callback(null, isMatch);
    });
}
