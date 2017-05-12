'use strict'

var Cart = angular.module('myApp');

Cart.controller('cartCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){

console.log("cartCtrl");

  $rootScope.Cart;
  $rootScope.showCart = false;
  $rootScope.cartChanged = false;

  $rootScope.openCart = function(){
    if($rootScope.readCookie('cart')){
      $rootScope.updateCart();
    }
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
        var cartID = $rootScope.readCookie('cart');
        console.log("cartID", cartID);
        $http({
          url: '/cart/get/'+cartID,
          method: 'GET'
        }).then(function(response){
          console.log(response);
          $rootScope.Cart = response.data.data;
          $rootScope.animateCart();

          // //attaching item id if cart>0
          // if(!$rootScope.Cart.total_items==0){
          //   $rootScope.attachItemID($rootScope.Cart.contents);
          // }
        }, function(error){

        });
  }//updateCart




setTimeout(function(){
  if($rootScope.readCookie('cart')){
    $rootScope.updateCart();
  }

},1000);










$rootScope.removeItem = function(product_id, variant_id){
  var cartID = $rootScope.readCookie('cart');

      $http({
        url: '/cart/'+cartID+'/remove/items',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: transformRequestAsFormPost,
        data: {
                product_id: product_id,
                variant_id: variant_id
              }
      }).then(function(response){
        $rootScope.Cart = response.data.data;
        $rootScope.updateCart();
      });
}


  $rootScope.cartToShipment = function(){
    if($rootScope.Cart.items.length>0){
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



}]);
