'use strict'

import angular from 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import Prismic from 'prismic.io'

 // /*global $ */

angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"])
.run(['$rootScope', '$location','$route','$templateCache','$http', ($rootScope, $location, $route,$templateCache, $http)=>{
  $rootScope.pageLoading = true;

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        else if (reload === true){

          var currentPageTemplate = $route.current.templateUrl;
            $templateCache.remove(currentPageTemplate);

        var un = $rootScope.$on('$locationChangeSuccess', function () {
              // $route.current = 'worldoftheblonds/'+$routeParams.category+'/'+$routeParams.event;
              un();
              $route.reload();
          });
        }
        return original.apply($location, [path]);
    };


}])



.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

  // $anchorScrollProvider.disableAutoScrolling();

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
  $routeProvider

    .when('/sitemap.xml', {
      templateUrl: '/sitemap.xml',
      reloadOnSearch: false
    })

    .when('/googledf3523ad2411ec20.html', {
      templateUrl: '/googledf3523ad2411ec20.html',
      reloadOnSearch: false
    })

    .when('/shop/product/:detail', {
      templateUrl: 'views/shop/product-detail.html',
      controller: 'detailCtrl',
      reloadOnSearch: false
    })


    .when('/shop/collection', {
      templateUrl: 'views/shop/product.html',
      reloadOnSearch: false
    })


    .when('/shop/cart', {
      templateUrl: 'views/shop/cart.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/shipment', {
      templateUrl: 'views/shop/shipment.html',
      // controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/shipment/terms', {
      templateUrl: 'views/shop/shipment.html',
      // controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/choice', {
      templateUrl: 'views/shop/choice.html',
      // controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/payment', {
      templateUrl: 'views/shop/payment.html',
      // controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/processed/:order/:method', {
      templateUrl: 'views/shop/processed.html',
      // controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/processed/:order/:method/canceled', {
      templateUrl: 'views/shop/processed-canceled.html',
      // controller: 'shopCtrl',
      reloadOnSearch: false
    })


    .when('/shop/privacy', {
      templateUrl: 'views/shop/privacy.html',
      controller: 'privacyCtrl',
      reloadOnSearch: true
    })

    .when('/collection/:collection', {
      templateUrl: 'views/collection/collection.html',
      controller: 'collectionCtrl',
      reloadOnSearch: true
    })


    .when('/about', {
      templateUrl: 'views/support/support.html',
      controller: 'supportCtrl',
      reloadOnSearch: false
    })

    .when('/contact', {
      templateUrl: 'views/support/support.html',
      controller: 'supportCtrl',
      reloadOnSearch: false
    })

    .when('/stockists', {
      templateUrl: 'views/support/support.html',
      controller: 'supportCtrl',
      reloadOnSearch: false
    })

    .when('/social', {
      templateUrl: 'views/social/social.html',
      controller: 'socialCtrl',
      reloadOnSearch: false
    })

    .when('/subscribe', {
      templateUrl: 'views/components/subscribe.html'
    })

    /*............................. Take-all routing ........................*/


    .when('/shop', {
      templateUrl: 'views/shop/product.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/shop'})



}]) //config


.filter('trustUrl', ['$sce',function ($sce) {
  return function(url) {
    // if (url){
      var trusted = $sce.trustAsResourceUrl(url);
      return trusted;
    // }
  };
}])


.filter('trustHtml', ['$sce',function ($sce) {
  return function(html) {
    // if (url){
      var trusted = $sce.trustAsHtml(html);
      return trusted;
    // }
  };
}])

