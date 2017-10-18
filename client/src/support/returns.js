'use strict';

var Returns = angular.module('myApp');
Returns.controller('returnsCtrl', ['$scope', '$rootScope', '$http', 'transformRequestAsFormPost', function($scope, $rootScope, $http, transformRequestAsFormPost){


console.log("returns");
  $rootScope.Returns={}

  $rootScope.sendReturnForm=()=>{
    $http({
      url: '/api/mandrill/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: transformRequestAsFormPost,
      data: $rootScope.Returns
    }).then( function(response){
    console.log(response);
    }, function(response){

    })
  }


}])
