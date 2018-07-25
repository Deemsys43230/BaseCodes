var express = require('express');
var app = express();
var userRoutes= express.Router();

var userContactController = require("../controller/userContactControllers");

userRoutes.post('/addcontact', userContactController.addUserContact);

module.exports = userRoutes;