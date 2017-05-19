'use strict'

var Cart = angular.module('myApp');

Cart.controller('cartCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost','$window', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $window){
  $rootScope.Cart;
  $rootScope.showCart = false;
  $rootScope.cartChanged = false;

  $rootScope.openCart = function(){
    $rootScope.updateCart();
    $location.path('shop/cart', true);
    $scope.$on('$viewContentLoaded', function(event) {
      $window.ga('ec:setAction','cart', {
          'step': 1
      });
      $window.ga('send', 'pageview');
    });

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
        $scope.$on('$viewContentLoaded', function(event) {
          $rootScope.updateCart();
        });

      });
}



$scope.google_cart=(products)=>{
  for (var i in products){
    var data = products[i];
    $window.ga('ec:addProduct', {               // Provide product details in an productFieldObject.
      'id': data.id,                   // Product ID (string).
      'name': data.title, // Product name (string).
      'category': data.category.value,            // Product category (string).
      'brand': 'Alyx',                // Product brand (string).
      'variant': data.sku.substr(data.sku.indexOf("_") + 1),               // Product variant (string).
      'price': data.price,                 // Product price (currency).
      'quantity': data.quantity                     // Product quantity (number).
    });
    $window.ga('ec:setAction','shipment', {
        'step': 2,
        'option': 'register'
    });
    $window.ga('ec:setAction','checkout', {'step': 2});
    $window.ga('send', 'pageview');     // Pageview for shipping.html
  }
}







  $rootScope.cartToShipment = function(){
    if($rootScope.Cart.total_items>0){
      $scope.google_cart($rootScope.Cart.items);
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
