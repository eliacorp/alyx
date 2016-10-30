'use strict'


import angular from 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'

 // /*global $ */

angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"])
.run(['$rootScope', '$location','$route',($rootScope, $location, $route)=>{
  $rootScope.pageLoading = true;

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
          $rootScope.pageLoading = false;
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

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
  $routeProvider


    .when('/shop/product/:detail', {
      templateUrl: 'views/shop.html',
      controller: 'detailCtrl',
      reloadOnSearch: false
    })

    .when('/shop/collection/:shopcollection', {
      templateUrl: 'views/shop.html',
      reloadOnSearch: false
    })


    .when('/shop/cart', {
      templateUrl: 'views/shop.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/checkout', {
      templateUrl: 'views/shop.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/shipment', {
      templateUrl: 'views/shop.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/shop/payment', {
      templateUrl: 'views/shop.html',
      controller: 'shopCtrl',
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

    /*............................. Take-all routing ........................*/


    .when('/shop', {
      templateUrl: 'views/shop.html',
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


  function eraseCookie(name) {
    $rootScope.createCookie(name,"",-1);
  }

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
      eraseCookie(cookies[i].split("=")[0]);
}

// deleteAllCookies();
$rootScope.createCookie = function(name,value,time) {
	var expires = "; expires="+time;
	document.cookie = name+"="+value+expires+";";
}

$rootScope.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0){
        return c.substring(nameEQ.length,c.length);
      }
	}
	// return null;
}


  $rootScope.authentication = function(){

        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/authenticate'
        }).then(function successCallback(response) {

          if(response.data.access_token || response.data.token){
              console.log("response");
              console.log(response);
              // this callback will be called asynchronously
              // when the response is available
              var expires = response.data.expires;
              var identifier = response.data.identifier;
              var expires_in = response.data.expires_in;
              var access_token = response.data.access_token;
              var type = response.data.token_type;

              $rootScope.getCollections();


              $rootScope.createCookie( "access_token", response.data.access_token , response.data.expires_in);
              setTimeout(function(){
                console.log(document.cookie);
              },900);
          }

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

  }//addToCart

  $rootScope.authentication();






  $rootScope.getCollections = function(){

        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/getCollections'
        }).then(function (response) {
            console.log("getCollections received");
              $rootScope.Collection_shop=response.data;
              console.log(response);

          }, function (response) {

            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

  }//addToCart





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
      setTimeout({
        // $route.reload();
      }, 2000);
    });
  };
  $rootScope.getCountries();


















//MOBILE


$rootScope.windowHeight= $window.innerHeight;
$rootScope.half_windowHeight = $window.innerHeight/2;
  jQuery($window).resize(function(){
    $rootScope.windowHeight = $window.innerHeight;
    $rootScope.half_windowHeight = $window.innerHeight/2;
    $rootScope.offset_FN();
    $rootScope.Section= $rootScope.shopSections[$rootScope.Section.index];
    setTimeout(function(){
      anchorSmoothScroll.scrollHorizontally($rootScope.Section.offset, $rootScope.Section.name);
    }, 1600);


    // $rootScope.checkSize();
      $scope.$apply();
  });


//remove logo on scroll
$rootScope.logoCorner=false;
$rootScope.showDetail=false;






  $rootScope.showCart = false;

  $rootScope.retrieveElement = function(id){
    var element = angular.element(document.querySelectorAll("#"+id)[0]);
    return element
  }





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

.directive('paymentDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/payment.html',
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
var service = require('./service.js');
var collection = require('./collection/collection.js');
var lookbook = require('./collection/lookbook.js');
var support = require('./support/support.js');
var social = require('./social/social.js');



//
