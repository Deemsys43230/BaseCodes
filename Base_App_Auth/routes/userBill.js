var express = require('express');
var app = express();
var userBillRoutes = express.Router();

// Require Item model in our routes module
var userBillController = require('../controller/userBillController');

// Defined store route
userBillRoutes.post('/add', userBillController.creatUserBill);

userBillRoutes.get('/edit/:id', userBillController.getUserEdit)

userBillRoutes.put('/update/:id', userBillController.updateUserForConversion);

module.exports = userBillRoutes;
// module.exports.getById = getById;