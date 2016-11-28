'use strict'

var Cart = angular.module('myApp');

Cart.controller('cartCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){
  $rootScope.Cart;
  $rootScope.showCart = false;
  $rootScope.cartChanged = false;

  $rootScope.openCart = function(){
    $rootScope.updateCart();
    $location.path('shop/cart', true);
  }

  $rootScope.closeCart = function(){
    $rootScope.showCart = false;
  }

  $rootScope.$watch('Cart', function(newValue) {
      // $rootScope.Cart = newValue;
      $rootScope.animateCart();

  });



  $rootScope.updateCart = function(){
        $http({
          url: '/cart/get',
          method: 'GET'
        }).then(function(response){
          $rootScope.Cart = response.data;
          $rootScope.animateCart();

          //attaching item id if cart>0
          if(!$rootScope.Cart.total_items==0){
            $rootScope.attachItemID($rootScope.Cart.contents);
          }
        }, function(error){

        });
  }//updateCart

setTimeout(function(){
  $rootScope.updateCart();
},1000);










$rootScope.removeItem = function(id){

      $http({
        url: '/removeProduct',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: transformRequestAsFormPost,
        data: {
                id: id
              }
      }).then(function(response){
        $rootScope.Cart = response;
        $rootScope.updateCart();
      });
}


  $rootScope.cartToShipment = function(){
    if($rootScope.Cart.total_items>0){
      $location.path('/shop/shipment', true);
    }else{
      $rootScope.noProductsError=true;
      setTimeout(function(){
        $rootScope.noProductsError=false;
        $rootScope.$apply();
      },2000);

    }
  }


  //function that animates the cart button when you add a product
  $rootScope.animateCart = () =>{
    $rootScope.cartChanged = true;
    setTimeout(function(){$rootScope.cartChanged = false; $rootScope.$apply();}, 900);
  }



});
