"use strict"


let Marketcloud = require('marketcloud-node');
let main = require('../../main.js');
let braintree = require("braintree");
let request = require('request');

let stripe = require('stripe')(
  "sk_test_uIfUKlYsqcu65BW0Yeo0HFB4"
);

let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "v2tkw3t2jkhtgmks",
  publicKey: "2d628543khg9z86v",
  privateKey: "b4700d718c5dd8f072bcb7131a9443f5"
});

exports.get=function(req, res){
  var id = parseInt(req.params.id);
  main.marketcloud.orders.getById(id)
  .then(function(response){
    res.status(200).json(response);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error)
  })

}


exports.create=function(req, res){
  var body = req.body;
  var cart_id = parseInt(body.cart_id);
  var customer = body.customer;
  var ship_to = body.shipment;
  var bill_to = body.billing;
  var shipment_method = parseInt(body.shipment_method);
  var fiscal_code;
  if(body.fiscal_code){
    fiscal_code = body.fiscal_code;
  }else{
    fiscal_code = '';
  }


  var order_data = {
    cart_id:cart_id,
    shipping_id:shipment_method,
    shipping_address: {
      full_name: ship_to.full_name,
      email:customer.email,
      country: ship_to.country,
      state:ship_to.state,
      city:ship_to.city,
      address1: ship_to.address1,
      address2: ship_to.address2,
      postal_code: ship_to.postal_code,
      phone_number: ship_to.phone_number
    },
    billing_address: {
      full_name: bill_to.full_name,
      email:customer.email,
      country: bill_to.country,
      state:bill_to.state,
      city:bill_to.city,
      address1: bill_to.address1,
      address2: bill_to.address2,
      postal_code: bill_to.postal_code,
      phone_number: bill_to.phone_number
    }
  }


    main.marketcloud.orders.create(order_data)
    .then(function(response){
      res.status(200).json(response);
    }).catch(function(error){
      console.log(error);
      res.status(400).json(error)
    })


}



exports.payment_stripe=function(req, res){

  var body = req.body;
  var order= req.body.order;
  var billing = req.body.order.billing_address;
  var card_number = body.number.toString();
  var expiry_month = body.expiry_month;
  var expiry_year = body.expiry_year;
  var address_zip = body.address_zip;
  var cvv = body.cvv;
  var order_id= parseInt(order.id);
  var stripe_data={};
  stripe_data ={
        name: billing.full_name,
        address_city:billing.city,
        address_country: billing.country,
        address_line1: billing.address1,
        address_line2: null,
        address_state: billing.state,
        address_zip: billing.postal_code,
        number: card_number,
        exp_month: expiry_month,
        exp_year: expiry_year,
        address_zip: address_zip,
        cvc: cvv
      }


  var ChargeToken = null;

  stripe.tokens.create({
    card: stripe_data
  }, function(err, response) {
    // asynchronously called

    if(err){
      res.status(500).json(err);
    }else{
      ChargeToken = response.id;
    }

      	main.marketcloud.payments.create({
      		method : "Stripe",
      		order_id : order_id,
      		source : ChargeToken
      	}).then(function(response){
          res.status(200).json(response);
        }).catch(function(error){
          console.log(error);
          res.status(400).json(error)
        })

  });

}//stripe






exports.payment_paypal=function(req, res){
    var body = req.body;

  // Braintree example
  var payment = {
  method: 'Braintree',
  order_id: created_order.id,
  nonce: 'nonce-from-braintree.js'
  };

  marketcloud.payments.create(payment);


  // In both cases, nonce and source are obtained from Braintree
  // and Stripe servers using their client side SDKs
}







