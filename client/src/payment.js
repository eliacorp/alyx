'use strict'

var Payment = angular.module('myApp');

Payment.controller('paymentCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){
  $rootScope.thankYou, $rootScope.payment;


    $rootScope.payment = {
                            id: '',
                            first_name: $rootScope.checkout.billing.first_name,
                            last_name: $rootScope.checkout.billing.last_name,
                            number: '',
                            expiry_month: '',
                            expiry_year:  '',
                            cvv:  ''
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
  }, true);





  $rootScope.checkPayment = ()=>{
    if($scope.paymentForm.$valid){
      $rootScope.paymentToProcess();
    }else{
      alert('invalid');
      $rootScope.error = {value: true, text:'data invalid'};
    }
  }




    $rootScope.paymentToProcess = function(){

      $rootScope.goHorizontal('payment', 4);

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

              if(response.data.paid){
                $rootScope.cartLoading = false;

                $rootScope.paymentProcessed = true;
                $rootScope.thankYou = response;
                console.log($rootScope.thankYou);

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
