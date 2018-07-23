var express = require("express");
var mongodbClient = require("mongoose");
var router = require('./router');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',router);


mongodbClient.connect("mongodb://localhost:27017/Contact",function(err,db){
	if(err){ return console.log(err)}
	console.log("Data Base Connected")
});


app.listen(3000);
console.log("Server started on 3000...")