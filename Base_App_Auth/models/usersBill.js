var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
    validation = require('../message/apiMessage');

var Schema = mongoose.Schema;

var Scheduler = new Schema({
  Name: {
    type: String,
    validate: validation.nameValidator,
    required: [true, 'Name is Required']
  },
  Email : {
    type: String,
    validate: validation.emailValidator,
    required: [true, 'Email is Required']
   },
  Phone : {
    type: String,
    validate : validation.phoneValidator,
    required: [true, 'Phone number is Required']
  },
  Payment_Date : {
    type: Date,
    required: [true, 'Payment date is Required']
  },
  Due_Date : {
    type: Date,
    required: [true, 'Due date is required']
  },
  Status : {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
},{
    collection: 'Scheduler'
});
module.exports = mongoose.model('Scheduler', Scheduler);