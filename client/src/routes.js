'use strict';

angular.module('myApp')

.run(['$anchorScroll', '$route', '$rootScope', '$location','getService', '$routeParams','$templateCache','preload', function($anchorScroll, $route, $rootScope, $location, getService, $routeParams, $templateCache, preload) {

    //a change of path should not reload the page
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
                  $route.current = '/';
                  un();
                  $route.reload();
              });
        }
        return original.apply($location, [path]);
    };

  }])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, getService) {

  // use the HTML5 History API
  $locationProvider.html5Mode(true).hashPrefix('!');;

  $routeProvider
  // $locationChangeStart

    .when('/social', {
      templateUrl: 'views/social.html',
      controller: 'socialCtrl',
      reloadOnSearch: true
    })

    .when('/about', {
      templateUrl: 'views/support.html',
      controller: 'supportCtrl',
      reloadOnSearch: false
    })

    .when('/stockists', {
      templateUrl: 'views/support.html',
      controller: 'supportCtrl',
      reloadOnSearch: false
    })

    .when('/contact', {
      templateUrl: 'views/support.html',
      controller: 'supportCtrl',
      reloadOnSearch: false
    })


    .when('/fw15/:section', {
      templateUrl: 'views/fw_fifteen.html',
      controller: 'fwfifteenCtrl',
      reloadOnSearch: false
    })

    .when('/ss16/:section', {
      templateUrl: 'views/ss_sixteen.html',
      controller: 'sssixteenCtrl',
      reloadOnSearch: false
    })

    .when('/fw15', {
      templateUrl: 'views/fw_fifteen.html',
      controller: 'fwfifteenCtrl',
      reloadOnSearch: false
      // resolve: {
      //   app: function(getService, $q, $timeout){
      //     var deferred = $q.defer();
      //         $timeout(function () {
      //           deferred.resolve();
      //           getService.get("fw15");
      //           return deferred.promise;
      //         },700);
      //   }
      // }
    })

    .when('/ss16', {
      templateUrl: 'views/ss_sixteen.html',
      controller: 'sssixteenCtrl',
      reloadOnSearch: true
      // resolve: {
      //   app: function(getService, $q, $timeout){
      //     var deferred = $q.defer();
      //         $timeout(function () {
      //           deferred.resolve();
      //           getService.get("fw15");
      //           return deferred.promise;
      //         },700);
      //   }
      // }
    })

    .when('/', {
      // redirectTo: '/fw15',

        templateUrl: 'views/fw_fifteen.html',
        controller: 'fwfifteenCtrl',
        reloadOnSearch: false,
      resolve: {
        app: function(getService, $q, $timeout){
          var deferred = $q.defer();
              $timeout(function () {
                deferred.resolve();
                getService.get("fw15");
                return deferred.promise;
              },700);
        }
      }

    })



    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'});


}])

.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };




    this.scrollHorizontally = function(number, section) {

       var element = jQuery(".catalogue-ul-"+section);
        event.preventDefault();
        element.stop().animate({
          scrollLeft: number
        },1000,
          'easeInOutQuart'
        );
  }


})


