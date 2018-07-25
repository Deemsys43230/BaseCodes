var mongoose = require('mongoose');
var validation = require('../config/validation');
var Schema = mongoose.Schema;
var UserContact = require('../models/userContact');
var Friends = require('./friends');

var UserSchema = new Schema({
    username: {
        type:String,
        validate:validation.nameValidator,
        required:true
    },
    email:{
        type:String,
        validate: validation.emailValidator,
        required:true
    },
    gender: {
        type: String,
        validate:validation.nameValidator,
        required:true
    },
    contact: { 
        type: Schema.Types.ObjectId, 
        ref: 'UserContact' 
    },
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }]
 },{
    collection: 'Model User'
});

module.exports = mongoose.model('User',UserSchema);