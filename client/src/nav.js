angular.module('myApp')

.controller('navCtrl', function($scope, $rootScope, $location, $routeParams, $timeout, $route, getService){


$rootScope.navActive = false;
$rootScope.lookActive = true;
$scope.pop_animating = false;

$rootScope.isActive = function (viewLocation) {
  return viewLocation == $rootScope.currentPosition;
};



$scope.$on('$routeChangeStart', function(next, current) {
  //activating a nav entry based on the location you are in
    $rootScope.isActive();

});




$scope.burgerWrapperElement = jQuery(".pop-wrapper");
// $scope.burgerIconElement = jQuery(".burger-icon");


  $rootScope.beNavActive = function(){

    if(!$rootScope.isMobile){

        $rootScope.navActive = !$rootScope.navActive;
        // $scope.burgerWrapperElement.toggleClass( "popActive" );
        if (!$scope.navActive) {
            $rootScope.$broadcast('navIsNotActive');
            $rootScope.enableScroll();
            console.log('enableScroll');
        }else{
         $rootScope.$broadcast('navIsActive');
          $rootScope.disableScroll();
        }


        console.log($scope.navActive);

      }else if($rootScope.isMobile){
          if($scope.pop_animating == true){

            return false

          }else if($scope.pop_animating == false){

              $scope.navActive = !$scope.navActive;
              $rootScope.lookActive = !$rootScope.lookActive;
              $scope.pop_animating = true;
              setTimeout(function(){
                $scope.pop_animating = false;
              }, 1000);
          }
        }


    };




    //...........................initializing season variables

    $rootScope.navigationData = [];


    // This service's function returns a promise, but we'll deal with that shortly
    getService.get("general")
    // then() called when son gets back
    .then(function(data) {
      $rootScope.navigationData = data;
      $rootScope.lookbookLength = data[0].length;
    }, function(error) {
        // promise rejected, could log the error with: console.log('error', error);
    });




$scope.openNavOne = false;
$scope.openNavTwo = false;
setTimeout(function(){
  $scope.navOne = $rootScope.navigationData[0].season;
  $scope.navTwo = $rootScope.navigationData[1].season;
}, 900);





//opening the sub-section of the season nav
$rootScope.openSeason = function(season){

  if ($scope.thisNavSeason != season){
    $scope.thisNavSeason = season;
  }else if($scope.thisNavSeason == season){
    $scope.thisNavSeason = "";
  }

}


$rootScope.isSubNav = function(season){
  if (season == $scope.thisNavSeason){
    return true;
  }else if(season == $scope.thisNavSeason){
    return false;
  }
}








    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    $rootScope.disableScroll = function(){
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    $rootScope.enableScroll = function(){
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }



    $rootScope.disableBodyScroll = function(element){

      jQuery( '.'+element ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
        var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
        e.preventDefault();
      });

    }

})

.directive('navDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/nav/nav.html',
    replace: true
  }
})

.directive('navOneDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/nav/nav-one.html',
    replace: true
  }
})
.directive('navSupportDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/nav/nav-support.html',
    replace: true
  }
})



.directive('popDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/nav/pop.html',
    replace: true
  }
})


.directive('arrowDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/nav/arrow.html',
    replace: true
  }
});
