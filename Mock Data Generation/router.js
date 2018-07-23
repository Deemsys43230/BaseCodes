const express = require('express');
const router = express.Router();
const User = require('./user');;


var faker = require('faker');
router.get('/test',function(req,res){
	res.send("Test Method");
});
router.post('/generateSample',function(req,res){
	console.log(req.body.noOfRecords);
	for(var i=0;i<req.body.noOfRecords;i++){
		var user = new User({
		name:faker.fake("{{name.firstName}},{{name.lastName}}"),
		dateOfBirth:faker.fake("{{date.past}}"),
		email:faker.fake("{{internet.email}}"),
		streetAddress:faker.fake("{{address.streetAddress}}"),
		city:faker.fake("{{address.city}}"),
		state:faker.fake("{{address.state}}"),
		zip:faker.fake("{{address.zipCode}}"),
		country:faker.fake("{{address.country}}"),
		phoneNumber:faker.fake("{{phone.phoneNumberFormat}}")
	 	});
	 	console.log(user);
	}
	
	
	user.save(function(err){
		console.log("Saving User...")
		if(err){
			return next(err);
		}
		else {
            res.json({
                message:"unable to save to database",

            });
        }
	});
res.send("Success");
});

module.exports=router;