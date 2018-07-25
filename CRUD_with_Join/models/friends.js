var mongoose = require('mongoose');
var User = require('./user');

var friendSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    addTime: Date
});

module.exports = mongoose.model('Friends', friendSchema);