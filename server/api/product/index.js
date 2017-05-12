"use strict"

// let sessions = require('client-sessions');
// let crypto = require('crypto');
// let request = require('request');
// let nodemailer = require('nodemailer');
// let fs = require('fs');
let Marketcloud = require('marketcloud-node');
let main = require('../../main.js');





exports.list = function (req, res) {

  var page = req.query.page;
  // var offset = req.query.offset;
  var collection;
  var query ={};

  if(req.query.collection){
    query.collection= parseInt(req.query.collection);
  }
  if(req.query.gender){
    query.gender=req.query.gender+',unisex';
  }
  query.sort_by='date desc';
  // query.q='date';
  // query.date=''
  query.per_page=5;
  query.page=page;

if(!req.query.collection){

  main.marketcloud.products.list(query)
  .then(function(data){
    // console.log(data);
    // var info = JSON.parse(data);
    res.status(200).json(data);
    // Handle success
  })
  .catch(function(error){
    console.log(error);
    res.status(400).json(error);
    //Handle error
  })

}else if(req.query.collection){
    main.marketcloud.collections.getById(req.query.collection)
    .then(function(data){
      console.log(data);
      // var info = JSON.parse(data);
      res.status(200).json(data.items);
      // Handle success
    })
    .catch(function(error){
      console.log(error);
      res.status(400).json(error);
      //Handle error
    })
  }



};




exports.detail = function (req, res) {

  //GET detail of a product
  var id = req.params.id;

  main.marketcloud.products.getById(id)
  .then(function(product){
    res.status(200).json(product);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error);
  });

};




exports.collection_list = function (req, res) {

  main.marketcloud.collections.list()
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

}




exports.collection_products = function (req, res) {






}
