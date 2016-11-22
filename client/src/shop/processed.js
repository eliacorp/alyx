'use strict'

var Processed = angular.module('myApp');

Processed.controller('processedCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll, $routeParams){




  $rootScope.retrieveOrder = ()=>{
    var orderID = $routeParams.order;
    $http({
      url: '/order/'+orderID+'/get',
      method: 'GET'
    }).then( function(response){

      console.log(response);
      $rootScope.Processed = {value: false, error:false, data:response.data};
      $rootScope.changeOrderStatus('paid', response.data);
    }, function(error){
      console.log(error);
      $rootScope.Processed = {value: false, error:true, data:error.data};
      // $rootScope.changeOrderStatus('Unpaid');
    })
  }


setTimeout(function(){
  if($routeParams.method == 'paypal-express'){
    $rootScope.retrieveOrder();
  }else if($routeParams.method == 'stripe'){
    console.log('stripe stripe stripe stripe');
    console.log($rootScope.Transaction);
    $rootScope.changeOrderStatus('paid', $rootScope.Transaction);
  }
},600);





$rootScope.changeOrderStatus =(status, data)=>{
  var orderID = $routeParams.order;
  var obj = {};

  if($routeParams.method == 'paypal-express'){
    // data.status.value = status;
    obj = {status: status, payment_number: $routeParams.token};
  }else if($routeParams.method == 'stripe'){
    obj = {status: status, payment_number:data.id};
  }


  $http.post('/order/'+orderID+'/put', obj)
  .then( function(response){
    console.log(response);
    $rootScope.Processed = {value: true, error:false, data:response.data};
    $rootScope.pageLoading = false;
    $rootScope.getOrderItems();
    $scope.eraseCart();
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
  var orderID = $routeParams.order;
  console.log("$routeParams.order:",$routeParams.order);
  $http({
    url: '/order/'+orderID+'/items',
    method: 'GET'
  }).then( function(response){
    console.log(response.data);

    $rootScope.Processed.data.items= response.data;
    $scope.searchProduct(response.data.result);


  }, function(error){
    console.log(error);
    $rootScope.Processed = {value: false, error:true, data:error.data};

  })
}



 $scope.searchProduct = (data) =>{
  var contents = data;
  console.log("updateOverallStockFN");
  console.log(contents);

    for (var i in contents){

      var key = Object.keys(contents[i].product.data.modifiers)[0];

      var thisProduct = contents[i].product.data.modifiers[key].data.product
      console.log(contents[i].product.data.modifiers[key].data.product);

        for (var p in $rootScope.Product){
          if($rootScope.Product[p].id==thisProduct){
            // var thisProduct = $rootScope.Product[p].id;
            var quantity = contents[i].quantity;
            var stock = $rootScope.Product[p].stock_level - contents[i].quantity;
            console.log('thisProduct: '+thisProduct);
            console.log('stock: '+stock);
            $scope.updateStockLevel(thisProduct, stock);
          }
        }
    }//for loop
}




$scope.updateStockLevel =(thisProduct, stock)=>{
  $http.post('/product/'+thisProduct+'/stock_level/'+stock)
  .then( function(response){
    console.log(response);

  }, function(error){
    console.log(error);

  })
}


$scope.eraseCart =()=>{
  $http.post('/cart/erase')
  .then( function(response){
    console.log(response);

  }, function(error){
    console.log(error);

  })
}






});
