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





		setTimeout(function(){
			angular.element($window).bind("scroll.collection", function() {
				var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				var body = document.body, html = document.documentElement;
				var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
				var scroll = window.pageYOffset;
				var windowBottom = windowHeight + window.pageYOffset;
				var lookbookHeight = windowHeight*2;
				if(scroll>=lookbookHeight){
					$rootScope.showLookbook=true;
				}else{
					$rootScope.showLookbook=false;
				}
				$rootScope.$apply();

				// if (windowBottom >= docHeight) {
				//
				// }
			});
		}, 600);









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
