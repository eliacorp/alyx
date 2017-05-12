"use strict"

// let sessions = require('client-sessions');
// let crypto = require('crypto');
// let request = require('request');
// let nodemailer = require('nodemailer');
// let fs = require('fs');
let Marketcloud = require('marketcloud-node');
let main = require('../../main.js');
let marketcloud = main.marketcloud;


exports.get=function(req, res){
  var idParam = req.params.id;
  var id = parseInt(idParam);
  main.marketcloud.carts.getById(idParam)
  .then(function(response){
    res.status(200).json(response);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error);
  });
}


exports.create = function(req, res){
  var body = req.body.size;
  var product_id = body.product_id;
  var quantity = body.quantity;
  var variant_id = body.variant_id;

      main.marketcloud.carts.create({
          items:[
            {
              product_id:product_id,
              quantity:1,
              variant_id:variant_id
            }
          ]

      })
      .then(function(response){
        res.status(200).json(response);
        req.mySession.cartID= response.data.id
      }).catch(function(error){
        console.log(error);
        res.status(400).json(error);
      });

}









exports.update = function (req, res) {
  var body = req.body.size;
  var cart_id = parseInt(req.params.id);
  var product_id = body.product_id;
  // var quantity = body.quantity;
  var variant_id = body.variant_id;

main.marketcloud.carts.add(cart_id,[
        { 'product_id':product_id,
          'quantity':1,
          'variant_id' : variant_id
        }
      ])
      .then(function(response){
        res.status(200).json(response);
      }).catch(function(error){
        console.log(error);
        res.status(400).json(error);
      });
};


exports.removeItem = function (req, res) {

  var body = req.body;
  var cart_id = parseInt(req.params.id);
  var product_id = body.product_id;
  var variant_id = body.variant_id;

  main.marketcloud.carts.remove(cart_id,[
    { 'product_id':product_id,
      'quantity':1,
      'variant_id' : variant_id
    }
  ])
  .then(function(response){
    res.status(200).json(response);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error);
  });


};





exports.delete=function(req,res){
  var cart_id = parseInt(req.params.id);
  main.marketcloud.carts.delete(cart_id)
  .then(function(response){
    res.status(200).json(response);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error);
  });

}
