'use strict'

var Shop = angular.module('myApp');
Shop.filter('shopFilter', function ($sce, $routeParams, $rootScope) {
  return function(data) {

    if($rootScope.Product){
                var filter = $rootScope.filter;
                var filtered = [];


                if(!filter.selected){
                  return data;
                }else{


                  // console.log('category: '+category);
                  for (var i in $rootScope.Product){

                    if(!$rootScope.Product[i].collection){

                    }else if($rootScope.Product[i].collection.value){
                      console.log("collection",$rootScope.Product[i].collection);
                      if($rootScope.Product[i].collection.data.slug == filter.selected){
                        filtered = filtered.concat($rootScope.Product[i]);
                      }
                    }
                  }
                  return filtered;
                }

    }

  };
});

Shop.controller('shopCtrl', [ '$scope','$location', '$rootScope', '$http','transformRequestAsFormPost','$document','anchorSmoothScroll','$routeParams', function($scope, $location, $rootScope, $http, transformRequestAsFormPost, $document, anchorSmoothScroll, $routeParams){

$rootScope.page = "product";

  $rootScope.shopSections= [];
  $rootScope.Section= {};
  $rootScope.Product = [];
  $rootScope.isGradient = true;



$rootScope.getProductsFN=function(){
  console.log("getting products");
  $http({method: 'GET', url: '/getProducts'}).then(function(response){
    $rootScope.Product = response.data;
    console.log($rootScope.Product);
    // for (var i in $rootScope.Product){
    //   $rootScope.detailUpdate($rootScope.Product[i].sku);
    //   return false;
    // }
    $rootScope.$broadcast("productArrived");
    setTimeout(function(){
      $rootScope.pageLoading = false;
      $rootScope.$apply();
    }, 800);
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
        });
  }//addToCart





//......FILTER

if($routeParams.shopcollection){
  $rootScope.filter ={type:'collection', selected: $routeParams.shopcollection};
}else{
  $rootScope.filter ={type:"", selected: ""};
}



$rootScope.selectFilter=(thistype, id)=>{
  $rootScope.pageLoading = false;
  $rootScope.filter = {type:thistype, selected: id};
  $location.path('/shop/collection/'+id, false);

}







//......VARIATIONS

  $rootScope.addVariation = function(){

    if($rootScope.selectedVariation){
      $http({
        url: '/addVariation',
        method: 'POST',
        data: $rootScope.selectedVariation
      }).then(function(response){
        // $rootScope.Cart = response;
        $rootScope.updateCart();
      });
    }else{
      $scope.variationErrorMessage = "select a size first"
      setTimeout(function(){
        $scope.variationErrorMessage = false;
        $rootScope.$apply();
      });
    }


  }//addToCart




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



//attaching item function cart
  $rootScope.attachItemID=function(obj){
      Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        $rootScope.Cart.contents[val].item=val;
        // console.log(val + ' -> ' + obj[val]);
      });
  }




$rootScope.setSections = ()=>{
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
      "name":"choice",
      "url":"/shop/choice",
      "previous": "shipment",
      "next": "payment",
      "index": 4,
      "forwardActive": false
    },
    {
      "name":"payment",
      "url":"/shop/payment",
      "previous": "choice",
      "next": "processed",
      "index": 5,
      "forwardActive": false
    },
    {
      "name":"processed",
      "url":"/shop/processed",
      "previous": "payment",
      "next": 'none',
      "index": 6,
      "forwardActive": false
    }
  ];
}

$rootScope.setSections();




  $rootScope.Section = $rootScope.shopSections[0];






  $rootScope.thisProduct = function(id){
    $rootScope.detailUpdate(id);
    $location.path('/shop/product/'+id, true);
  };


  $rootScope.goHorizontal = function(id, number) {
    $rootScope.Section= $rootScope.shopSections[number];

    if(id=='detail'){
      $location.path('/shop/product/'+$rootScope.Detail.sku, true);
    }else{
      $location.path($rootScope.shopSections[number].url, true);
    }

  };








}]);//shop controller









Shop.controller('detailCtrl', function($rootScope, $scope, $location, $routeParams, $route, $http){


  $rootScope.Detail={};
  $rootScope.selectedVariation = {};
  $rootScope.howManyVAriationsSelected = 0;
  $rootScope.page = "detail";


  $scope.$on('$routeChangeSuccess', function(){

    var sku =$routeParams.detail;
    $rootScope.detailUpdate(sku);

    setTimeout(function(){
      if(!$rootScope.Detail.id){
        $rootScope.detailUpdate($routeParams.detail);
        $scope.$apply();
        console.log("I loaded it again");
        console.log($rootScope.Detail);
      }else{
        console.log("detail loaded correctly");
        console.log($rootScope.Detail);
        return false
      }
    },3000);


  });






  $rootScope.detailUpdate = (sku) => {
    $rootScope.selectedVariation={};
    $rootScope.howManyVAriationsSelected = 0;
    $rootScope.Detail.total_variations=0;
    $scope.getVariationsLevel($rootScope.Detail.id);

    for (var i in $rootScope.Product){
      if ($rootScope.Product[i].sku == sku){
        $rootScope.Product[i].sku
        $rootScope.Detail=$rootScope.Product[i];
        $rootScope.Detail.total_variations=0;
        $rootScope.Detail.has_variation = $rootScope.has_variation;

        var go = true;
        //has variation
        for (i in $rootScope.Detail.modifiers){
          $rootScope.Detail.total_variations =$rootScope.Detail.total_variations+1;
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



  // $rootScope.detailUpdate($routeParams.detail);



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







$scope.getVariationsLevel = (productId)=>{

  $http({
    url: '/product/'+productId+'/variations/get',
    method: 'GET',
  }).then(function(response){
    console.log(response);
  },function(error){
    console.log(error);

  });
}



});
