var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'service@alyxstudio.com',
        pass: 'rolls##around^'
    }
});



exports.orderPaid=function(req, res){


  console.log("Received a webhook", JSON.stringify(req.body));
  var event = req.body.event;

  if (event === 'payments.create') {
    // Then, an order has been paid.
    // Grabbing the order information from the event
    var order = req.body.data._embedded.order;
   fs.readFile('./email_order.ejs', 'utf8', function (err, template) {
        if (err) {
          return next(err);
        }
        var compiledTemplate = ejs.render(template, {order : order});
        var mailOptions = {
          from: '"Nerd Overlord" <*******@gmail.com>',
          to: order.billing_address.email,
          subject: 'Thank you for your order ✔',
          text: 'We received your order, we will send you a notification as soon as we ship it!',
         html:compiledTemplate
        }
       transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
      });
      res.send({status:true})
    })
  }




}
