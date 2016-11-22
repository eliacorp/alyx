'use strict'

var Cart = angular.module('myApp');

Cart.controller('cartCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){
  $rootScope.Cart;
  $rootScope.showCart = false;
  $rootScope.cartChanged = false;

  $rootScope.openCart = function(){
    $rootScope.showCart = !$rootScope.showCart;
    $rootScope.updateCart();
  }

  $rootScope.closeCart = function(){
    $rootScope.showCart = false;
  }

  $rootScope.$watch('Cart', function(newValue) {
      console.log("animate");
      // $rootScope.Cart = newValue;
      $rootScope.animateCart();

  });



  $rootScope.updateCart = function(){
    console.log("updatecart");
        $http({
          url: '/cart/get',
          method: 'GET'
        }).then(function(response){
          console.log(response);
          $rootScope.Cart = response.data;

          console.log($rootScope.Cart);
          $rootScope.animateCart();

          //attaching item id if cart>0
          if(!$rootScope.Cart.total_items==0){
            console.log("cart has some stuff");
            $rootScope.attachItemID($rootScope.Cart.contents);
          }
        }, function(error){

        });
  }//updateCart

setTimeout(function(){
  $rootScope.updateCart();
},2000);










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
        console.log("object removed");
        $rootScope.Cart = response;

        $rootScope.updateCart();
        console.log(response);
      });
}


  $rootScope.cartToShipment = function(){
    console.log("toShipment");
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
    console.log("animate");
    setTimeout(function(){$rootScope.cartChanged = false; $rootScope.$apply();}, 900);
  }



});
