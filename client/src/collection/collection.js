'use strict'

var Collection = angular.module('myApp');

Collection.controller('collectionCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', '$routeParams','$window', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams,$window){


	$rootScope.Collection = [];
	var collectionRan = false;
	$rootScope.showLookbook=false;
	// $rootScope.getContentType('collection', 'my.collection.date desc');


	$rootScope.chooseCollection=(type, uid)=>{
		console.log(type, uid);
		$http({
	    method: 'GET',
	    url: 'api/prismic/get/single?type='+type+'&uid='+uid
	  }).then(function(response) {
			console.log("single");
			console.log(response);
				$rootScope.Collection = response.data;
				$scope.mainLook = $rootScope.Collection.data['collection.look'].value[0];
	    }, function(err) {
	      console.log(err);
	    });

	};

	$rootScope.chooseCollection('collection', $routeParams.collection);




  	// $rootScope.getContentType('collection', 'my.collection.date desc');


		$scope.collectionScroll = ()=>{

			console.log('collection scroll');
			$rootScope.$on('$viewContentLoaded', function(){

				$scope.lookbookLength = document.getElementById("lookbook").scrollHeight;
				$scope.windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				$scope.docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				$scope.scroll = window.pageYOffset;
				$scope.windowBottom = $scope.windowHeight + window.pageYOffset;
				$scope.lookbookPosition=$scope.docHeight-$scope.lookbookLength;
				console.log("$scope.docHeight", $scope.docHeight);
				console.log("$scope.lookbookLength", $scope.lookbookLength);
				if($scope.scroll>=$scope.lookbookPosition){
					$rootScope.showLookbook=true;
				}

				console.log($scope.scroll, $scope.lookbookPosition);


				angular.element($window).bind("scroll.collection", function() {
					$scope.scroll = window.pageYOffset;
					console.log($scope.scroll, $scope.lookbookPosition);

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


			});

		}



		$scope.collectionScroll();





$scope.$on('$destroy', function(){
	angular.element($window).unbind("scroll.collection");
})





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
