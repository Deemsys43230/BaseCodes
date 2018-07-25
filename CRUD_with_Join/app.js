var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');// for middleware access

var app = express();
//for middleware if not loaded req wil not send and also for app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();
// import files
var userRoute = require("./routes/users");
var userContactRoute = require('./models/userContact');
var sampleRoute = require('./models/sample');

//Connect Database
mongoose.connect('mongodb://localhost:27017/ModelApp', { useNewUrlParser: true }).then( 
    () => {console.log("Database connected")},
    err => {console.log("can not connect to the database" + err)}
);

app.use('/user', userRoute);
app.use('/userContact', userContactRoute);
app.use('/', sampleRoute);


app.listen(8000);
console.log("Model app listening on 8000 port");