var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var contactRoutes = express.Router(); 

// Require Item model in our routes module
var Contact = require('../models/contact');
// Require Item for config
var Config = require('../config');
var path   = require('path');
var EmailTemplates = require('swig-email-templates');

module.exports.createContact = (req, res) => {
    var data=req.body;
    subject = data.name;
    subject1 = data.company;
    const contact = new Contact(req.body);

    contact.save(function(err){
        if(!err) {   
            
            // create reusable transporter object using the default SMTP transport
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
                    to: data.email,
                    subject: 'Node Contact Request',
                    html: html,
                    text: text
                });
                if (err) {
                    return console.log(err);
                }
                else {
                    res.status(200).json({
                        'form': 'form added successfully',
                        'contact': 'Email has been sent'
                    });  
                }
            
            }); 

        }
        else {
            res.status(400).send({
                message:"unable to save to database",
                Error: err.errors
            });
        }
    });
};