'use strict';
var Catalogue = angular.module('myApp');
Catalogue.controller('catalogueCtrl', function($scope, $http, $rootScope, $location, getService, $routeParams, $window, $document, $route, $templateCache, preload){


	$scope.units =[];
	$scope.$on("myEvent", function (event) {
		$scope.units = $rootScope.catalogue.units;
	});


	jQuery($window).bind("scroll.catalogue_scroll", function(event) {
			$scope.isScrolling = true;
	});



	  $rootScope.windowWidth =$window.innerWidth;
		$rootScope.slideLeft = function (element) {
				var thisElement = jQuery("#catalogue-unit-"+element);
				var childElement = jQuery("#catalogue-ul-"+element);
				var scrollBy;
				var horizontalOffset = childElement.offset().left;
				var moduleDifference = (((-1)*horizontalOffset) / $rootScope.windowWidth);
					if ((moduleDifference>=0)&&(moduleDifference<1)){
						scrollBy = $rootScope.windowWidth + horizontalOffset;
					}
					else if ((moduleDifference>=1)&&(moduleDifference<2)){
						scrollBy = $rootScope.windowWidth + (horizontalOffset+$rootScope.windowWidth);
					}
					else if ((moduleDifference>=2)&&(moduleDifference<3)){
						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(2)));
					}

			    jQuery("#catalogue-unit-"+element).animate({
			        scrollLeft: '-='+scrollBy
			    }, 1000, 'easeOutQuad');


					if($scope.isScrolling==false){
						var distance = jQuery("#catalogue-unit-"+element).offset().top
						$rootScope.adjustToSection(distance, element);
					}
		};





		$rootScope.slideRight = function (element) {
			var thisElement = jQuery("#catalogue-unit-"+element);
			var childElement = jQuery("#catalogue-ul-"+element);
			var scrollBy;
			var horizontalOffset = childElement.offset().left;
				var moduleDifference = (((-1)*horizontalOffset) / $rootScope.windowWidth);
				if ((moduleDifference>=0)&&(moduleDifference<1)){
					scrollBy = $rootScope.windowWidth + horizontalOffset;
				}
				else if ((moduleDifference>=1)&&(moduleDifference<2)){
					scrollBy = $rootScope.windowWidth + (horizontalOffset+$rootScope.windowWidth);
				}
				else if ((moduleDifference>=2)&&(moduleDifference<3)){
					scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(2)));
				}

		    jQuery("#catalogue-unit-"+element).animate({
		        scrollLeft: '+='+scrollBy
		    }, 1000, 'easeOutQuad');

				var distance = jQuery("#catalogue-unit-"+element).offset().top
				$rootScope.adjustToSection(distance);
		};





//scroll back
setTimeout(function(){

	jQuery("#catalogue-unit-1").animate({
			scrollLeft: '+='+$rootScope.windowWidth
	}, 10, 'easeOutQuad');

	jQuery("#catalogue-unit-6").animate({
			scrollLeft: '+='+$rootScope.windowWidth
	}, 10, 'easeOutQuad');

}, 600);






$rootScope.scrollBack = function(i){

	jQuery("#catalogue-unit-"+i).animate({
			scrollLeft: '-='+$rootScope.windowWidth
	}, 1000, 'easeOutQuad');

}


$rootScope.adjustToSection = function(y){
	jQuery("html body").animate({
			scrollTop: y
	}, 1000, 'easeOutQuad');
}






$scope.left_arrow_present=[];
$scope.right_arrow_present=[];
$scope.horizontalOffset;

setTimeout(function() {
	for(var i in $rootScope.catalogue.units){
		$scope.left_arrow_present.push(false);
		$scope.right_arrow_present.push(true);

	}//for loop




$scope.containerWidth_1 = (jQuery("#catalogue-ul-1").width() - $rootScope.windowWidth);


//................................................................. CATALOGUE 1

	jQuery("#catalogue-unit-1").bind('scroll.catalogue_1', function(){

		 var pixelScroll= jQuery(this).scrollLeft();

		 if (pixelScroll < $rootScope.windowWidth){

			 $scope.left_arrow_present[1]=false;
			 $scope.right_arrow_present[1]=true;

		}else if((pixelScroll >= $rootScope.windowWidth)&&(pixelScroll < $scope.containerWidth_1)){
			 $scope.left_arrow_present[1]=true;
			 $scope.right_arrow_present[1]=true;

		}else if((pixelScroll >= $rootScope.windowWidth)&&(pixelScroll >= $scope.containerWidth_1)){
			$scope.left_arrow_present[1]=true;
			$scope.right_arrow_present[1]=false;
		}

		$scope.$apply();

	}); //catalogue 1





	$scope.containerWidth_6 = (jQuery("#catalogue-ul-6").width() - $rootScope.windowWidth);

//................................................................. CATALOGUE 6
		jQuery("#catalogue-unit-6").bind('scroll.catalogue_6', function(){
			 var pixelScroll= jQuery(this).scrollLeft();
			 if (pixelScroll < $rootScope.windowWidth){

				 $scope.left_arrow_present[6]=false;
				 $scope.right_arrow_present[6]=true;

			}else if((pixelScroll >= $rootScope.windowWidth)&&(pixelScroll < $scope.containerWidth_6)){
				 $scope.left_arrow_present[6]=true;
				 $scope.right_arrow_present[6]=true;

			}else if((pixelScroll >= $rootScope.windowWidth)&&(pixelScroll >= $scope.containerWidth_6)){
				$scope.left_arrow_present[6]=true;
				$scope.right_arrow_present[6]=false;
			}

			$scope.$apply();

		}); //catalogue 1


	}, 600);




	//navigating with keys
	 jQuery(document.documentElement).keyup(function (event) {
	       // handle cursor keys
	       if ((event.keyCode == 37)&&($rootScope.isCatalogue)) {

					 $rootScope.slideLeft($rootScope.catalogueSection);

			   } else if ((event.keyCode == 39)&&($rootScope.isCatalogue)) {

						$rootScope.slideRight($rootScope.catalogueSection);

	       }

	   });








//.....MOBILE



if($rootScope.isMobile){
	$scope.swipeHide = false;
	$scope.units =[];
	setTimeout(function(){
		$scope.units = $rootScope.catalogue.units;
	}, 600);

  var windowWidth =$window.innerWidth;
	$scope.horizontalOffset
	var childElement = jQuery(".catalogue-container");
		setTimeout(function() {
			var containerWidth = (jQuery(".catalogue-ul").width() -windowWidth);
			childElement.scroll(function(){
				 var pixelScroll= $(this).scrollLeft();
				 $scope.horizontalOffset = (pixelScroll/containerWidth)*100;
				 if(pixelScroll>=0){
					 $scope.removeSwipe();
				 }
				$scope.$apply();
			});
		}, 600);
	$scope.removeSwipe = function(){
		$scope.swipeHide = true;
	}

}




});
Catalogue.directive('catalogueDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/catalogue.html',
    replace: true
	}
});