.controller('appCtrl', [ '$rootScope', '$location', '$window', '$timeout', '$http', 'anchorSmoothScroll', '$scope', '$anchorScroll', '$routeParams','$q', function($rootScope, $location, $window, $timeout, $http, anchorSmoothScroll, $scope, $anchorScroll, $routeParams, $q){
  $rootScope.pageLoading = true;
  $rootScope.token;
  $rootScope.Collection_shop;
  $rootScope.Product=[];
  $window.dataLayer = window.dataLayer || [];


  $rootScope.noRefresh = function(url){
    var str = url;
    str = str.substring(1, str.length);
        if ($location.path() != url) {
          anchorSmoothScroll.scrollTo(str);
          $location.path(url, false);
        } else {
          // $anchorScroll();
        }
  }

  // $scope.$on('$viewContentLoaded', function(event) {
  //   $window.ga('send', 'pageview', { page: $location.url() });
  // });
  // $rootScope.$on("$stateChangeSuccess", function($location,$window){
  //    var API_URL ="Your Url";//Put your url
  //      var url = API_URL + $location.url();
  //      console.log(url);
  //      $window.ga('send', 'pageview', { page: url }); // line 54
  //  });

  //attaching item function cart
    $rootScope.attachItemID=function(obj){
      Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        $rootScope.Cart.contents[val].item=val;
        // console.log(val + ' -> ' + obj[val]);
      });
    }


// function eraseCookie(name) {
//   $rootScope.createCookie(name,"",-1);
// }
//
// function deleteAllCookies() {
//   var cookies = document.cookie.split(";");
//   for (var i = 0; i < cookies.length; i++)
//     eraseCookie(cookies[i].split("=")[0]);
// }
//
// // deleteAllCookies();
// $rootScope.createCookie = function(name,value,time) {
// 	var expires = "; expires="+time;
// 	document.cookie = name+"="+value+expires+";";
// }
//
// $rootScope.readCookie = function(name) {
// 	var nameEQ = name + "=";
// 	var ca = document.cookie.split(';');
// 	for(var i=0;i < ca.length;i++) {
// 		var c = ca[i];
// 		while (c.charAt(0)==' ') c = c.substring(1,c.length);
//       if (c.indexOf(nameEQ) == 0){
//         return c.substring(nameEQ.length,c.length);
//       }
// 	}
// 	// return null;
// }













//get shop collections
  $rootScope.getCollections_shop = function(){

        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/getCollections'
        }).then(function (response) {
              $rootScope.Collection_shop=response.data;
              $rootScope.$broadcast('Collection_shop_arrived');
          }, function (err) {
            console.log(err);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

  }//getCollections

$rootScope.getCollections_shop();



$rootScope.setPage = (page)=>{
  $rootScope.page = page;
}







  $rootScope.countries = [];

  $rootScope.getCountries = function(){
    $http({
      method: 'GET',
      url: 'assets/countries.json'
    }).then(function(response) {
      $rootScope.countries = response.data;
    }, function(response) {

      $scope.error = {value: true, text:'countries not available, this page will be reloaded'};
      $route.reload();

    });
  };
  $rootScope.getCountries();









  //video functions
  $rootScope.playPause = (id)=> {
    var vid = document.getElementById(id);
    if(vid.paused){
      vid.play();
    }else{
      vid.pause();
    }
  }



  //loading the final video
  $rootScope.loadVideo = (id)=>{
    setTimeout(function(){
      var vid = document.getElementById(id);
      vid.volume = 0.2;
      $rootScope.$apply();
    }, 2500);
  }





  var stockistRan = false;
  var collectionRan = false;

  $rootScope.Stockist;


  $rootScope.getStockist=()=>{
    $http({
      method: 'GET',
      url: 'api/prismic/get/all?page=0&type=stockist'
    }).then(function(response) {
      $rootScope.Stockist= response.data.results;
    }, function(err) {
      console.log(err);
    });
  }

  $rootScope.getStockist();



$rootScope.prismic_list_single=(type, page)=>{
  $http({
    method: 'GET',
    url: 'api/prismic/get/single?type='+type+'&uid='+uid
  }).then(function(response) {
      deferred.resolve(response);
    }, function(err) {
      deferred.reject(err);
    });
}



$rootScope.collections = [];
$rootScope.getCollections_media=(type, page)=>{
  $http({
    method: 'GET',
    url: 'api/prismic/get/all?page='+page+'&type='+type
  }).then(function(response) {
    $rootScope.collections= response.data.results;
  }, function(err) {
    console.log(err);
  });
}
//
$rootScope.getCollections_media('collection',0);




//   $rootScope.getContentType = function(type, orderField){
//
//         Prismic.Api('https://alyx.cdn.prismic.io/api', function (err, Api) {
//             Api.form('everything')
//                 .ref(Api.master())
//                 .query(Prismic.Predicates.at("document.type", type))
//                 .orderings('['+orderField+']')
//                 .pageSize(100)
//                 .submit(function (err, response) {
//
//
//
//                     var Data = response;
//
//                     if (type =='collection'){
//                       $rootScope.collections = response.results;
//                       $rootScope.chooseCollection();
//                       if(collectionRan == false){
//                         collectionRan = true;
//                         // setTimeout(function(){
//                           $rootScope.$broadcast('collectionReady');
//                         // }, 900);
//                         }
//                       }else if(type =='stockist'){
//                         stockistRan = true;
//                         $rootScope.Stockist = response.results;
//                         if(stockistRan == false){
//                           stockistRan = true;
//                           // setTimeout(function(){
//                             $rootScope.$broadcast('stockistReady');
//                           // }, 900);
//                         }
//
//                       }else{ return false; }
//                       $rootScope.$apply();
//
//
//
//                     // The documents object contains a Response object with all documents of type "product".
//                     var page = response.page; // The current page number, the first one being 1
//                     var results = response.results; // An array containing the results of the current page;
//                     // you may need to retrieve more pages to get all results
//                     var prev_page = response.prev_page; // the URL of the previous page (may be null)
//                     var next_page = response.next_page; // the URL of the next page (may be null)
//                     var results_per_page = response.results_per_page; // max number of results per page
//                     var results_size = response.results_size; // the size of the current page
//                     var total_pages = response.total_pages; // the number of pages
//                     var total_results_size = response.total_results_size; // the total size of results across all pages
//                     return results;
//
//                 });
//           });
//
//
//   };//get content type



	// $rootScope.getContentType('stockist', 'my.stockist.date desc');













  $rootScope.showCart = false;

  $rootScope.retrieveElement = function(id){
    var element = angular.element(document.querySelectorAll("#"+id)[0]);
    return element
  }









  //MOBILE


  $rootScope.windowHeight= $window.innerHeight;
  $rootScope.half_windowHeight = $window.innerHeight/2;
    jQuery($window).resize(function(){
      $rootScope.windowHeight = $window.innerHeight;
      $rootScope.half_windowHeight = $window.innerHeight/2;
      $rootScope.checkSize();
      $scope.landscapeFunction();

      // $rootScope.checkSize();
        $rootScope.$apply();
    });


  //remove logo on scroll
  $rootScope.logoCorner=false;
  $rootScope.showDetail=false;


      //....this is the function that checks the header of the browser and sees what device it is
      $rootScope.isMobile, $rootScope.isDevice, $rootScope.isMobileDevice;
      $rootScope.checkSize = function(){
          $rootScope.checkDevice = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return ($rootScope.checkDevice.Android() || $rootScope.checkDevice.BlackBerry() || $rootScope.checkDevice.iOS() || $rootScope.checkDevice.Opera() || $rootScope.checkDevice.Windows());
                }
            };

          //........checks the width
            $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
            $rootScope.isMobile=$scope.mobileQuery.matches;

          //.........returning true if device
            if ($scope.checkDevice.any()){
              $rootScope.isDevice= true;
            }else{
                $rootScope.isDevice=false;
            }

            if (($rootScope.isDevice==true)&&($scope.isMobile==true)){
              $rootScope.isMobileDevice= true;
            }else{
                $rootScope.isMobileDevice=false;
            }




              if ($rootScope.isDevice){
                  $rootScope.mobileLocation = function(url){
                    $location.path(url).search();
                  }
                  $rootScope.mobileExternalLocation = function(url){
                    $window.open(url, '_blank');
                  }
              } else if (!$rootScope.isDevice){
                  $rootScope.mobileLocation = function(url){
                    return false;
                  }
                  $rootScope.mobileExternalLocation = function(url){
                    return false;
                  }
              }

        }//checkSize
        $rootScope.checkSize();
        $rootScope.landscapeView = false;

       //function removing website if landscape

        $scope.landscapeFunction = function(){

          if ($rootScope.isMobile==true){
              if(window.innerHeight < window.innerWidth){
                $rootScope.landscapeView = true;
                $rootScope.pageLoading = true;
              //   $(".landscape-view-wrapper").css({
              //     "width":"100vw",
              //     "height": "100vh",
              //     "display": "block"
              // });
              }else{
                $rootScope.landscapeView = false;
                $rootScope.pageLoading = false;
              }
          }
        }

      $scope.landscapeFunction();








}])// end of appCtrl



.directive('logoDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('shopDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/shop.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('productDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/product.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('detailDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/product-detail.html',
    controller: 'detailCtrl',
    replace: true,
    link: function(scope, elem, attrs) {
    }
  };
})




.directive('cartDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/shop/cart.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('shipmentDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/shipment.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('choiceDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/choice.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('paymentDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/shop/payment.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('termsDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/terms.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('processedDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/shop/processed.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

var jqueryUI = require('./vendor/jquery-ui.min.js');
var jQuery = require('jquery');
var nav = require("./nav.js");
var shop = require("./shop/shop.js");
var cart = require("./shop/cart.js");
var checkout = require("./shop/checkout.js");
var payment = require("./shop/payment.js");
var processed = require("./shop/processed.js")
var service = require('./service.js');
var collection = require('./collection/collection.js');
var lookbook = require('./collection/lookbook.js');
var support = require('./support/support.js');
var social = require('./social/social.js');



//
