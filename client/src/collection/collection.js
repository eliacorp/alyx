'use strict'

var Collection = angular.module('myApp');

Collection.controller('collectionCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', '$routeParams','$window', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams,$window){


	$rootScope.collections = [];
	$rootScope.Collection = [];
	var collectionRan = false;
	$rootScope.showLookbook=false;
	// $rootScope.getContentType('collection', 'my.collection.date desc');


	$rootScope.chooseCollection=()=>{
		for (var i in $rootScope.collections){
			if($rootScope.collections[i].slug==$routeParams.collection){
				$rootScope.Collection = $rootScope.collections[i];
				console.log($rootScope.Collection);
				$scope.mainLook = $rootScope.Collection.data['collection.look'].value[0];
			}
		}
	};




  	$rootScope.getContentType('collection', 'my.collection.date desc');


		$scope.collectionScroll = ()=>{

			console.log('collection scroll');

			setTimeout(function(){
				$scope.lookbookLength = document.getElementById("lookbook").scrollHeight;
				$scope.windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				$scope.docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				$scope.scroll = window.pageYOffset;
				$scope.windowBottom = $scope.windowHeight + window.pageYOffset;
				$scope.lookbookPosition=$scope.docHeight-$scope.lookbookLength;
				if($scope.scroll>=$scope.lookbookPosition){
					$rootScope.showLookbook=true;
				}

				console.log($scope.scroll, $scope.lookbookPosition);


				angular.element($window).bind("scroll.collection", function() {
					$scope.scroll = window.pageYOffset;

					if($scope.scroll>=$scope.lookbookPosition){
						$rootScope.showLookbook=true;
					}else{
						$rootScope.showLookbook=false;
					}
					$rootScope.$apply();
				});



				jQuery($window).resize(function(){

					$scope.lookbookLength = document.getElementById("lookbook").scrollHeight;
					$scope.windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
					$scope.docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight);
					$scope.scroll = window.pageYOffset;
					$scope.windowBottom = $scope.windowHeight + window.pageYOffset;
					$scope.lookbookPosition=$scope.docHeight-$scope.lookbookLength;

						$rootScope.$apply();
				});


			}, 600);

		}



		$scope.collectionScroll();











		//video
		// $rootScope.loadVideo("catalogue-video");


}])

.directive('videoDirective', function(){
	return{
		restrict:'E',
		templateUrl: 'views/collection/video.html',
    replace: true
	}
})


.directive('catalogueDirective', function(){
	return{
		restrict:'E',
		templateUrl: 'views/collection/catalogue.html',
    replace: true
	}
})


.directive('lookbookDirective', function(){
	return{
		restrict:'E',
		templateUrl: 'views/collection/lookbook.html',
    replace: true
	}
});
