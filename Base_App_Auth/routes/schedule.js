var schedule = require('node-schedule');
// var Contact = require('../models/schedule');
var ScheduleConfig = require('../config/scheduleConfig');
var express = require('express');
var app = express();
var scheduleRoutes = express.Router();
var Config = require('../config');
var nodemailer = require("nodemailer");
var path   = require('path');
var EmailTemplates = require('swig-email-templates');
var Schedule = require("../models/usersBill");
var userSchedule = require("../controller/userBillController");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
// Require Item model in our routes module
var XslToJson = require('../models/xslToJson');
// var userBillController = require('../controller/userBillController');
 
var j = schedule.scheduleJob('13 * * * *', function(){ //sec min hour day month dayofweek
  console.log('The answer to life, the universe, and everything!');
  userSchedule.getUser();
});

var i = schedule.scheduleJob("*/1 * * * *", function(){ // for every hour particular min
    console.log("Every one minute");
    userSchedule.getUser();
    // userSchedule.getById();
});

// it will run start printing after 5 of server and stop next 5 sec
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
    console.log('Time for tea!');
    console.log(startTime);
});

if(ScheduleConfig.status == 1){ // status ON or OFF
// for sending due mail
schedule.scheduleJob(ScheduleConfig.everyday, function() {
    console.log("Getting all user detail by status for sending due email");
    Schedule.find({Status:'Not Paid'}, function(err, Users){
        if (err)
            console.log(err);
        if (Users) {
          console.log("Users : " + Users.length);
            var response; // set varible access outside function
            Users.forEach(function(Users) { // access all value from array
                response = Users.Email;
                console.log(Users.Email);
                var transporter = nodemailer.createTransport({
                    host: Config.Mail_host,
                    port: Config.Mail_port,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: Config.Gmail_User, // generated ethereal user
                        pass: Config.Gmail_pass  // generated ethereal password
                    },
                    tls:{
                    rejectUnauthorized:false
                    }
                });
                var templates = new EmailTemplates();
                var context = {
                    meatballCount: 9001
                };
            
                templates.render('../../../templates/emailTemplate.html', context, function(err, html, text, subject, subject1) {
                    
                    // Send email
                    transporter.sendMail({
                        from: Config.Gmail_User,
                        to: Users.Email,
                        subject: 'Paymet Datails',
                        html: html,
                        text: text
                    });
                    if (err) {
                        console.log(err);
                    }
                    else { 
                        console.log("Email sent");
                        console.log("Mail sending every day by 3.30pm");
                    }
                
                }); 
            });
          
        }
      });
});

//Extracting file in night
schedule.scheduleJob(ScheduleConfig.dailyReportExtract, function() {
    console.log("exacute in excel to json convertion");
    // exceltojson = xlsxtojson;
    // var files = [ // multiple file choosing 
    //     './uploads/books.xlsx'
    // ]
    // files.forEach(function(file) {
        xlsxtojson({ // for extracting xlsx file
            input: './uploads/books.xlsx',
            output: null, //since we don't need output.json
            lowerCaseHeaders:true
        }, function(err,result){
            if(err) {
                return res.json({error_code:1,err_desc:err, data: null});
            } else {
            var response; // set varible access outside function
            result.forEach(function(result) { // access all value from array
                response = result;
                console.log(response.bookid);
                var xslToJson = XslToJson({ // passing the data to database
                    bookid: response.bookid,
                    booktitle: response.booktitle,
                    bookauthor: response.bookauthor 
                });
                xslToJson.save();
                
            });
        }
        });
    // });
    userSchedule.getUser(); // for updating user status after JSON Conversion
    // userSchedule.updateUserForConversion();
});

}

module.exports = scheduleRoutes;