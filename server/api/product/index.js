"use strict"

// let sessions = require('client-sessions');
// let crypto = require('crypto');
// let request = require('request');
// let nodemailer = require('nodemailer');
// let fs = require('fs');
let Marketcloud = require('marketcloud-node');
let main = require('../../main.js');
let marketcloud = main.marketcloud;





exports.list = function (req, res) {

  var page = req.query.page;
  // var offset = req.query.offset;
  var collection;
  var query ={};

  if(req.query.collection){
    query.collection=req.query.collection;
  }
  query.per_page=10;
  query.page=page;

  main.marketcloud.products.list(query)
  .then(function(data){
    console.log(data);
    // var info = JSON.parse(data);
    res.status(200).json(data);
    // Handle success
  })
  .catch(function(error){
    console.log(error);
    res.status(400).json(error);
    //Handle error
  })
};




exports.detail = function (req, res) {

  //GET detail of a product
  var id = req.params.id;
  console.log("id:",id);

  main.marketcloud.products.getById(id)
  .then(function(product){
    console.log(product);
    res.status(200).json(product);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error);
  });

};
