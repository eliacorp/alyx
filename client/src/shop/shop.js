'use strict'

var Shop = angular.module('myApp');
Shop.filter('shopFilter', ['$sce', '$routeParams', '$rootScope', '$location', function ($sce, $routeParams, $rootScope, $location) {
  return function(data) {

    // if($rootScope.Product){
    //             var filter = $rootScope.filter;
    //             $rootScope.filtered = [];
    //
    //
    //             if(!filter.collection.selected && !filter.gender.selected){
    //               $location.search('');
    //               return data;
    //             }else{
    //
    //               // console.log('category: '+category);
    //               for (var i in $rootScope.Product){
    //
    //                 if(!$rootScope.Product[i].collection){
    //
    //                 }else if($rootScope.Product[i].collection.value){
    //
    //                   if($rootScope.filter.collection.selected && $rootScope.filter.gender.selected){
    //
    //                     for (var c in $rootScope.Product[i].category.data){
    //                       if(($rootScope.Product[i].category.data[c].slug == $rootScope.filter.gender.selected) && ($rootScope.Product[i].collection.data.slug == filter.collection.selected)){
    //                         $rootScope.filtered = $rootScope.filtered.concat($rootScope.Product[i]);
    //                       }
    //                     }
    //
    //                   }else if($rootScope.filter.collection.selected){
    //                     if($rootScope.Product[i].collection.data.slug == filter.collection.selected){
    //                       $rootScope.filtered = $rootScope.filtered.concat($rootScope.Product[i]);
    //                     }
    //
    //                   }else if($rootScope.filter.gender.selected){
    //                     for (var c in $rootScope.Product[i].category.data){
    //                       if($rootScope.Product[i].category.data[c].slug == $rootScope.filter.gender.selected){
    //                         $rootScope.filtered = $rootScope.filtered.concat($rootScope.Product[i]);
    //                         console.log(true);
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //               return $rootScope.filtered;
    //             }

    // }

  };
}]);

Shop.controller('shopCtrl', [ '$scope','$location', '$rootScope', '$http','transformRequestAsFormPost','$document','anchorSmoothScroll','$routeParams', '$window', function($scope, $location, $rootScope, $http, transformRequestAsFormPost, $document, anchorSmoothScroll, $routeParams, $window){

  // $scope.filtered = [];
  $rootScope.page = "product";
  $rootScope.shopSections= [];
  $rootScope.Section= {};
  $rootScope.isGradient = true;
  $rootScope.Category = [
    {
      id:'1374914795748196420',
      slug: 'men'
    },
    {
      id:'1374914959166668869',
      slug: 'women'
    }
  ]





  $scope.$on('$routeUpdate', function(){
    $rootScope.Product=[];
    $rootScope.Pagination={};
    $rootScope.getProductsFN(0);
  });




$scope.findCollection=(slug)=>{
  for (let i in $rootScope.Collection_shop){
    if($rootScope.Collection_shop[i].slug==slug){
      return $rootScope.Collection_shop[i].id;
    }
  }
}

$scope.findCategory=(slug)=>{
  for (var category of $rootScope.Category){
    if(category.slug==slug){
      return category.id;
    }
  }
}








  //get products
  $rootScope.Pagination;

  $rootScope.paginationInProcess=false;

  $rootScope.getProductsFN=function(offset){
    $rootScope.paginationInProcess=true;
    var url = '/product/list?offset='+offset;
    if($routeParams.collection){
      var collection_id = $scope.findCollection($routeParams.collection);
      url=url+'&collection='+collection_id;
    }

    if($routeParams.gender){
      var category = $scope.findCategory($routeParams.gender);
      url=url+'&category='+category;
    }


    $http({method: 'GET', url: url}).then(function(response){
      $rootScope.Product = $rootScope.Product.concat(response.data.result);
      $rootScope.Pagination = response.data.pagination;
      $rootScope.$broadcast("productArrived");
      $rootScope.pageLoading = false;
      $rootScope.paginationInProcess=false;
    }, function(error){
      console.log(error);
      console.log("products status 400");
    });
  }


  if($rootScope.Pagination){
    // $rootScope.getProductsFN($rootScope.Pagination.offsets.next);
  }else{
    if($rootScope.Collection_shop){
      $rootScope.getProductsFN(0);
    }else{
      $rootScope.$on('Collection_shop_arrived', function(){
        $rootScope.getProductsFN(0);
      });

    }

  }








  setTimeout(function(){
    angular.element($window).bind("scroll", function() {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        var windowBottom = windowHeight + window.pageYOffset;

        if($rootScope.showSubscribe){
          $rootScope.showSubscribeFN(false);
        }

        if ((windowBottom >= docHeight) &&($rootScope.paginationInProcess==false)) {
            // alert('bottom reached');
            if($rootScope.Pagination.offsets.next){
              $rootScope.getProductsFN($rootScope.Pagination.offsets.next);
            }

        }
    });
  }, 600);


































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
    $location.url($location.path())
  }else{
    $rootScope.Product=[];
    $rootScope.Pagination={};
    $location.search(thistype, id);
    $rootScope.filter[thistype].selected = id;
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

    if($scope.maxVariation($rootScope.selectedVariation) == true){
      if($rootScope.selectedVariation){
        $http({
          url: '/addVariation',
          method: 'POST',
          data: $rootScope.selectedVariation
        }).then(function(response){
          $rootScope.Cart = response;
          $rootScope.updateCart();
        });
      }else{
        $scope.variationErrorMessage = "select a size first";
        setTimeout(function(){
          $scope.variationErrorMessage = false;
          $rootScope.$apply();
        });
      }
    }




  }//addToCart



  $scope.maxVariation=(obj)=>{
    for (var m in obj){
      var modifierId = obj[m].modifier_id;
      var variationId = obj[m].variation_id;
      if($rootScope.Cart.contents){
        if($rootScope.Cart.contents.length==0){
          return true;
        }else {
          for(var i in $rootScope.Cart.contents){
            if($rootScope.Cart.contents[i].options[modifierId] == variationId){
              if($rootScope.Cart.contents[i].stock_level > $rootScope.Cart.contents[i].quantity){
                return true;
              }else{
                $rootScope.error = {value: true, text:"you reached the maximum amount of this variation"};
                setTimeout(function(){
                  $rootScope.error = {value: false, text:""};
                  $rootScope.$apply();
                }, 2000);
                return false;
              }
            }
          }
          return true;
        }
      }

    }
  }




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










  $rootScope.thisProduct = function(id){
    $rootScope.detailUpdate(id);
    $location.path('/shop/product/'+id, true);
  };









}]);//shop controller