// exports.payment_card=function(req, res){
//   var body = req.body;
//   var card_number = body.number.toString();
//   var expiry_month = body.expiry_month;
//   var expiry_year = body.expiry_year;
//   var address_zip = body.address_zip;
//   var cvv = body.cvv;
//   var order_id= parseInt(body.id)
//   console.log("order_id", order_id);
//   var card_data={};
//   card_data ={
//         // first_name: body.first_name,
//         // last_name: body.last_name,
//         number: card_number,
//         exp_month: expiry_month,
//         exp_year: expiry_year,
//         address_zip: address_zip,
//         cvc: cvv
//       }
//
//
//
//
//       var options = {
//         url: 'https://api.marketcloud.it/v0/integrations/braintree/clientToken',
//         method: "POST",
//         headers: {
//           'content-type': 'application/json',
//           'accept': 'application/json',
//           'authorization':req.mySession.access_token
//         }
//       };
//
//
//
//
//
//       gateway.clientToken.generate({}, function (err, response) {
//         var clientToken = response.clientToken
//         braintreeDropin(response.clientToken);
//       });
//
//
//     // function callback(error, response, body) {
//     //   console.log("status: "+response.statusCode);
//     //   if (!error && response.statusCode == 200) {
//     //     var info = JSON.parse(body);
//     //     console.log(body);
//     //     console.log(info.data.clientToken);
//     //     // res.status(response.statusCode).json(info);
//     //     braintreeDropin(info.data.clientToken);
//     //   }else{
//     //     var info = JSON.parse(body);
//     //     console.log(info);
//     //     res.status(response.statusCode).json(info);
//     //   }
//     // }
//     // request(options, callback);
//
//
//     function braintreeDropin(clientToken){
//       console.log("clienttoken", clientToken);
//       gateway.paymentMethodNonce.create(clientToken, function(err, response) {
//           if(err){
//             console.log(err);
//             console.log(response);
//             res.status(500).json(response);
//           }else{
//             var nonce = response.body.paymentMethodNonce.nonce;
//             processPayment(nonce);
//           }
//       });
//
//       // // Now we can initialize the Drop-in UI
//       // braintree.setup(clientToken, "dropin", {
//       //   container: "payment-form",
//       //   onPaymentMethodReceived: function (nonce) {
//       //       // This callback is invoked after the payment method
//       //       // has been received and after braintree returned
//       //       // a nonce.
//       //       // We need this nonce to make payments, so
//       //       // we store it in a variable.
//       //       processPayment(nonce);
//       //   }
//       // });
//
//     }
//
//
//
//     function processPayment(BraintreeNonce){
//
//         main.marketcloud.payments.create({
//           method : "Braintree",
//           order_id : order_id,
//           nonce : BraintreeNonce
//         },function(err,result){
//           console.log("payment");
//
//           if(err){
//             console.log(err);
//             res.status(500).json(err);
//           }else{
//             console.log(result);
//             res.status(200).json(result);
//           }
//
//           // The payment was successful and the order was flagged as paid
//           // You can log into your Stripe's Dashboard for further details
//           // about the payment.
//
//         })
//
//     }
//
//
//   }






// var order_data = {
//   shipping_address_id:0,
//   billing_address_id:0,
//   cart_id:cart_id
// }


// var new_address = {
//       full_name: full_name,
//       email:customer.email,
//       country: ship_to.country,
//       state:ship_to.county,
//       city:ship_to.city,
//       address1: ship_to.address_1,
//       address2: ship_to.address_2,
//       postal_code: ship_to.postcode,
//       phone_number: ship_to.phone
//     }

// main.marketcloud.addresses.create(new_address)
// .then(function(response){
//   console.log(response);
//   console.log("address_id",response.data.id);
//   createOrder(response.data.id);
//
// }).catch(function(error){
//   console.log(error);
//   res.status(400).json(error)
// })



// function createOrder(address_id){
//   order_data.shipping_address_id=parseInt(address_id);
//   order_data.billing_address_id=parseInt(address_id);
//   console.log(order_data);
//   main.marketcloud.orders.create(order_data,function(response){
//     console.log(response);
//     res.status(200).json(reponse)
//   	// The order is now created in "pending" state
//   	// Remember to do a proper error handling :)
//   }).catch(function(error){
//     console.log(error);
//     res.status(400).json(error)
//   })
// }

//
//
