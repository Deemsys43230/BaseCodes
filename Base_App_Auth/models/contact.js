var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
    validation = require('../message/apiMessage');

var Schema = mongoose.Schema;

var Contact = new Schema({
  name: {
    type: String,
    validate: validation.nameValidator,
    required: true       
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
  },
  company : {
    type: String,
    required: true
  },
  message : {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Contact', Contact);