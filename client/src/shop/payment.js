'use strict'

var Payment = angular.module('myApp');

Payment.controller('paymentCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll){
  $rootScope.thankYou, $rootScope.payment;
;

    $rootScope.payment = {
                            id: '',
                            gateway:'',
                            first_name: $rootScope.checkout.billing.first_name,
                            last_name: $rootScope.checkout.billing.last_name,
                            number: '5555555555554444',
                            expiry_month: '02',
                            expiry_year:  '2018',
                            cvv:  '756'
                          };


  $scope.$watch('paymentForm.$valid', function(newVal, oldVal){
    console.log("change");
    console.log("old", oldVal);
    console.log("new", newVal);
    if ($scope.paymentForm.$valid){
      $rootScope.Section.forwardActive = true;
    }else{
      $rootScope.Section.forwardActive = false;
    }
  }, false);




  $rootScope.checkPayment = ()=>{
    if($scope.paymentForm.$valid){
      $rootScope.paymentToProcess();
    }else{
      alert('invalid');
      $rootScope.error = {value: true, text:'data invalid'};
    }
  }



    $rootScope.paymentToProcess = function(){

      $rootScope.payment.gateway = $rootScope.checkout.gateway;
      $rootScope.cartLoading = true;
      $rootScope.thankYou = false;
      this.error = {value: false, text:''};
      console.log("payment started");

          $http({
            url: '/orderToPayment',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: transformRequestAsFormPost,
            data: $rootScope.payment
          }).then( function(response){

              console.log("payment succeeded");
              console.log(response);

              if(response.data.data.paid){
                $rootScope.cartLoading = false;
                $rootScope.paymentProcessed = true;
                $rootScope.thankYou = response.data;
                $rootScope.goHorizontal('processed', 6);
              }


          }, function(response){
            console.log("payment failed!");
            console.log(response);
            $rootScope.paymentProcessed = true;
            this.error = {value: true, text:response.data};
            $rootScope.cartLoading = false;
          })
    }//paymentToProcess

    $rootScope.paymentToProcess_paypal = function(){

      $rootScope.payment.gateway = $rootScope.checkout.gateway;
      $rootScope.cartLoading = true;
      $rootScope.thankYou = false;
      this.error = {value: false, text:''};
      console.log("payment started");

          $http({
            url: '/orderToPayment',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: transformRequestAsFormPost,
            data: $rootScope.payment
          }).then( function(response){

              console.log("paypal succeeded");
              console.log(response);
              console.log(response.data.url);
              window.open(
                response.data.url,
                "_blank",
                "width=350,height=650",
                false
              )

              if(response.data.data.paid){
                $rootScope.cartLoading = false;
                $rootScope.paymentProcessed = true;
                $rootScope.thankYou = response.data;
                $rootScope.goHorizontal('processed', 6);
              }


          }, function(response){
            console.log("payment failed!");
            console.log(response);
            $rootScope.paymentProcessed = true;
            this.error = {value: true, text:response.data};
            $rootScope.cartLoading = false;
          })
    }//paymentToProcess



    $rootScope.backFromPayment = function(){
      $rootScope.paymentProcessed = false;
      $rootScope.errorMessage = false;
      $rootScope.thankYou = false;
      $rootScope.cartLoading = false;
    }


});
