var mongoose = require('mongoose');
var validation = require('../config/validation');
var Schema = mongoose.Schema;
var UserContact = require('../models/user');

var UserContactSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    phone:{
        type:String,
        validate: validation.phoneValidator,
        required: true,
    },
    address: {
        type: String,
        required:true
    }
 },{
    collection: 'Model User Contact'
});

module.exports = mongoose.model('UserContact',UserContactSchema);