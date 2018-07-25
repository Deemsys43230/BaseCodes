var express = require('express');
var app = express();
var userRoutes= express.Router();

var userController = require("../controller/userController");

userRoutes.post('/create', userController.addUser);

userRoutes.get('/getuser', userController.getUser);

userRoutes.get('/getFriends', userController.getFriends);

userRoutes.put('/updateFriends', userController.updateFriends);

module.exports = userRoutes;