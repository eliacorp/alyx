'use strict'

var Checkout = angular.module('myApp');

Checkout.controller('checkoutCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', 'mailchimp', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, mailchimp){
console.log("checkoutctrl");

$rootScope.Order;
$rootScope.User;
$rootScope.shipment_forwardActive=false;


$rootScope.checkout = {
          cart_id:'',
          user_id:'',
          customer:{
              choice: 'register',
              full_name: '',
              email:''
          },
          gateway:'',
          shipment_method: '',
          fiscal_code:'',
          shipment_address_id:'',
          shipment:
                   {
                     full_name: '',
                     address1: '',
                     city: '',
                     state: '',
                     country: '',
                     postal_code: '',
                     phone_number: '',
                     ref:'shipping'
                   },
          billing:
                  {
                     full_name: '',
                     address1: '',
                     city: '',
                     state: '',
                     country: '',
                     postal_code: '',
                     phone_number: '',
                     ref:'billing'
                   }
   };







//shipment

$scope.inProgress=false;





//REGISTER

$rootScope.shipmentToPayment = (event) =>{
  var cartID = $rootScope.readCookie('cart');
  if($scope.checkoutForm.$valid && cartID && !$scope.inProgress){
    $scope.inProgress=true;
    if(cartID){
      $rootScope.checkout.cart_id =cartID;
    }
    $rootScope.checkout.billing.email=$rootScope.checkout.customer.email;
    $rootScope.checkout.shipment.email=$rootScope.checkout.customer.email;
    var registerData = {
      name: $rootScope.checkout.customer.full_name,
      email: $rootScope.checkout.customer.email,
      password: $rootScope.checkout.customer.password,
      address:$rootScope.checkout.shipment
    }
  $scope.registerUser(registerData);
  }else{
    $scope.inProgress=false;
    $rootScope.message = {value: true, error:true, text:"fill in the form correctly"};
    $rootScope.removeError();
  }
}


  $scope.registerUser=(data)=>{
    console.log(data);
    $scope.register_inProgress=true;
    $http.post('/api/user/register', data)
    .then(function(response) {
      $scope.register_inProgress=false;
      $rootScope.User=response.data.data;
      $rootScope.checkout.user_id=$rootScope.User.id;
      $rootScope.createCookie('user', $rootScope.User.id, 3);
      console.log(response.id);
      $scope.createOrder();
      // mailchimp.register($rootScope.checkout);
    }, function(response) {
      $scope.register_inProgress=false;
      $rootScope.message = {value: true, error:true, text:response.data};
      $rootScope.removeError();
    });
  }









//USER




  $scope.createOrder = ()=>{
    $http.post('/api/order/create', $rootScope.checkout)
    .then(function(response) {
      $rootScope.Order=response.data.data;
      $scope.inProgress=false;
      console.log(response);
      // $rootScope.payment.id = response.data.id;
      $location.path('/shop/checkout/'+$rootScope.Order.id+'/payment', true);
      // mailchimp.register($rootScope.checkout);
    }, function(response) {
      $scope.inProgress=false;
      $rootScope.message = {value: true, error:true, text:response.data};
      $rootScope.removeError();
    });
  }


















if(!$rootScope.readCookie('user')){
  setTimeout(function(){
    $scope.$watch('checkoutForm.$valid', function(newVal, oldVal){
      if ($scope.checkoutForm.$valid){
        $rootScope.shipment_forwardActive = true;
      }else{
        $rootScope.shipment_forwardActive = false;
      }
    }, true);
  }, 600);
}





  // $rootScope.toPaymentChoice = function(){
  //   $rootScope.goHorizontal('choice', 4);
  // }//cartToOrder




$rootScope.backFromCheckout = function(){
  $rootScope.template = $rootScope.templates[0];
  $rootScope.showCart=true;
  $rootScope.backFromPayment();
}




$scope.phoneRegex = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';
// ^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$
//
$scope.postcodeRegex = '^\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z]\\d[A-Z]\\d$';
$scope.fiscalRegex = '^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$';

// ^[A-Z]{6}[A-Z0-9]{2}[A-Z][A-Z0-9]{2}[A-Z][A-Z0-9]{3}[A-Z]$

// '/^[a-z]{1,2}[0-9][a-z0-9]?\s?[0-9][a-z]{2}$/i'



$scope.$watch('isBillingDifferent', function(value){
  if(!$scope.isBillingDifferent){
      $rootScope.checkout.billing.full_name = $rootScope.checkout.shipment.full_name;
      $rootScope.checkout.billing.address_1 = $rootScope.checkout.shipment.address_1;
      $rootScope.checkout.billing.city = $rootScope.checkout.shipment.city;
      $rootScope.checkout.billing.state = $rootScope.checkout.shipment.state;
      $rootScope.checkout.billing.country = $rootScope.checkout.shipment.country;
      $rootScope.checkout.billing.postcode = $rootScope.checkout.shipment.postcode;
      $rootScope.checkout.billing.phone_number = $rootScope.checkout.shipment.phone_number;
  }

});

var Europe = ['AL','AD','AM','AT','AZ','BY','BA','BG','HR','CY','CZ','DK','EE','FI','FR','GE','DE','GR','HU','IS','IE','KZ','XK','LV','LI','LT','LU','MK','MT','MD','MC','ME','NL','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','TR','UA','GB'];
var NorthAmerica = ['US','CA','MX'];
$scope.$watch('checkout', function(value){
  // $rootScope.checkout.customer.first_name = $rootScope.checkout.shipment.first_name;
  // $rootScope.checkout.customer.last_name = $rootScope.checkout.shipment.last_name;
  if(!$scope.isBillingDifferent){
      $rootScope.checkout.billing.full_name = $rootScope.checkout.shipment.full_name;
      $rootScope.checkout.billing.address1 = $rootScope.checkout.shipment.address1;
      $rootScope.checkout.billing.city = $rootScope.checkout.shipment.city;
      $rootScope.checkout.billing.state = $rootScope.checkout.shipment.state;
      $rootScope.checkout.billing.country = $rootScope.checkout.shipment.country;
      $rootScope.checkout.billing.postal_code = $rootScope.checkout.shipment.postal_code;
      $rootScope.checkout.billing.phone_number = $rootScope.checkout.shipment.phone_number;
  }

  if(NorthAmerica.indexOf( $rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='166392';
  }else if ($rootScope.checkout.shipment.country=='IT'){
    $rootScope.checkout.shipment_method='157234'
  }else if (Europe.indexOf( $rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='157235'
  }else if ($rootScope.checkout.shipment.country==('RU')){
    $rootScope.checkout.shipment_method='157237'
  }else{
    $rootScope.checkout.shipment_method='157236';
  }
}, true)






















$scope.updateAddress=(id, data)=>{

  $http.post('/api/user/'+id+'/address/put', data)
  .then(function(response) {
    console.log(response);
    $rootScope.User=response.data.data;

  }, function(response) {
    $rootScope.message = {value: true, error:true, text:"user not found"};
    $rootScope.removeError();
  });

}




}])
.directive('addressForm', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/shop/user/address-form.html',
    replace: true
  };
})

.directive('customerForm', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/shop/user/customer-form.html',
    replace: true
  };
});