.controller('routeCtrl', ['$anchorScroll', '$location', '$scope','anchorSmoothScroll','$window','$route','getService','$rootScope','$routeParams','preload','$templateCache', function ($anchorScroll, $location, $scope, anchorSmoothScroll,$window, $route,getService, $rootScope, $routeParams, preload, $templateCache) {

  //initializing
  $rootScope.routeIsForced= false;
  $scope.navHideOne = true;
  $scope.navFadeOne = 0;
  var navActiveCheck = false;
  $scope.burgerColor = '#FFFFFF';
  $scope.burgerOffset = [];

  $rootScope.thisSeasonPath;
  var seasonPath, seasonIndex, thisSubstr;

  $rootScope.findSeasonPath = function(path){
    seasonPath = path;
    seasonIndex = seasonPath.lastIndexOf("/");
    thisSubstr = seasonPath.substr(1, seasonIndex-1)
    $scope.thisSeasonPath=thisSubstr;
  }



$rootScope.thisSectionPath;
var sectionPath, sectionIndex, thisSectionSubstr, sectionLength;

$rootScope.findSectionPath = function(path){
  sectionPath = path;
  sectionLength = sectionPath.length;
  sectionIndex = sectionPath.lastIndexOf("/");
  thisSectionSubstr = sectionPath.substr(sectionIndex+1, sectionLength);
  $rootScope.thisSectionPath = thisSectionSubstr;
};






$scope.thisSeason = function(season){
    $rootScope.findSeasonPath($location.path());
}

$scope.thisSeason("fw15");
$rootScope.currentPosition = "fw15";


$scope.Path_Anchor = function(var1, var2){
  if((var1 == 'support')||(var1 == 'social')){
    $rootScope.seasonPartial = var1+".html";

    if(var1 == 'support'){
      console.log('support');
      $location.path(var2, true);
      $scope.inABit(var2+'Hash');

    }else if (var1 == 'social'){
      console.log('social');
      $rootScope.routeIsForced= true;
      $scope.$broadcast("routeIsForced");

      $rootScope.headerHide = false;
      console.log("headerHide false");

      $location.path(var2, true);

      $rootScope.endLoader();
      // $rootScope.routeIsForced= false;

    }
    $rootScope.headerHide=false;



  }else {

    $rootScope.seasonPartial = var1+".html";
    $location.path(var1 + '/' + var2, true);
    $scope.inABit(var2+'Hash');
     $rootScope.headerHide=false;
  }
}


$scope.inABit = function(thisBit){
$rootScope.routeIsForced= true;
$scope.$broadcast("routeIsForced");
  setTimeout(function(){
      $rootScope.gotoAnchor_fast(thisBit);
      $rootScope.headerHide=false;
      $rootScope.routeIsForced= false;
      console.log("headerHide false");
  }, 1200);
$rootScope.endLoader();

}

    //forcing sections reload

$scope.routeForce = function(url, section){


        $rootScope.findSeasonPath($location.path());

        // if (($scope.thisSeasonPath == url)||($scope.thisSeasonPath == "")){
        if (($rootScope.currentPosition == url)){
          //resetting the lookbook
          $rootScope.resetLookbook();
          $rootScope.gotoAnchor(section);

        }else if ($rootScope.currentPosition != url){

          $rootScope.currentPosition = url;
          $rootScope.pageLoading = true;
          $scope.Path_Anchor(url, section);
          //hiding the nav
          $scope.navHide = true;

        }

}// ROUTE FORCE






//..................................................changing anchor link on click
  $rootScope.gotoAnchor = function(x) {

        var str = x;
        var mainHash;
        str = str.substring(0, str.length - 4);

        // x= str;
        var newHash =x;
        mainHash = x +"Hash"

        if ($rootScope.headerSectionName != newHash) {

        // call $anchorScroll()
        anchorSmoothScroll.scrollTo(mainHash);

        } else {

        }
      };









      $rootScope.gotoAnchor_fast = function(x) {

            var str = x;
            var mainHash;
            str = str.substring(0, str.length - 4);

            // x= str;
            var newHash =x;
            mainHash = str +"Hash"
            if ($routeParams.section !== newHash) {
              // set the $location.hash to `newHash` and
              // $anchorScroll will automatically scroll to it
              var stopY = jQuery("#"+mainHash).offset().top;
              window.scrollTo(0, stopY);
            } else {
              // call $anchorScroll() explicitly,
              // since $location.hash hasn't changed
              $anchorScroll();
            }
          };








    $rootScope.navActiveCheck = false;
    $scope.burgerColor = '#FFFFFF';

    //receiving the broadcast of the nav state to be able to understand when to change the color of the burger
      $scope.$on('navIsActive', function(event, args) {
        $scope.burgerColor = "#000000";
        return $rootScope.navActiveCheck = true;
      });

      $scope.$on('navIsNotActive', function(event, args) {
        $scope.burgerColor = "#FFFFFF";
        return $rootScope.navActiveCheck = false;
      })









//..........end loading with a timeout


    $rootScope.endLoader = function(){
      setTimeout(function(){
           $rootScope.pageLoading = false;
           $scope.$apply();
        }, 1200);
    };


    $scope.$on('routeIsForced', function(event, args) {
      var pathy = $location.path().substr(1, 4);
      var thisScope = $route.current.scope;

      if (pathy == "fw15"){

      }

    });




//.................................................................................................................support












$scope.wasMobile=false;


//..............................................................................resize function

    angular.element(window).on("resize", function() {

      $rootScope.windowWidth =$window.innerWidth;
      $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
      $rootScope.isMobile=$scope.mobileQuery.matches;


        if( $rootScope.currentPosition == "fw15"){

              $rootScope.fw15_scroller(navActiveCheck);

        }else if ( $rootScope.currentPosition == "ss16"){

              $rootScope.ss16_scroller(navActiveCheck);

        }else if ( $rootScope.currentPosition == "support"){
              $rootScope.support_scroller(navActiveCheck);
      }else if ( $rootScope.currentPosition == "social"){
        //nothing
      }

        $scope.windowWidth = $window.innerWidth;

     });
























//..............................................................................mobile


//....this is the function that checks the header of the browser and sees what device it is

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
}]);
