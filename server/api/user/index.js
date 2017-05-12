"use strict"

let Marketcloud = require('marketcloud-node');
let main = require('../../main.js');
let request = require('request');




exports.get=function(req, res){

  var id = parseInt(req.params.id);
  console.log("user id", id);
  main.marketcloud.users.getById(id)
  .then(function(response){
    main.marketcloud.addresses.list({
          user_id: response.data.id
      }).then(function(address){
        response.data.address=address;
        res.status(200).json(response);

      }).catch(function(error){
        console.log(error);
        res.status(400).json(error)
      })
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error)
  })

}






exports.login=function(req, res){
  main.marketcloud.users.authenticate(
    req.body.email,
    req.body.password
  )
  .then(function(response){
  main.marketcloud.addresses.list({
        user_id: response.data.user.id
    }).then(function(address){
      response.data.address=address;
      res.status(200).json(response);

    }).catch(function(error){
      console.log(error);
      res.status(400).json(error)
    })

  }).catch(function(error){
    console.log(error);
    res.status(400).json(error)
  })
}




exports.register=function(req, res){


  main.marketcloud.users.create({
    name: req.body.name,
    email: req.body.email,
    password : req.body.password
  })
  .then(function(response){
    console.log(response);
    var user_id = response.data.id;
    createAddress(req, res, user_id);

  }).catch(function(error){
    console.log(error);
    res.status(400).json(error)
  })


  function createAddress(req, res, user_id){
    var new_address = req.body.address;
    new_address.user_id = user_id;
    main.marketcloud.addresses.create(new_address)
    .then(function(response){
      console.log(response);
      res.status(200).json(response);
    }).catch(function(error){
      console.log(error);
      res.status(400).json(error)
    })
  }
}







exports.address_update=function(req, res){
  var address_id = req.params.address;
  var body = req.body;

  main.marketcloud.addresses.update(address_id,body)
  .then(function(response){
    console.log(response);
    res.status(200).json(response);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error)
  })
}




exports.info_update=function(req, res){
  var user_id = req.params.user;
  var body = req.body;

  main.marketcloud.users.update(user_id,body)
  .then(function(response){
    console.log(response);
    res.status(200).json(response);
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error)
  })

}
