'use strict'

var Shop = angular.module('myApp');

Shop.controller('shopCtrl', [ '$scope','$location', '$rootScope', '$http','transformRequestAsFormPost','$document','anchorSmoothScroll', function($scope, $location, $rootScope, $http, transformRequestAsFormPost, $document, anchorSmoothScroll){

  $rootScope.shopSections= [];
  $rootScope.Section= {};
  $rootScope.Product = [];
  $rootScope.isGradient = true;



  $http({method: 'GET', url: '/getProducts'}).then(function(response){
    console.log(response);
    $rootScope.Product = response.data;
    for (var i in $rootScope.Product){
      $rootScope.detailUpdate($rootScope.Product[i].sku);
      return false
    }
  }).then(function(){
    console.log("an error occurred");

  })



  $rootScope.addToCart = function(id){
      // var token = document.cookie;
      var token = $rootScope.readCookie("access_token");
        $http({
          url: '/addProduct',
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: transformRequestAsFormPost,
          data: {
                  id: id,
                  access_token:"helloooo"
                }
        }).then(function(response){
          $rootScope.Cart = response;
          $rootScope.updateCart();
          console.log(response);
        });
  }//addToCart









//......VARIATIONS

  $rootScope.addVariation = function(){

    if($rootScope.selectedVariation){
      $http({
        url: '/addVariation',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        // transformRequest: transformRequestAsFormPost,
        data: $rootScope.selectedVariation
      }).then(function(response){
        // $rootScope.Cart = response;
        $rootScope.updateCart();
        console.log(response);
      });
    }else{
      $scope.variationErrorMessage = "select a size first"
      setTimeout(function(){
        $scope.variationErrorMessage = false;
        $rootScope.$apply();
      });
    }


  }//addToCart







$rootScope.offset_FN = function(){

    setTimeout(function(){
      for (var i in $rootScope.shopSections){
        var elem = angular.element(document.querySelectorAll("#"+$rootScope.shopSections[i].name)[0]);
        $scope.thisSectionOffset = elem[0].offsetLeft
        $rootScope.shopSections[i].offset = $scope.thisSectionOffset;
        console.log($rootScope.shopSections[i].offset);
      }
    }, 1200);
}



  $rootScope.shopSections= [
    {
      "name":"products",
      "url":"/",
      "previous": false,
      "next": "cart",
      "index": 0,
      "forwardActive": false
    },
    {
      "name":"detail",
      "url":"/detail",
      "previous": "products",
      "next": "cart",
      "index": 1,
      "forwardActive": false
    },
    {
      "name":"cart",
      "url":"/cart",
      "previous": "detail",
      "next": "shipment",
      "index": 2,
      "forwardActive": false
    },
    {
      "name":"shipment",
      "url":"/shipment",
      "previous": "cart",
      "next": "payment",
      "index": 3,
      "forwardActive": false
    },
    {
      "name":"payment",
      "url":"/payment",
      "previous": "shipment",
      "next": "processed",
      "index": 4,
      "forwardActive": false
    },
    {
      "name":"processed",
      "url":"/processed",
      "previous": "payment",
      "next": false,
      "index": 5,
      "forwardActive": false
    }
  ];

  $rootScope.Section = $rootScope.shopSections[0];

  $rootScope.offset_FN();




  $rootScope.thisProduct = function(id){
    $rootScope.detailUpdate(id);
    $rootScope.goHorizontal('detail', 1);
  };


  $rootScope.goHorizontal = function(id, number) {
    $rootScope.Section= $rootScope.shopSections[number]
    anchorSmoothScroll.scrollHorizontally($rootScope.shopSections[number].offset, id);
  };




}]);//shop controller









Shop.controller('detailCtrl', function($rootScope, $scope, $location, $routeParams, $route){


  $rootScope.Detail={};
  $rootScope.selectedVariation = {};
  $rootScope.howManyVAriationsSelected = 0;

  $rootScope.detailUpdate = (sku) => {
    $rootScope.selectedVariation={};
    $rootScope.howManyVAriationsSelected = 0;
    $rootScope.Detail.total_variations=0;

    for (var i in $rootScope.Product){
      if ($rootScope.Product[i].sku == sku){
        $rootScope.Product[i].sku
        $rootScope.Detail=$rootScope.Product[i];
        $rootScope.Detail.total_variations=0;
        console.log("detail:", $rootScope.Detail);
        $rootScope.Detail.has_variation = $rootScope.has_variation;

        var go = true;
        //has variation
        for (i in $rootScope.Detail.modifiers){
          $rootScope.Detail.total_variations =$rootScope.Detail.total_variations+1;
          console.log($rootScope.Detail.total_variations);
          // if($rootScope.Detail.modifiers[i].id){$rootScope.has_variation=true;}else{$rootScope.has_variation=false;}
          $rootScope.Detail.has_variation = true;
          $rootScope.selectedVariation[i] =
            {
              open: true
            }

            go = false;
        }

        if(go==true){
          //does not have variation
          $rootScope.Detail.has_variation = false;
        }

      }
    }
  }







  $rootScope.showSelection = function(modifier_id){
    $rootScope.selectedVariation[modifier_id].open = !$rootScope.selectedVariation[modifier_id].open;
  }

  $rootScope.closeSelection = function(modifier_id){
    if($rootScope.selectedVariation[modifier_id].open == false){
      $rootScope.selectedVariation[modifier_id].open = true;
    }else{
      $rootScope.selectedVariation[modifier_id].open = false;
    }
  }



  $rootScope.thisVariation = function(id, modifier_id, modifier_title, variation_id, variation_title){
    var i=0;
    for ( i in $rootScope.Detail.modifiers){
      if($rootScope.Detail.modifiers[i].id==modifier_id){
        $rootScope.selectedVariation[i] =
          {
            id: id,
            modifier_id: modifier_id,
            modifier_title: modifier_title,
            variation_id: variation_id,
            variation_title: variation_title
          }
          if($rootScope.howManyVAriationsSelected<$rootScope.Detail.total_variations){
            $rootScope.howManyVAriationsSelected = $rootScope.howManyVAriationsSelected+1;
          }
      }

    }
  }




});
