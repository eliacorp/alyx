'use strict'

var Shop = angular.module('myApp');
Shop.filter('shopFilter', function ($sce, $routeParams, $rootScope) {
  return function(data) {

    if($rootScope.Product){
                var filter = $rootScope.filter;
                $rootScope.filtered = [];


                if(!filter.collection.selected && !filter.gender.selected){
                  return data;
                }else{

                  // console.log('category: '+category);
                  for (var i in $rootScope.Product){

                    if(!$rootScope.Product[i].collection){

                    }else if($rootScope.Product[i].collection.value){

                      if($rootScope.filter.collection.selected && $rootScope.filter.gender.selected){

                        for (var c in $rootScope.Product[i].category.data){
                          if(($rootScope.Product[i].category.data[c].slug == $rootScope.filter.gender.selected) && ($rootScope.Product[i].collection.data.slug == filter.collection.selected)){
                            $rootScope.filtered = $rootScope.filtered.concat($rootScope.Product[i]);
                          }
                        }

                      }else if($rootScope.filter.collection.selected){

                        if($rootScope.Product[i].collection.data.slug == filter.collection.selected){
                          $rootScope.filtered = $rootScope.filtered.concat($rootScope.Product[i]);
                        }

                      }else if($rootScope.filter.gender.selected){
                        for (var c in $rootScope.Product[i].category.data){
                          if($rootScope.Product[i].category.data[c].slug == $rootScope.filter.gender.selected){
                            $rootScope.filtered = $rootScope.filtered.concat($rootScope.Product[i]);
                          }
                        }
                      }
                    }
                  }
                  return $rootScope.filtered;
                }

    }

  };
});

Shop.controller('shopCtrl', [ '$scope','$location', '$rootScope', '$http','transformRequestAsFormPost','$document','anchorSmoothScroll','$routeParams', function($scope, $location, $rootScope, $http, transformRequestAsFormPost, $document, anchorSmoothScroll, $routeParams){

  // $scope.filtered = [];
  $rootScope.page = "product";
  $rootScope.shopSections= [];
  $rootScope.Section= {};
  $rootScope.isGradient = true;
  $rootScope.filter={
    gender:{
      selected:''
    },
    collection:{
      selected:''
    }
  };








//......FILTER

// if($routeParams.shopcollection){
//   $rootScope.filter ={type:'collection', selected: $routeParams.shopcollection};
// }else{
//   $rootScope.filter ={type:"", selected: ""};
// }



$rootScope.selectFilter=(thistype, id)=>{
  // $rootScope.pageLoading = false;

  if(!id){
    $rootScope.filter['collection'].selected = id;
    $rootScope.filter['gender'].selected = id;

  }else{
    $location.search(thistype, id);
    $rootScope.filter[thistype].selected = id;
    console.log($rootScope.filter);
  }


}







//..add product


$rootScope.addToCart = function(id){

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




  // $rootScope.updateCart = function(){
  //       $http({
  //         url: '/getCart',
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded'
  //         },
  //         transformRequest: transformRequestAsFormPost
  //       }).then(function(response){
  //         $rootScope.Cart = response.data;
  //
  //         console.log($rootScope.Cart);
  //         //attaching item id if cart>0
  //         if(!$rootScope.Cart.total_items==0){
  //           console.log("cart has some stuff");
  //           $rootScope.attachItemID($rootScope.Cart.contents);
  //         }
  //       });
  // }//updateCart






//attaching item function cart
  $rootScope.attachItemID=function(obj){
      Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        $rootScope.Cart.contents[val].item=val;
        // console.log(val + ' -> ' + obj[val]);
      });
  }



  $rootScope.thisProduct = function(id){
    $rootScope.detailUpdate(id);
    $location.path('/shop/product/'+id, true);
  };









}]);//shop controller









Shop.controller('detailCtrl', function($rootScope, $scope, $location, $routeParams, $route, $http){


  $rootScope.Detail={};
  $rootScope.selectedVariation = {};
  $rootScope.howManyVAriationsSelected = 0;
  $rootScope.page = "detail";
  $rootScope.Variations;
  $scope.sizeLoading = false;



  // var sku =$routeParams.detail;
  // $rootScope.detailUpdate(sku);

  $scope.$watch(function() {
    return $rootScope.Product;
  }, function(value) {
    if(value){
      $rootScope.detailUpdate($routeParams.detail);
    }
    // if(!$rootScope.Detail.id){
    //   $rootScope.detailUpdate($routeParams.detail);
    //   $scope.$apply();
    //   console.log("I loaded it again");
    //   console.log($rootScope.Detail);
    // }else{
    //   console.log("detail loaded correctly");
    //   console.log($rootScope.Detail);
    //   return false
    // }
  }, true);





  $scope.getVariationsLevel = (productId)=>{
    console.log('productId', productId);
    $scope.sizeLoading = true;

    $http({
      url: '/product/'+productId+'/variations/get',
      method: 'GET',
    }).then(function(response){
      $rootScope.Variations=response.data.result;
      $scope.sizeLoading = false;
      var n = 0;
      for (var m in $rootScope.Detail.modifiers){
        for (var v in $rootScope.Detail.modifiers[m].variations){

          for (var t in $rootScope.Variations){
            var key = Object.keys($rootScope.Variations[t].modifiers)[0];
            var title = $rootScope.Variations[t].modifiers[key].var_title;

            if(title==$rootScope.Detail.modifiers[m].variations[v].title){
              $rootScope.Detail.modifiers[m].variations[v].stock_level = $rootScope.Variations[t].stock_level;
            }
          }

        }

      }

    },function(error){
      console.log(error);
        $route.reload();

    });
  }



  $rootScope.detailUpdate = (sku) => {
    $rootScope.selectedVariation={};
    $rootScope.howManyVAriationsSelected = 0;
    $rootScope.Detail.total_variations=0;

    for (var i in $rootScope.Product){
      if ($rootScope.Product[i].sku == sku){
        $rootScope.Product[i].sku
        $rootScope.Detail=$rootScope.Product[i];
        $rootScope.Detail.total_variations=0;
        $rootScope.Detail.has_variation = $rootScope.has_variation;
        // $rootScope.pageLoading = false;
        $scope.getVariationsLevel($rootScope.Detail.id);

        var go = true;
        //has variation
        for (var m in $rootScope.Detail.modifiers){
          $rootScope.Detail.total_variations =$rootScope.Detail.total_variations+1;
          // if($rootScope.Detail.modifiers[i].id){$rootScope.has_variation=true;}else{$rootScope.has_variation=false;}
          $rootScope.Detail.has_variation = true;
          $rootScope.selectedVariation[m] =
            {
              open: true
            }
            go = false;
            console.log($rootScope.Variations);


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










});
