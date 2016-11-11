'use strict'

var Payment = angular.module('myApp');

Payment.controller('paymentCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll){
 $rootScope.payment;
  $rootScope.Processed={value: false, error:false, data:''};

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
    if ($scope.paymentForm.$valid){
      $rootScope.payment_forwardActive = true;
    }else{
      $rootScope.payment_forwardActive = false;
    }
  }, false);




  $rootScope.checkPayment = ()=>{
    if($scope.paymentForm.$valid){
      $rootScope.changeOrderGateway();
    }else{
      alert('invalid');
      $rootScope.error = {value: true, text:'data invalid'};
    }
  }




  $rootScope.changeOrderGateway =()=>{
    var orderID = $rootScope.Order.id;
    console.log('orderID:'+ orderID);

    if($rootScope.checkout.gateway == 'stripe'){
      $rootScope.paymentToProcess();
    }else if($rootScope.checkout.gateway == 'paypal-express'){
      var obj = {gateway: $rootScope.checkout.gateway};
      $http.post('/order/'+orderID+'/put', obj)
      .then( function(response){
        console.log(response);

        $rootScope.paymentToProcess_paypal();
      }, function(error){
        console.log(error);
        $rootScope.pageLoading = false;
      })
    }

  }







    $rootScope.paymentToProcess = function(){

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

              if(response.data.data.paid){

                console.log(response.data);

                $rootScope.cartLoading = false;
                $rootScope.Processed={value: true, error:false, data:response.data.order};
                $rootScope.pageLoading = false;
                $rootScope.loadVideo();
                $location.path('/shop/processed/'+response.data.order.id+'/'+$rootScope.checkout.gateway, true);

              }


          }, function(response){
            console.log("payment failed!");
            console.log(response);
            $rootScope.Processed={value: true, error:true, data:response.data};
            $rootScope.pageLoading = false;
            $rootScope.cartLoading = false;
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

              console.log("paypal succeeded");
              console.log(response);
              console.log(response.data.url);

              window.open(
                response.data.url,
                "_self",
                "",
                false
              )

              // top.window.opener.location('http://localhost:8081');
              // http://localhost:8081/shop/processed?token=EC-7RJ70752S4425240G&PayerID=A7AF4APMN32NW

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






});
