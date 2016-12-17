"use strict"

let sessions = require('client-sessions');
let crypto = require('crypto');
let request = require('request');
let nodemailer = require('nodemailer');
let fs = require('fs');




exports.sendMail = function (req, res) {


  //STEP 1    readFileSync
  var html = fs.readFileSync("data/order-send.html");
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'service@alyxstudio.com',
        pass: 'Nina2Simone7'
    }
  };


  //STEP 3     SEND EMAIL
    var sendEmail = ()=>{

        var transporter = nodemailer.createTransport(smtpConfig);

        // create template based sender function
        var sendPwdReset = transporter.templateSender({
            subject: 'Password reset for {{username}}!',
            text: 'Hello, {{username}}, Please go here to reset your password: {{ reset }}',
            html: html,
            messageId: body.token

        }, {
            from: 'sender@example.com',
        });


      console.log('http://localhost:8081/user/'+body.email+'/reset/?token='+body.token);
      // use template based sender to send a message
      sendPwdReset({
          to: 'dev@eliafornari.com'
      }, {
          username: body.email,
          reset: 'http://localhost:8081/user/'+body.email+'/reset/?token='+body.token
      }, function(err, info){
          if(err){
              console.log('Error');
              console.log(err, info);
              res.status(400).json(err);
          }else{
              console.log('email reset sent');

              res.status(200).json(info);
          }
      });
    }

};//export sendMail
