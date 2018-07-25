var express = require('express');
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var joi = require('joi');

// var LoginSchema = new mongoose.Schema({
//     email: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     }
//   });

  var LoginSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).required()
  });

module.exports = joi.validate('Login', LoginSchema);