/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';

var mongoose = require('mongoose'),
    validate = require('mongoose-validator'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  {
    type: String,
    validate: validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    required: true
  },
  password:  String,
  scope:  {
    type: String,
    enum: ['admin', 'user', 'coach'],
    default: 'user',
  }
});

module.exports = mongoose.model('User', UserSchema);

