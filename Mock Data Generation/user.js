var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
	name:{
		type:String
	},
	dateOfBirth:{
		type:Date
	},
	email:{
		type:String
	},
	streetAddress:{
		type:String
	},
	city:{
		type:String
	},
	state:{
		type:String
	},
	zip:{
		type:String
	},
	country:{
		type:String
	},
	phoneNumber:{
		type:String
	},
},{
    collection: 'user'
});

module.exports = mongoose.model("User",User);