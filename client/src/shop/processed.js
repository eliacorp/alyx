'use strict'

var Processed = angular.module('myApp');

Processed.controller('processedCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll, $routeParams){



//retrieve order data
  $rootScope.retrieveOrder = ()=>{
    var orderID = $routeParams.order;
    console.log("retrieveOrder");
    $http({
      url: '/order/'+orderID+'/get',
      method: 'GET'
    }).then( function(response){
      if(response.data.status.data.key =='unpaid'){
        $rootScope.completePayment_Paypal();
      }else{
        $rootScope.Processed = {value: true, error:false, data:response.data};
      }
    }, function(error){
      console.log(error);
      $rootScope.Processed = {value: false, error:true, data:error.data};
    })
  }



//first process
setTimeout(function(){
  if($routeParams.method == 'paypal-express'){
    $rootScope.retrieveOrder();

  }else if($routeParams.method == 'stripe'){
    $rootScope.changeOrderStatus($rootScope.Transaction);
  }
},600);






//paypal complete purchase function
$rootScope.completePayment_Paypal = ()=>{
  var orderID = $routeParams.order;
  var obj = {token: $routeParams.token, PayerID: $routeParams.PayerID};

  $http.post('/checkout/payment/complete_purchase/'+orderID, obj)
  .then( function(response){
    $rootScope.Processed = {value: true, error:false, data:response.data};
    console.log(response);
    if(response.data.result.order.status.data.key =='paid'){
      $rootScope.pageLoading = false;
      console.log("/checkout/payment/complete_purchase/");
      console.log(response.data);
      $rootScope.Transaction={"empty":""};
      $rootScope.changeOrderStatus($rootScope.Transaction);
    }

    $rootScope.loadVideo();
  }, function(error){
    console.log(error);
    $rootScope.pageLoading = false;
    $rootScope.Processed = {value: true, error:true, data:error.data};
  })

}





$rootScope.changeOrderStatus =(data)=>{
  var orderID = $routeParams.order;
  var obj = {};

  if($routeParams.method == 'paypal-express'){
    obj = {payment_number: $routeParams.token};
    // $scope.eraseCart();
  }else if($routeParams.method == 'stripe'){
    obj = {payment_number:data.id};
    console.log("stripe payment number:", obj);

  }


  $http.post('/order/'+orderID+'/put', obj)
  .then( function(response){
    console.log("changeOrderStatus");
    $rootScope.Processed = {value: true, error:false, data:response.data};
    console.log(response);
    console.log("response.data.status.value.key");
    if(response.data.status.data.key !='paid'){
      $rootScope.pageLoading = false;
      console.log("not paid");

    }else if(response.data.status.data.key =='paid'){
      $rootScope.getOrderItems();
    }

    $rootScope.loadVideo();
  }, function(error){
    console.log(error);
    $rootScope.pageLoading = false;
    $rootScope.Processed = {value: true, error:true, data:error.data};
  })

}





//loading the final video
$rootScope.loadVideo = ()=>{
  setTimeout(function(){
    var vid = document.getElementById("processed-video");
    vid.volume = 0.2;
    $rootScope.playPause =()=> {
      if(vid.paused){
        vid.play();
      }else{
        vid.pause();
      }
    }
    $rootScope.$apply();
  }, 2500);
}

  $rootScope.loadVideo();





$rootScope.getOrderItems = ()=>{
  console.log("getOrderItems");
  var orderID = $routeParams.order;
  $http({
    url: '/order/'+orderID+'/items',
    method: 'GET'
  }).then( function(response){
    console.log(response);
    $rootScope.Processed.data.items= response.data;
    $scope.mailOrder($rootScope.Processed.data);
    if($routeParams.method == 'paypal-express'){
      console.log('method:',$routeParams.method);

      if($rootScope.Product){
        $scope.updateStockLevel(response.data.result);
      }else{
        $rootScope.$on('productArrived', function(){
          console.log("productArrived");
          $scope.updateStockLevel(response.data.result);
        });
      }
    }else {
      $scope.updateStockLevel(response.data.result);
    }

    $scope.eraseCart();


  }, function(error){
    console.log(error);
    $rootScope.Processed = {value: false, error:true, data:error.data};

  })
}





// update global stock level of the product
$scope.updateStockLevel =(data)=>{
  $http.post('/product/update_stock', data)
  .then(function(response){
    console.log(response);
  }, function(error){
    console.log(error);
  })
}




// erase shopping cart
$scope.eraseCart =()=>{
  $http.post('/cart/erase')
  .then( function(response){
    console.log(response);

  }, function(error){
    console.log(error);

  })
}






// send order data as email to our team
$scope.mailOrder=(order)=>{
  $http.post('/mail/order/'+order.id, order)
  .then( function(response){
    console.log("mailOrder");
    console.log(response);

  }, function(error){
    console.log(error);
  });

}








});
