'use strict'

var Checkout = angular.module('myApp');

Checkout.controller('checkoutCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, mailchimp){


$rootScope.Totals;

  $rootScope.payment = {
                          id: '',
                          number: '5555555555554444',
                          expiry_month: '02',
                          expiry_year:  '2018',
                          cvv:  '756'
                        };

$rootScope.checkout={
          customer:{
              first_name: '',
              last_name: '',
              email:''
          },
          shipment:
                   { first_name: 'Elia Fornari',
                     last_name: 'Fornari',
                     address_1: '400 S. Burnside #MH Tower 37-00H',
                     city: 'Los Angeles',
                     county: 'California',
                     country: 'US',
                     postcode: '90036',
                     phone: '3157273461'
                   },
          billing:
                  {
                     first_name: 'Elia Fornari',
                     last_name: 'Fornari',
                     address_1: '400 S. Burnside #MH Tower 37-00H',
                     city: 'Los Angeles',
                     county: 'California',
                     country: 'US',
                     postcode: '90036',
                     phone: '3157273461'
                   }
   };




//shipment

  $rootScope.checkShipment = () =>{
    if($scope.checkoutForm.$valid){
      $rootScope.toPayment();
      mailchimp.register($rootScope.checkout);
    }else{
      alert('invalid');
      $rootScope.error = {value: true, text:'data invalid'};
    }
  }


  $scope.$watch('checkoutForm.$valid', function(newVal, oldVal){
    console.log("change");
    console.log("old", oldVal);
    console.log("new", newVal);
    if ($scope.checkoutForm.$valid){
      $rootScope.Section.forwardActive = true;
    }else{
      $rootScope.Section.forwardActive = false;
    }
  }, true);




  $rootScope.toPayment = function(){

    $rootScope.goHorizontal('payment', 4);

    $http.post('/cartToOrder', $rootScope.checkout)
    .then(function(response) {

      $rootScope.Totals=response.data;
      $rootScope.payment.id = response.data.id;
        console.log($rootScope.Totals);
        console.log("posted successfully");
      }, function(data) {
          console.error("error in posting");
      })
  }//cartToOrder







  $rootScope.backFromCheckout = function(){
    console.log($rootScope.templates[0]);
    $rootScope.template = $rootScope.templates[0];
    $rootScope.showCart=true;
    $rootScope.backFromPayment();
  }




$scope.phoneRegex = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$';
$scope.postcodeRegex = '^\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z] \\d[A-Z]\\d$'

// '/^[a-z]{1,2}[0-9][a-z0-9]?\s?[0-9][a-z]{2}$/i'



});
