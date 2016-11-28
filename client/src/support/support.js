'use strict';

var Support = angular.module('myApp');
Support.controller('supportCtrl', function($scope, $anchorScroll, $http, $rootScope, $location, $routeParams, $window, $document, anchorSmoothScroll, $route, $templateCache){


  $scope.contact = [];
  $scope.about;
	$rootScope.support = [];
	$rootScope.aboutData ={};
	$rootScope.contactData ={};
	$rootScope.stockistData ={};
	$rootScope.stockistFilterShow = false;
	// This service's function returns a promise, but we'll deal with that shortly

	$http.get('/data/support')
	// then() called when son gets back
	.then(function(response) {
		var data = response.data;
		$rootScope.support = data;
		$rootScope.aboutData = data[0];
		$rootScope.contactData = data[1];
		$scope.$broadcast("supportDataArrived");
	}, function(error) {
			// promise rejected, could log the error with: console.log('error', error);
			console.log('error', error);
	});



  $rootScope.supportScrollTo = ()=>{
  	if($location.path()=='/about'||$location.path()=='/contact'||$location.path()=='/stockists'){
  		var path = $location.path();
  		path = path.replace(/\//g, '');
  		var anchor = path+"Hash";
  		anchorSmoothScroll.scrollTo(anchor);
  	}
  }





		$scope.$on("supportDataArrived", function (event) {
      $scope.contact = $rootScope.contactData.contact;
    	$scope.about = $rootScope.aboutData;

      $rootScope.supportScrollTo();

		});








		$scope.supportHashFn = function(x){
				var newHash = x;

						if ($location.path() !== x) {
							if (x === "intro"){
								$location.path("/", false);
							}else {
							// set the $location.hash to `newHash` and
							// $anchorScroll will automatically scroll to it
								$location.path(x, false);
								// anchorSmoothScroll.scrollTo(newHash);
							}
						}else {
							$anchorScroll();
						}
		};



setTimeout(function(){
	var stockistsOffset = jQuery('#stockistsHash').offset().top;
	var aboutOffset = jQuery('#aboutHash').offset().top;
	var contactOffset = jQuery('#contactHash').offset().top;

	jQuery($window).bind("scroll.support", function(event) {
					scroll =  jQuery($window).scrollTop();
					if((scroll>=aboutOffset)&&(scroll<contactOffset)){
						$rootScope.stockistFilterShow = false;
					}else if((scroll>=contactOffset)&&(scroll<stockistsOffset)){
						$rootScope.stockistFilterShow = false;
					}else if(scroll>=stockistsOffset){
						$rootScope.stockistFilterShow = true;
					}
					$rootScope.$apply();
		});

}, 600);





});




Support.directive('aboutDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/support/about.html',
    replace: true
	}
});

Support.directive('contactDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/support/contact.html',
    replace: true
	}
});

Support.directive('stockistDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/support/stockist.html',
    replace: true
	}
});
