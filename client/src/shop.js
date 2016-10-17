'use strict'

var Shop = angular.module('myApp');
Shop.filter('shopFilter', function ($sce, $routeParams, $rootScope) {
  return function(data) {
    var collection = $routeParams.collection;
    var filtered = [];
    // console.log('category: '+category);
    for (var i in $rootScope.Product){

      if($rootScope.Product[i].collection){
        if($rootScope.Product[i].collection.data.slug == collection){
          filtered = filtered.concat($rootScope.Product[i]);
        }
      }
    }
    if(!collection){
      return data;
    }else{return filtered;}

  };
});

Shop.controller('shopCtrl', [ '$scope','$location', '$rootScope', '$http','transformRequestAsFormPost','$document','anchorSmoothScroll','$routeParams', function($scope, $location, $rootScope, $http, transformRequestAsFormPost, $document, anchorSmoothScroll, $routeParams){

$rootScope.page = "product";

  $rootScope.shopSections= [];
  $rootScope.Section= {};
  $rootScope.Product = [];
  $rootScope.isGradient = true;

$rootScope.getProducts = ()=>{
  $http({method: 'GET', url: '/getProducts'}).then(function(response){
    console.log(response);
    $rootScope.Product = response.data;
    for (var i in $rootScope.Product){
      $rootScope.detailUpdate($rootScope.Product[i].sku);
      return false
    }
  }, function(){
    console.log("an error occurred");

  });
}



$rootScope.getProductsFN=function(){
  console.log("getting products");
  $http({method: 'GET', url: '/getProducts'}).then(function(response){
    console.log(response);
    $rootScope.Product = response.data;
    for (var i in $rootScope.Product){
      $rootScope.detailUpdate($rootScope.Product[i].sku);
      return false;
    }
  }, function(error){
    console.log(error);
    console.log("products status 400");
  });
}


$rootScope.getProductsFN();







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
      "url":"/shop",
      "previous": false,
      "next": "cart",
      "index": 0,
      "forwardActive": false
    },
    {
      "name":"detail",
      "url":"/shop/detail/",
      "previous": "products",
      "next": "cart",
      "index": 1,
      "forwardActive": false
    },
    {
      "name":"cart",
      "url":"/shop/cart",
      "previous": "detail",
      "next": "shipment",
      "index": 2,
      "forwardActive": false
    },
    {
      "name":"shipment",
      "url":"/shop/shipment",
      "previous": "cart",
      "next": "payment",
      "index": 3,
      "forwardActive": false
    },
    {
      "name":"payment",
      "url":"/shop/payment",
      "previous": "shipment",
      "next": "processed",
      "index": 4,
      "forwardActive": false
    },
    {
      "name":"processed",
      "url":"/shop/processed",
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
    $location.path('/shop/product/'+id, false);
  };


  $rootScope.goHorizontal = function(id, number) {
    console.log("where",id);
    $rootScope.Section= $rootScope.shopSections[number]
    anchorSmoothScroll.scrollHorizontally($rootScope.shopSections[number].offset, id);
    $location.path($rootScope.shopSections[number].url, false);
  };






}]);//shop controller









Shop.controller('detailCtrl', function($rootScope, $scope, $location, $routeParams, $route){


  $rootScope.Detail={};
  $rootScope.selectedVariation = {};
  $rootScope.howManyVAriationsSelected = 0;

$rootScope.page = "detail";



  $scope.$on('$routeChangeSuccess', function(){
    var sku = $routeParams.detail;
    console.log('sku'+sku);
    $rootScope.detailUpdate(sku);
  });






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
