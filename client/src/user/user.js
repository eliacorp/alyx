'use strict'

var User = angular.module('myApp');

User.controller('userCtrl', ['$scope', '$location', '$rootScope', '$timeout', '$http', 'transformRequestAsFormPost', '$routeParams', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams){

  $rootScope.getUser=(id)=>{
    $http.get('/api/user/get/'+id)
    .then(function(response) {
      $rootScope.User=response.data.data;
      console.log($rootScope.User);
      // $rootScope.checkout.shipment= $rootScope.User.address.data[0];
    }, function(response) {
      $rootScope.message = {value: true, error:true, text:"user not found"};
      $rootScope.removeError();
    });
  }



  console.log("userCtrl");

$scope.isUser=()=>{
  var boolean = $rootScope.readCookie('user');
  if(boolean){
    return true
  }else{
    return false
  }
}

$scope.isUser();

  var user_id = $rootScope.readCookie('user');

  if($rootScope.readCookie('user')){
    $rootScope.getUser($rootScope.readCookie('user'));
  }else{
    $rootScope.User = {
      address:{
        data:[
            {
              full_name:'',
              email:'',
              country: '',
              state:'',
              city: '',
              address1:'',
              address2: '',
              postal_code: '',
              phone_number:'',
              alternate_phone_number:''
            }
          ]
        }
    }
  }










  $rootScope.loginFN = (data, type)=>{
    $scope.login_inProgress=true;
    $http.post('/api/user/login', data)
    .then(function(response) {
      $scope.login_inProgress=false;
      console.log(response);
      if(response.data.status){
        $rootScope.User=response.data.data.user;
        $rootScope.createCookie('user', $rootScope.User.id, 3);
        $rootScope.getUser($rootScope.User.id);
        if(type=='page'){
          console.log("type: ", type);
          $location.path('user/account/'+$rootScope.User.id, true);
        }
      }else{
        $rootScope.message = {value: true, error:true, text:"wrong credentials"};
        $rootScope.removeError();
      }
      // mailchimp.register($rootScope.checkout);
    }, function(response) {
      $scope.login_inProgress=false;
      $rootScope.message = {value: true, error:true, text:"wrong credentials"};
      $rootScope.removeError();
    });
  }






  $rootScope.logout=()=>{
    $rootScope.eraseCookie('user');
    $rootScope.User={};
    $location.path('shop', true);
  }





$rootScope.saveAddress=(data)=>{
  var user_id = data.user_id;
  var address_id = data.id;
  $http.post('/api/user/'+user_id+'/address/'+address_id+'/update', data)
  .then(function(response) {
    $rootScope.message = {value: true, error:false, text:"address saved"};
    $rootScope.removeError();
  }, function(response) {
    $rootScope.message = {value: true, error:true, text:"wrong credentials"};
    $rootScope.removeError();
  });
}



$rootScope.saveCustomerInfo=(data)=>{
  var user_id = data.id;
  $http.post('/api/user/'+user_id+'/info/update', data)
  .then(function(response) {
    $rootScope.message = {value: true, error:false, text:"user info saved"};
  }, function(response) {
    $rootScope.message = {value: true, error:true, text:"wrong credentials"};
    $rootScope.removeError();
  });
}





}])