Shop.controller('detailCtrl',['$rootScope', '$scope', '$location', '$routeParams', '$route', '$http','$window', function($rootScope, $scope, $location, $routeParams, $route, $http, $window){


  $rootScope.Detail={};
  $rootScope.selectedVariation = {};
  $rootScope.howManyVAriationsSelected = 0;
  $rootScope.page = "detail";
  $rootScope.Variations;
  $scope.sizeLoading = false;
  $scope.openSizechart=false;

  $scope.openSizechart_FN = ()=>{
    $scope.openSizechart=!$scope.openSizechart;
  }




  // var sku =$routeParams.detail;
  // $rootScope.detailUpdate(sku);
  //
  // $scope.$watch(function() {
  //   return $rootScope.Product;
  // }, function(value) {
  //   if(value){
  //     $rootScope.detailUpdate($routeParams.detail);
  //   }
  //   // if(!$rootScope.Detail.id){
  //   //   $rootScope.detailUpdate($routeParams.detail);
  //   //   $scope.$apply();
  //   //   console.log("I loaded it again");
  //   //   console.log($rootScope.Detail);
  //   // }else{
  //   //   console.log("detail loaded correctly");
  //   //   console.log($rootScope.Detail);
  //   //   return false
  //   // }
  // }, true);





  $scope.getVariationsLevel = (productId)=>{
    $scope.sizeLoading = true;
    $http({
      url: '/product/'+productId+'/variations/get',
      method: 'GET',
    }).then(function(response){
      $rootScope.Variations=response.data.result;
      $scope.sizeLoading = false;
      var n = 0;
      for (var m in $rootScope.Detail.modifiers){

        $scope.arrFromMyObj = Object.keys($rootScope.Detail.modifiers[m].variations).map(function(key) {
          return $rootScope.Detail.modifiers[m].variations[key];
        });
        $rootScope.Detail.modifiers[m].variations=$scope.arrFromMyObj;

        for (var v in $rootScope.Detail.modifiers[m].variations){

          for (var t in $rootScope.Variations){
            var key = Object.keys($rootScope.Variations[t].modifiers)[0];

            var title = $rootScope.Variations[t].modifiers[key].var_title;

            if(title==$rootScope.Detail.modifiers[m].variations[v].title){
              $rootScope.Detail.modifiers[m].variations[v].stock_level = $rootScope.Variations[t].stock_level;

              function findCherries(fruit) {
                return fruit.title === title;
              }
              var thisObj = $scope.orderSize.find(findCherries);
              $rootScope.Detail.modifiers[m].variations[v].index = thisObj.index;
            }
          }
        }
      }

    },function(error){
      console.log(error);
      $route.reload();
    });
  }













  $rootScope.getDetail = (id)=>{
    //no detail yet let's pull it
    $http({method: 'GET', url: '/product/'+id+'/get'}).then(function(response){
      $rootScope.Detail = response.data;
      $scope.getVariationsLevel($rootScope.Detail.id);
      $window.dataLayer.push({
        'ecommerce': {
          'detail': {
            'actionField': {'list': 'Detail'},    // 'detail' actions have an optional list property.
            'products': [{
              'name': $rootScope.Detail.title,         // Name or ID is required.
              'id': $rootScope.Detail.id,
              'price': $rootScope.Detail.price=data.price,
              'brand': 'Alyx',
              'category': $rootScope.Detail.category.value,
              'variant': $rootScope.Detail.sku.substr($rootScope.Detail.sku.indexOf("_") + 1)
             }]
           }
         }
      });
      $window.ga('send', 'pageview');

      // $window.ga('ec:addImpression', {
      //   'id': $rootScope.Detail.id,                   // Product details are provided in an impressionFieldObject.
      //   'name': $rootScope.Detail.title,
      //   'category': $rootScope.Detail.category.value,
      //   'brand': 'Alyx',
      //   'variant': $rootScope.Detail.sku.substr($rootScope.Detail.sku.indexOf("_") + 1),
      //   'list': 'Detail',
      //   'position': 1                     // 'position' indicates the product position in the list.
      // });
      //
      //
      // $window.ga('ec:addProduct', {
      //   'id': $rootScope.Detail.id,
      //   'name': $rootScope.Detail.title,
      //   'category': $rootScope.Detail.category.value,
      //   'brand': 'Alyx',
      //   'variant': $rootScope.Detail.sku.substr($rootScope.Detail.sku.indexOf("_") + 1),
      // });
      //
      // $window.ga('ec:setAction', 'detail');
      //
      // $window.ga('send', 'pageview');       // Send product details view with the initial pageview.

    }, function(error){
      console.log(error);
      console.log("products status 400");
    });
  }




  $rootScope.detailUpdate = (id) => {
    $rootScope.selectedVariation={};
    $rootScope.howManyVAriationsSelected = 0;
    $rootScope.Detail.total_variations=0;

    if(!$rootScope.Product||$rootScope.Product.length==0){
      $rootScope.getDetail(id);
    }else{

      for (var i in $rootScope.Product){
        if ($rootScope.Product[i].id == id){
          $rootScope.Product[i].id
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
            $rootScope.selectedVariation[m] = {open: true}
            go = false;
          }

          if(go==true){
            //does not have variation
            $rootScope.Detail.has_variation = false;
          }
        }
      }
    }


  }


  $rootScope.detailUpdate($routeParams.detail);




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



// $scope.orderSize=[
//   "25",
//   "26",
//   "27",
//   "28",
//   "29",
//   "30",
//   "31"
// ];
//


$scope.orderSize=[
  {
    title:"O/S",
    type: 'string',
    index:0
  },
  {
    title:"o/s",
    type: 'string',
    index:0
  },
  {
    title:"XS",
    type: 'string',
    index:0
  },
  {
    title:"xs",
    type: 'string',
    index:0
  },
  {
    title:"S",
    type: 'string',
    index:1
  },
  {
    title:"s",
    type: 'string',
    index:1
  },
  {
    title:"M",
    type: 'string',
    index:2
  },
  {
    title:"m",
    type: 'string',
    index:2
  },
  {
    title:"L",
    type: 'string',
    index:3
  },
  {
    title:"l",
    type: 'string',
    index:3
  },
  {
    title:"XL",
    type: 'string',
    index:4
  },
  {
    title:"xl",
    type: 'string',
    index:4
  },
  {
    title:"XXL",
    type: 'string',
    index:5
  },
  {
    title:"xxl",
    type: 'string',
    index:5
  },

  {
    title:"4.5",
    type: 'string',
    index:1
  },
  {
    title:"5",
    type: 'string',
    index:2
  },
  {
    title:"5.5",
    type: 'string',
    index:3
  },
  {
    title:"6",
    type: 'string',
    index:4
  },
  {
    title:"6.5",
    type: 'string',
    index:5
  },
  {
    title:"7",
    type: 'string',
    index:6
  },
  {
    title:"7.5",
    type: 'string',
    index:7
  },
  {
    title:"8",
    type: 'string',
    index:8
  },
  {
    title:"8.5",
    type: 'string',
    index:9
  },

  {
    title:"9",
    type: 'string',
    index:10
  },
  {
    title:"9.5",
    type: 'string',
    index:11
  },
  {
    title:"10",
    type: 'string',
    index:12
  },
  {
    title:"10.5",
    type: 'string',
    index:13
  },
  {
    title:"11",
    type: 'string',
    index:14
  },
  {
    title:"11.5",
    type: 'string',
    index:15
  },
  {
    title:"12",
    type: 'string',
    index:16
  },
  {
    title:"12.5",
    type: 'string',
    index:17
  },
  {
    title:"13",
    type: 'string',
    index:18
  },
  {
    title:"13.5",
    type: 'string',
    index:19
  },
  {
    title:"14",
    type: 'string',
    index:20
  },



  {
    title:"4.5",
    type: 'string',
    index:1
  },
  {
    title:"5",
    type: 'string',
    index:2
  },
  {
    title:"5.5",
    type: 'string',
    index:3
  },
  {
    title:"6",
    type: 'string',
    index:4
  },
  {
    title:"6.5",
    type: 'string',
    index:5
  },
  {
    title:"7",
    type: 'string',
    index:6
  },
  {
    title:"7.5",
    type: 'string',
    index:7
  },
  {
    title:"8",
    type: 'string',
    index:8
  },
  {
    title:"8.5",
    type: 'string',
    index:9
  },

  {
    title:"9",
    type: 'string',
    index:10
  },
  {
    title:"9.5",
    type: 'string',
    index:11
  },
  {
    title:"10",
    type: 'string',
    index:12
  },
  {
    title:"10.5",
    type: 'string',
    index:13
  },
  {
    title:"11",
    type: 'string',
    index:14
  },
  {
    title:"11.5",
    type: 'string',
    index:15
  },
  {
    title:"12",
    type: 'string',
    index:16
  },
  {
    title:"12.5",
    type: 'string',
    index:17
  },
  {
    title:"13",
    type: 'string',
    index:18
  },
  {
    title:"13.5",
    type: 'string',
    index:19
  },
  {
    title:"14",
    type: 'string',
    index:20
  },
  {
    title:"23",
    type: 'string',
    index:6
  },
  {
    title:"24",
    type: 'string',
    index:7
  },
  {
    title:"25",
    type: 'string',
    index:8
  },
  {
    title:"26",
    type: 'string',
    index:9
  },
  {
    title:"27",
    type: 'string',
    index:10
  },
  {
    title:"28",
    type: 'string',
    index:11
  },
  {
    title:"29",
    type: 'string',
    index:12
  },
  {
    title:"30",
    type: 'string',
    index:13
  },
  {
    title:"31",
    type: 'string',
    index:14
  },
  {
    title:"32",
    type: 'string',
    index:15
  },
  {
    title:"33",
    type: 'string',
    index:16
  },
  {
    title:"34",
    type: 'string',
    index:17
  },
  {
    title:"35",
    type: 'string',
    index:18
  },
  {
    title:"36",
    type: 'string',
    index:19
  },
  {
    title:"37",
    type: 'string',
    index:20
  },
  {
    title:"38",
    type: 'string',
    index:21
  },
  {
    title:"39",
    type: 'string',
    index:22
  },
  {
    title:"40",
    type: 'string',
    index:23
  },
  {
    title:"41",
    type: 'string',
    index:24
  },
  {
    title:"42",
    type: 'string',
    index:25
  },
  {
    title:"43",
    type: 'string',
    index:26
  },
  {
    title:"44",
    type: 'string',
    index:27
  },
  {
    title:"45",
    type: 'string',
    index:28
  },
  {
    title:"46",
    type: 'string',
    index:28
  },
  {
    title:"47",
    type: 'string',
    index:28
  },
  {
    title:"48",
    type: 'string',
    index:28
  }
]




// "S",
// "M",
// "L",
// "XL",
// "23",
// "24",
// "25",
// "26",
// "27",
// "28",
// "29",
// "30",
// "31"




}]);
