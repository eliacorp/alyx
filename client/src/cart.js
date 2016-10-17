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

  // $rootScope.$watch('Cart', function(newValue) {
  //     console.log(newValue);
  //     $rootScope.Cart = newValue;
  //     $rootScope.animateCart();
  // });



  $rootScope.updateCart = function(){
        $http({
          url: '/getCart',
          method: 'GET',
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: transformRequestAsFormPost
          // data: {
          //       }
        }).then(function(response){
          $rootScope.Cart = response.data;

          console.log($rootScope.Cart);

          //attaching item id if cart>0
          if(!$rootScope.Cart.total_items==0){
            console.log("cart has some stuff");
            $rootScope.attachItemID($rootScope.Cart.contents);
          }
        });
  }//updateCart


  $rootScope.updateCart();




//attaching item function
  $rootScope.attachItemID=function(obj){
      Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        $rootScope.Cart.contents[val].item=val;
        // console.log(val + ' -> ' + obj[val]);
      });
  }






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
      $rootScope.goHorizontal('shipment', 3);
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
