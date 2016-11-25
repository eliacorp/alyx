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
          // $rootScope.pageLoading = false;
          console.log("$rootScope.pageLoading", $rootScope.pageLoading);
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

    /*............................. Take-all routing ........................*/


    .when('/shop', {
      templateUrl: 'views/shop/product.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/shop'})



}]) //config


.filter('trustUrl', function ($sce) {
  return function(url) {
    // if (url){
      var trusted = $sce.trustAsResourceUrl(url);
      return trusted;
    // }
  };
})

.controller('appCtrl', ($rootScope, $location, $window, $timeout, $http, anchorSmoothScroll, $scope, $anchorScroll)=>{
  $rootScope.pageLoading = true;
  $rootScope.token;
  $rootScope.Collection_shop;



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




$rootScope.Auth;

  $rootScope.authentication = function(){

        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/authenticate'
        }).then(function successCallback(response) {

          if(response.data.access_token || response.data.token){
              // this callback will be called asynchronously
              // when the response is available
              console.log(response.data);
              var expires = response.data.expires;
              var identifier = response.data.identifier;
              var expires_in = response.data.expires_in;
              var access_token = response.data.access_token;
              var type = response.data.token_type;

              $rootScope.Auth =response.data;

              $rootScope.getProductsFN();
              $rootScope.getCollections();

              // $rootScope.createCookie( "access_token", response.data.access_token , response.data.expires_in);

          }

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

  }//addToCart

  $rootScope.authentication();

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








//get products
$rootScope.Product;

$rootScope.getProductsFN=function(){
  console.log("getting products");
  $http({method: 'GET', url: '/getProducts'}).then(function(response){
    $rootScope.Product = response.data;
    console.log(response);
    console.log($rootScope.Product);
    // for (var i in $rootScope.Product){
    //   $rootScope.detailUpdate($rootScope.Product[i].sku);
    //   return false;
    // }
    $rootScope.$broadcast("productArrived");
    $rootScope.pageLoading = false;

  }, function(error){
    console.log(error);
    console.log("products status 400");
      // $rootScope.getProductsFN();
  });
}













//get shop collections
  $rootScope.getCollections = function(){

        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/getCollections'
        }).then(function (response) {
              $rootScope.Collection_shop=response.data;
              console.log(response.data);
          }, function (response) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

  }//getCollections





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
      console.log(response.data);


    }, function(response) {

      $scope.error = {value: true, text:'countries not available, this page will be reloaded'};
      $route.reload();

    });
  };
  $rootScope.getCountries();








var stockistRan = false;
var collectionRan = false;



$rootScope.Stockist;

  $rootScope.getContentType = function(type, orderField){

        Prismic.Api('https://alyx.cdn.prismic.io/api', function (err, Api) {
            Api.form('everything')
                .ref(Api.master())
                .query(Prismic.Predicates.at("document.type", type))
                .orderings('['+orderField+']')
                .pageSize(100)
                .submit(function (err, response) {



                    var Data = response;

                    if (type =='collection'){
                      $rootScope.collections = response.results;
                      console.log($rootScope.collections);
                      $rootScope.chooseCollection();
                      if(collectionRan == false){
                        collectionRan = true;
                        // setTimeout(function(){
                          $rootScope.$broadcast('collectionReady');
                        // }, 900);
                        }
                      }else if(type =='stockist'){
                        console.log(type+ " type");
                        console.log("stockist");
                        stockistRan = true;
                        $rootScope.Stockist = response.results;
                        console.log(response.results);
                        if(stockistRan == false){
                          stockistRan = true;
                          // setTimeout(function(){
                            $rootScope.$broadcast('stockistReady');
                          // }, 900);
                        }

                      }else{ return false; }
                      $rootScope.$apply();



                    // The documents object contains a Response object with all documents of type "product".
                    var page = response.page; // The current page number, the first one being 1
                    var results = response.results; // An array containing the results of the current page;
                    // you may need to retrieve more pages to get all results
                    var prev_page = response.prev_page; // the URL of the previous page (may be null)
                    var next_page = response.next_page; // the URL of the next page (may be null)
                    var results_per_page = response.results_per_page; // max number of results per page
                    var results_size = response.results_size; // the size of the current page
                    var total_pages = response.total_pages; // the number of pages
                    var total_results_size = response.total_results_size; // the total size of results across all pages
                    return results;

                });
          });


  };//get content type



	$rootScope.getContentType('stockist', 'my.stockist.date desc');













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








})// end of appCtrl



.directive('logoDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/components/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('shopDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('productDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/product.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('detailDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/product-detail.html',
    controller: 'detailCtrl',
    replace: true,
    link: function(scope, elem, attrs) {
    }
  };
})




.directive('cartDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/cart.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('shipmentDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/shipment.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('choiceDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/choice.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('paymentDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/payment.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('termsDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/terms.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('processedDirective', function($rootScope, $location, $window, $timeout) {
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
