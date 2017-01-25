"use strict"

let sessions = require('client-sessions');
let crypto = require('crypto');
let request = require('request');
let nodemailer = require('nodemailer');
let fs = require('fs');
// require external renderer
let EmailTemplate = require('email-templates').EmailTemplate;





exports.mail = function (req, res) {

  var body = req.body;

  //STEP 1    readFileSync
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'service@alyxstudio.com',
        pass: 'rolls##around^'
    }
  };





  //STEP 2  context data for the template renderer






  //STEP 3     SEND EMAIL
    var sendEmail = ()=>{
        var transporter = nodemailer.createTransport(smtpConfig);
        var templateDir = require('path').join('server/order/email');

        // Create a template based sender
        var templateSender = transporter.templateSender(new EmailTemplate(templateDir), {
            // default fields for all messages send using this template
            from: 'service@alyxstudio.com',

            // EmailTemplate fills text and html fields but not subject
            // so we need to add it separately
            subject: 'new online order | ALYX'
        });

        console.log('Template Configured');

        // Message object, add mail specific fields here
        var message = {
            to: 'order@alyxstudio.com'
        };

        // context for the template renderer
        var context = body;

        // {
        //     name: {
        //         last: 'Receiver',
        //         first: 'Name'
        //     }
        // };





        console.log('Sending Mail');
        // send using template
        templateSender(message, context, function (error, info) {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            // print rfc822 message to console
            console.log('Generated mime-message source:\n%s', info.response.toString());
            res.status(200).json(info.response);

        });



    } //sendEmail function


    sendEmail();

};//export sendMail
