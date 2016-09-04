'use strict';
var Film = angular.module('myApp');
Film.controller('filmCtrl', function($scope, $anchorScroll, $http, $rootScope, $location, getService, $routeParams, $window, $document, anchorSmoothScroll, $route, $templateCache, $sce){
$scope.$on("myEvent", function (event) {
$rootScope.myVideo;
$rootScope.playPause;
$rootScope.makeBig;
$rootScope.makeSmall;
$rootScope.makeNormal;
$scope.soundAction = "CLICK FOR";

//for video js
$scope.base = {};
$scope.video = {};
$scope.handle ={};
$scope.videoId = {};
$scope.video_volume = 0;

$scope.handle = $rootScope.film.videoHandle;
$scope.videoId = $rootScope.film.videoId;


$scope.base = 'https://player.vimeo.com/external/' + $scope.handle + '.hd.mp4?s=' + $scope.videoId + '&profile_id=113';
$scope.video = $sce.trustAsResourceUrl($scope.base);





  setTimeout(function(){


var player;

    $rootScope.bootVideo = function(){


               player =videojs("#film-fw15").ready(function(){
                $rootScope.myVideo = this;

                          // myPlayer.tech.removeControlsListeners();

                        // EXAMPLE: Start playing the video.
                        $rootScope.myVideo.play();

                    // $rootScope.myVideo = document.getElementById("videoIntro");
                    $rootScope.myVideo.volume(0);

              });

    }
      $rootScope.bootVideo();

      $scope.$on('$destroy', function () {
        player.dispose();
    });

    $rootScope.volume = function() {
        if ($scope.video_volume == 0){

              $rootScope.myVideo.volume(1);
              $scope.video_volume = 1;
              $scope.soundAction = "STOP";

        }else{

              $rootScope.myVideo.volume(0);

              $scope.video_volume = 0;
            // $rootScope.myVideo.pause();
            $scope.soundAction = "CLICK FOR";
        }

    }




    $rootScope.playPause = function() {
      console.log("play");
      $rootScope.myVideo.play();
    }




      $rootScope.makeBig = function() {
          $rootScope.myVideo.width = 560;
      }

      $rootScope.makeSmall = function() {
          $rootScope.myVideo.width = 320;
      }

      $rootScope.makeNormal = function() {
          $rootScope.myVideo.width = 420;
      }









    }, 1200);
  // });//viewContentLoaded
});//on data arrived event






});

Film.directive('filmDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/film.html',
    replace: true
	}
});
