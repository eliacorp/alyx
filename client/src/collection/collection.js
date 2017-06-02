'use strict'

var Collection = angular.module('myApp');

Collection.controller('collectionCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', '$routeParams','$window', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams,$window){


	$rootScope.Collection = [];
	var collectionRan = false;
	$rootScope.showLookbook=false;
	// $rootScope.getContentType('collection', 'my.collection.date desc');


	$rootScope.chooseCollection=(type, uid)=>{
		$http({
	    method: 'GET',
	    url: 'api/prismic/get/single?type='+type+'&uid='+uid
	  }).then(function(response) {
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
			$rootScope.collectionCtrlLoaded=true;

				var lookbookElement = angular.element('#lookbook')[0];
				$scope.lookbookLength = lookbookElement.scrollHeight;
				$scope.windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				$scope.docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				$scope.scroll = window.pageYOffset;
				$scope.windowBottom = $scope.windowHeight + window.pageYOffset;
				$scope.lookbookPosition=$scope.docHeight-$scope.lookbookLength;

				console.log($scope.scroll, $scope.lookbookPosition);

				if(!$rootScope.Collection.data['collection.video_url']){
					// $scope.scroll>=$scope.lookbookPosition
					$rootScope.showLookbook=true;
					console.log("showLookbook", $rootScope.showLookbook);
				}

				angular.element($window).bind("scroll.collection", function() {
					$scope.scroll = window.pageYOffset;
					if($scope.scroll>=$scope.lookbookPosition){
						$rootScope.showLookbook=true;
					}else{
						$rootScope.showLookbook=false;
					}
					$rootScope.$apply();
				});





				jQuery('.lookbook').resize(function(){

					$scope.lookbookLength = document.getElementById("lookbook").scrollHeight;
					$scope.windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
					$scope.docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight);
					$scope.scroll = window.pageYOffset;
					$scope.windowBottom = $scope.windowHeight + window.pageYOffset;
					$scope.lookbookPosition=$scope.docHeight-$scope.lookbookLength;

						$rootScope.$apply();
				});
				$rootScope.$apply();
		}


$rootScope.collectionCtrlLoaded=false;
setTimeout(function(){
		if(!$rootScope.collectionCtrlLoaded){
			$scope.collectionScroll();
		}
}, 800)


$rootScope.$on('$viewContentLoaded', function(){
	if($rootScope.collectionCtrlLoaded){
		$scope.collectionScroll();
	}
})







$scope.$on('$destroy', function(){
	angular.element($window).unbind("scroll.collection");
	jQuery('.lookbook').off("resize");
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
