'use strict'

var Payment = angular.module('myApp');

Payment.controller('paymentCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', 'anchorSmoothScroll','$routeParams', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll, $routeParams){
 $rootScope.payment;
 $rootScope.Transaction;
  $rootScope.Processed={value: false, error:false, data:''};

    $rootScope.payment = {
                            order: {},
                            gateway:'',
                            first_name: $rootScope.checkout.billing.first_name,
                            last_name: $rootScope.checkout.billing.last_name,
                            number: '5555555555554444',
                            expiry_month: '08',
                            expiry_year:  '2018',
                            cvv:  '801'
                          };


  $scope.$watch('paymentForm.$valid', function(newVal, oldVal){
    if ($scope.paymentForm.$valid){
      $rootScope.payment_forwardActive = true;
    }else{
      $rootScope.payment_forwardActive = false;
    }
  }, false);




  $rootScope.checkPayment = ()=>{
    if($rootScope.checkout.gateway == 'stripe'){
      if($scope.paymentForm.$valid){
        $rootScope.changeOrderGateway();
      }else{
        $rootScope.error = {value: true, text:'data invalid'};
        setTimeout(function(){
          $rootScope.error = {value: false, text:'data invalid'};
          $rootScope.$apply();
        }, 2000);
      }
    }else{
      $rootScope.changeOrderGateway();
    }

  }




  $rootScope.changeOrderGateway =()=>{
    var orderID = $rootScope.Order.id;
    if($rootScope.checkout.gateway == 'stripe'){
      $rootScope.paymentToProcess();
    }else if($rootScope.checkout.gateway == 'paypal-express'){
      var obj = {gateway: $rootScope.checkout.gateway};
      $http.post('/order/'+orderID+'/put', obj)
      .then( function(response){
        $rootScope.paymentToProcess_paypal();
      }, function(error){
        console.log(error);
        $rootScope.pageLoading = false;
      })
    }

  }







    $rootScope.paymentToProcess = function(){

      $rootScope.payment.gateway = $rootScope.checkout.gateway;
      $rootScope.payment.order = $rootScope.Order;
      console.log("order exists");
      console.log($rootScope.Order);
      $rootScope.pageLoading = true;

      $http.post('/api/order/payment/stripe', $rootScope.payment)
        .then( function(response){
          console.log(response);
            if(response.data.data.paid){
              $rootScope.cartLoading = false;
              $rootScope.Processed={value: true, error:false, data:response.data.order};
              $rootScope.Transaction = response.data.data;
              $rootScope.pageLoading = false;
              $location.path('/shop/checkout/'+$routeParams.order+'/processed/'+$rootScope.checkout.gateway, true);
            }
        }, function(response){
          console.log("payment failed!");
          console.log(response);
          $rootScope.Processed={value: true, error:true, data:response.data};
          $rootScope.pageLoading = false;
          $rootScope.cartLoading = false;
          $location.path('/shop/processed/'+$routeParams.order+'/processed/'+$rootScope.checkout.id+'/'+$rootScope.checkout.gateway+'/canceled', true);
        })
    }//paymentToProcess





    $rootScope.paymentToProcess_paypal = function(){

      $rootScope.payment.gateway = $rootScope.checkout.gateway;
      $rootScope.pageLoading = true;

          $http({
            url: '/orderToPayment',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: transformRequestAsFormPost,
            data: $rootScope.payment
          }).then( function(response){

              window.open(
                response.data.url,
                "_self",
                "",
                false
              )



              if(response.data.data.paid){
                $rootScope.cartLoading = false;
                $rootScope.paymentProcessed = true;
                $rootScope.thankYou = response.data;
                  // $location.path('/shop/processed/'+orderID+'/'+$rootScope.checkout.gateway, true);

              }


          }, function(response){
            console.log("payment failed!");
            console.log(response);
            $rootScope.paymentProcessed = true;
            $rootScope.pageLoading = false;
          })
    }//paymentToProcess



    $rootScope.backFromPayment = function(){
      $rootScope.paymentProcessed = false;
      $rootScope.errorMessage = false;
      $rootScope.thankYou = false;
      $rootScope.cartLoading = false;
    }






}]);
