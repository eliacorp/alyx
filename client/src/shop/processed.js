'use strict'

var Processed = angular.module('myApp');

Processed.controller('processedCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll, $routeParams){




  $rootScope.retrieveOrder = ()=>{
    var orderID = $routeParams.order;
    console.log("retrieveOrder");
    $http({
      url: '/order/'+orderID+'/get',
      method: 'GET'
    }).then( function(response){
      console.log(response);

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


setTimeout(function(){
  if($routeParams.method == 'paypal-express'){
    $rootScope.retrieveOrder();
    // $rootScope.Processed = {value: false, error:false, data:response.data};
    // $rootScope.changeOrderStatus(response.data);

  }else if($routeParams.method == 'stripe'){
    $rootScope.changeOrderStatus($rootScope.Transaction);
  }
},600);




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
    // data.status.value = status;
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
    if($routeParams.method == 'paypal-express'){
      console.log('method:',$routeParams.method);

      if($rootScope.Product){
        $scope.searchProduct(response.data.result);
      }else{
        $rootScope.$on('productArrived', function(){
          console.log("productArrived");
          $scope.searchProduct(response.data.result);
        });
      }
    }else {
      $scope.searchProduct(response.data.result);
    }

    $scope.eraseCart();


  }, function(error){
    console.log(error);
    $rootScope.Processed = {value: false, error:true, data:error.data};

  })
}



 $scope.searchProduct = (data) =>{
   console.log("searchProduct");
  var contents = data;

    for (var i in contents){

      if(contents[i].product.data.modifiers.length!=0){
        console.log("has modifiers");
        var key = Object.keys(contents[i].product.data.modifiers)[0];
        var thisProduct = contents[i].product.data.modifiers[key].data.product;

          for (var p in $rootScope.Product){
            if($rootScope.Product[p].id==thisProduct){
              console.log("this product id");
              console.log(thisProduct);
              // var thisProduct = $rootScope.Product[p].id;
              var quantity = contents[i].quantity;
              console.log("quantity", quantity);
              console.log($rootScope.Product[p].stock_level);
              var stock = $rootScope.Product[p].stock_level - contents[i].quantity;
              $scope.updateStockLevel(thisProduct, stock);
            }

          }






          // if($routeParams.method=='paypal-express'){
          //   $http({
          //     url: '/product/'+thisProduct+'/variations/get',
          //     method: 'GET',
          //   }).then(function(response){
          //     console.log("get variations");
          //
          //     for (var p in $rootScope.Product){
          //       if($rootScope.Product[p].id==thisProduct){
          //         console.log("this product id");
          //         console.log(thisProduct);
          //
          //         $rootScope.Variations=response.data.result;
          //         $scope.sizeLoading = false;
          //
          //         for (var m in $rootScope.Product[p].modifiers){
          //           for (var v in $rootScope.Product[p].modifiers[m].variations){
          //
          //             for (var t in $rootScope.Variations){
          //               var key = Object.keys($rootScope.Variations[t].modifiers)[0];
          //               var title = $rootScope.Variations[t].modifiers[key].var_title;
          //
          //               if(title==$rootScope.Product[p].modifiers[m].variations[v].title){
          //                 $rootScope.Product[p].modifiers[m].variations[v].stock_level = $rootScope.Variations[t].stock_level;
          //                 console.log("$rootScope.Product[p].modifiers[m].variations[v].stock_level",$rootScope.Product[p].modifiers[m].variations[v].stock_level);
          //
          //                 if(contents[i].product.data.modifiers[key].var_title == $rootScope.Variations[t].modifiers[key].var_title){
          //                   var v_thisProduct = contents[i].product.data.id;
          //                   var v_quantity = contents[i].quantity;
          //                   var v_stock = $rootScope.Product[p].modifiers[m].variations[v].stock_level - contents[i].quantity;
          //                   console.log("v_thisProduct", v_thisProduct);
          //                   console.log("v_quantity", v_quantity);
          //                   console.log("v_stock", v_stock);
          //                   $scope.updateStockLevel(v_thisProduct, v_stock);
          //                 }
          //               }
          //             }
          //           }
          //         }
          //       }
          //     }
          //
          //   },function(error){
          //     console.log(error);
          //       $route.reload();
          //
          //   });
          // }






      }
      // else if((contents[i].product.data.modifiers.length==0) && ($routeParams.method=='paypal-express')){
      //   //temporary paypal fix for items with no variation
      //   console.log("temporary paypal fix for items with no variation");
      //     //if the item has no vaiation
      //     var thisProduct = contents[i].product.data.id;
      //     console.log("contents[i].product.data.id",contents[i].product.data.id);
      //     // $scope.updateStockLevel(thisProduct, stock);
      //
      //     for (var p in $rootScope.Product){
      //       if($rootScope.Product[p].id==thisProduct){
      //         // var thisProduct = $rootScope.Product[p].id;
      //         var quantity = contents[i].quantity;
      //         var stock = $rootScope.Product[p].stock_level - contents[i].quantity;
      //         console.log("quantity", quantity);
      //         console.log("stock", stock);
      //         $scope.updateStockLevel(thisProduct, stock);
      //       }
      //     }
      //
      // }


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
