'use strict'

var Checkout = angular.module('myApp');

Checkout.controller('checkoutCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, mailchimp){


$rootScope.Order;
$rootScope.shipment_forwardActive=false;

$rootScope.checkout = {
          customer:{
              first_name: '',
              last_name: '',
              email:''
          },
          gateway:'',
          shipment_method: '1336838094099317449',
          fiscal_code:'',
          shipment:
                   { first_name: '',
                     last_name: '',
                     address_1: '',
                     city: '',
                     county: '',
                     country: '',
                     postcode: '',
                     phone: ''
                   },
          billing:
                  {
                     first_name: '',
                     last_name: '',
                     address_1: '',
                     city: '',
                     county: '',
                     country: '',
                     postcode: '',
                     phone: ''
                   }
   };




//shipment

  $rootScope.shipmentToPayment = (event) =>{
    if($scope.checkoutForm.$valid){



      $http.post('/cartToOrder', $rootScope.checkout)

      .then(function(response) {

        console.log(response);
        console.log("posted successfully");

        $rootScope.Order=response.data;
        // $rootScope.payment.id = response.data.id;

        $location.path('/shop/payment', true);
        mailchimp.register($rootScope.checkout);

      }, function(response) {
        $rootScope.error = {value: true, text:response.data};
        // event.preventDefault();
        setTimeout(function(){
          $rootScope.error = {value: false, text:''};
          $rootScope.$apply();
        }, 2000);

          console.error("error in posting");
      });


    }else{
      $rootScope.error = {value: true, text:'fill in the form correctly'};
      // event.preventDefault();
      setTimeout(function(){
        $rootScope.error = {value: false, text:''};
        $rootScope.$apply();
      }, 2000);
    }
  }


  $scope.$watch('checkoutForm.$valid', function(newVal, oldVal){
    console.log("change");
    console.log("old", oldVal);
    console.log("new", newVal);
    console.log(checkoutForm);
    console.log(checkoutForm.$error);
    if ($scope.checkoutForm.$valid){
      $rootScope.shipment_forwardActive = true;
    }else{
      $rootScope.shipment_forwardActive = false;
    }
  }, true);




  // $rootScope.toPaymentChoice = function(){
  //   $rootScope.goHorizontal('choice', 4);
  // }//cartToOrder




  $rootScope.backFromCheckout = function(){
    console.log($rootScope.templates[0]);
    $rootScope.template = $rootScope.templates[0];
    $rootScope.showCart=true;
    $rootScope.backFromPayment();
  }




$scope.phoneRegex = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$';
$scope.postcodeRegex = '^\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z] \\d[A-Z]\\d$';
$scope.fiscalRegex = '^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$';

// ^[A-Z]{6}[A-Z0-9]{2}[A-Z][A-Z0-9]{2}[A-Z][A-Z0-9]{3}[A-Z]$

// '/^[a-z]{1,2}[0-9][a-z0-9]?\s?[0-9][a-z]{2}$/i'



$scope.$watch('isBillingDifferent', function(value){
  console.log($scope.isBillingDifferent);
  if(!$scope.isBillingDifferent){
    console.log($rootScope.checkout);
      $rootScope.checkout.billing.first_name = $rootScope.checkout.shipment.first_name;
      $rootScope.checkout.billing.last_name = $rootScope.checkout.shipment.last_name;
      $rootScope.checkout.billing.address_1 = $rootScope.checkout.shipment.address_1;
      $rootScope.checkout.billing.city = $rootScope.checkout.shipment.city;
      $rootScope.checkout.billing.county = $rootScope.checkout.shipment.county;
      $rootScope.checkout.billing.country = $rootScope.checkout.shipment.country;
      $rootScope.checkout.billing.postcode = $rootScope.checkout.shipment.postcode;
      $rootScope.checkout.billing.phone = $rootScope.checkout.shipment.phone;
  }

});

var Europe = ['AL','AD','AM','AT','AZ','BY','BA','BG','HR','CY','CZ','DK','EE','FI','FR','GE','DE','GR','HU','IS','IE','KZ','XK','LV','LI','LT','LU','MK','MT','MD','MC','ME','NL','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','TR','UA','GB'];
var NorthAmerica = ['US','CA','MX'];
$scope.$watch('checkout', function(value){
  console.log(value);
  // $rootScope.checkout.customer.first_name = $rootScope.checkout.shipment.first_name;
  // $rootScope.checkout.customer.last_name = $rootScope.checkout.shipment.last_name;
  if(!$scope.isBillingDifferent){
    console.log($rootScope.checkout);
      $rootScope.checkout.billing.first_name = $rootScope.checkout.shipment.first_name;
      $rootScope.checkout.billing.last_name = $rootScope.checkout.shipment.last_name;
      $rootScope.checkout.billing.address_1 = $rootScope.checkout.shipment.address_1;
      $rootScope.checkout.billing.city = $rootScope.checkout.shipment.city;
      $rootScope.checkout.billing.county = $rootScope.checkout.shipment.county;
      $rootScope.checkout.billing.country = $rootScope.checkout.shipment.country;
      $rootScope.checkout.billing.postcode = $rootScope.checkout.shipment.postcode;
      $rootScope.checkout.billing.phone = $rootScope.checkout.shipment.phone;
  }

  console.log('country: '+$rootScope.checkout.shipment.country);
  if(NorthAmerica.indexOf( $rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1374911520424591424';
    console.log('north america');
  }else if ($rootScope.checkout.shipment.country=='IT'){
    $rootScope.checkout.shipment_method='1374912184424857665'
    console.log('Italy');
  }else if (Europe.indexOf( $rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1305371023712977230'
    console.log('EU');
  }else if ($rootScope.checkout.shipment.country==('RU')){
    $rootScope.checkout.shipment_method='1374912619718115394'
    console.log('Russia');
  }else{
    $rootScope.checkout.shipment_method='1374913497787269187';
    console.log('INT');
  }
}, true)



});
