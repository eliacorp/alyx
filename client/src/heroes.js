angular.module('myApp')

.controller('heroesCtrl', ['$scope', '$anchorScroll', '$http', '$rootScope', '$location', 'getService', '$routeParams', '$window', '$document', 'anchorSmoothScroll', '$route', '$templateCache', '$sce' , function($scope, $anchorScroll, $http, $rootScope, $location, getService, $routeParams, $window, $document, anchorSmoothScroll, $route, $templateCache, $sce){
$rootScope.heroes_scrolled = false;
	$scope.heroesUnits =[];
		//only after data is pulled
$scope.$on("myEvent", function (event) {
			$scope.heroesUnits = $rootScope.heroes.units;
});


$scope.videoHeroesLoaded = function(){

	setTimeout(function(){
		$rootScope.heroesVideo = document.getElementById("heroesVideo");
		$rootScope.heroesVideo.playbackRate = 2;
	}, 600);
};



$rootScope.windowWidth =$window.innerWidth;
// jQuery('#'+$scope.navigationLinks[i]+'Hash').offset().top -1;

$rootScope.heroesSlideLeft = function (element) {
		//
	  // anchorSmoothScroll.scrollTo("heroes-unit-"+element);

			// event.preventDefault();

			var thisElement = jQuery("#heroes-unit-"+element);

			var childElement = jQuery("#heroes-ul-"+element);

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

					else if ((moduleDifference>=3)&&(moduleDifference<4)){

						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(3)));
					}

					else if ((moduleDifference>=4)&&(moduleDifference<5)){

						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(4)));
					}

					else if ((moduleDifference>=5)&&(moduleDifference<6)){

						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(5)));
					}
					else if ((moduleDifference>=6)&&(moduleDifference<7)){

						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(6)));
					}
					else if ((moduleDifference>=7)&&(moduleDifference<8)){

						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(7)));
					}
					else if ((moduleDifference>=8)&&(moduleDifference<9)){

						scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(8)));

					}


					jQuery("#heroes-unit-"+element).animate({
							scrollLeft: '-='+scrollBy
					}, 1000, 'easeOutQuad');

					var distance = jQuery("#heroes-unit-"+element).offset().top
					$rootScope.adjustToSection(distance, element);


};




	$rootScope.heroesSlideRight = function (element) {

	  // anchorSmoothScroll.scrollTo("heroes-unit-"+element);

		// event.preventDefault();

		var thisElement = jQuery("#heroes-unit-"+element);

		var childElement = jQuery("#heroes-ul-"+element);

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
			else if ((moduleDifference>=3)&&(moduleDifference<4)){

				scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(3)));
			}
			else if ((moduleDifference>=4)&&(moduleDifference<5)){

				scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(4)));
			}
			else if ((moduleDifference>=5)&&(moduleDifference<6)){

				scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(5)));
			}
			else if ((moduleDifference>=6)&&(moduleDifference<7)){

				scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(6)));
			}
			else if ((moduleDifference>=7)&&(moduleDifference<8)){

				scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(8)));
			}
			else if ((moduleDifference>=8)&&(moduleDifference<9)){

				scrollBy = $rootScope.windowWidth + (horizontalOffset+($rootScope.windowWidth*(9)));
			}



			jQuery("#heroes-unit-"+element).animate({
					scrollLeft: '+='+scrollBy
			}, 1000, 'easeOutQuad');

			var distance = jQuery("#heroes-unit-"+element).offset().top
			$rootScope.adjustToSection(distance, element);


	};





	//scroll back
	setTimeout(function(){
		jQuery("#heroes-unit-0").animate({
				scrollLeft: '+='+$rootScope.windowWidth
		}, 10, 'easeOutQuad');
	}, 600);






	$rootScope.heroes_scrollBack = function(i){
		if ($rootScope.heroes_scrolled == false){
			jQuery("#heroes-unit-"+i).animate({
					scrollLeft: '-='+$rootScope.windowWidth
			}, 1000, 'easeOutQuad');
			$rootScope.heroes_scrolled = true;
		}else{
			return false
		}
	}










	$scope.heroes_left_arrow_present=[];
	$scope.heroes_right_arrow_present=[];

		$scope.heroes_horizontalOffset;

	setTimeout(function() {
			for(var i in $rootScope.catalogue.units){
				$scope.heroes_left_arrow_present.push(false);
				$scope.heroes_right_arrow_present.push(true);
			}//for loop

			$scope.heroes_containerWidth_1 = (jQuery("#heroes-ul-0").width() - $rootScope.windowWidth);
//................................................................. heroes 1
		jQuery("#heroes-unit-0").bind('scroll.heroes_0', function(){

			 var pixelScroll= jQuery(this).scrollLeft();
			 if (pixelScroll < $rootScope.windowWidth){
				 $scope.heroes_left_arrow_present[0]=false;
				 $scope.heroes_right_arrow_present[0]=true;
			}else if((pixelScroll >= $rootScope.windowWidth)&&(pixelScroll < $scope.heroes_containerWidth_1)){
				 $scope.heroes_left_arrow_present[0]=true;
				 $scope.heroes_right_arrow_present[0]=true;
			}else if((pixelScroll >= $rootScope.windowWidth)&&(pixelScroll >= $scope.heroes_containerWidth_1)){
				$scope.heroes_left_arrow_present[0]=true;
				$scope.heroes_right_arrow_present[0]=false;
			}
			$scope.$apply();
		}); //heroes 1
	}, 600);




	//navigating with keys
	 jQuery(document.documentElement).keyup(function (event) {
	       // handle cursor keys
	       if ((event.keyCode == 37)&&($rootScope.isHeroes)) {
					 $rootScope.heroesSlideLeft($rootScope.heroesSection);
			   } else if ((event.keyCode == 39)&&($rootScope.isHeroes)) {
						$rootScope.heroesSlideRight($rootScope.heroesSection);
	       }
	   });




		 $rootScope.heroesReadInterview= function(boolean){
		 	if (boolean==false){
				$rootScope.shiftImage_heroes=false;
		 		$scope.interviewStatus="read";
		 	}else if(boolean==true){
		 		$scope.interviewStatus="close";
				$rootScope.shiftImage_heroes=true;
		 	}
		 }





$rootScope.shiftImage_heroes = false;
$scope.animating_heroes = false;
$scope.interviewStatus="read";
$scope.interviewActive=false;

$scope.readInterview = function(){
	if ($scope.interviewActive==true){
		$scope.interviewActive=false;
		$scope.interviewStatus="read";
	}else if($scope.interviewActive==false){
		$scope.interviewActive=true;
		$scope.interviewStatus="close";
	}

	if($scope.animating_heroes == true){
		return false
	}else if($scope.animating_heroes == false){
		$rootScope.shiftImage_heroes = !$rootScope.shiftImage_heroes;
		$scope.animating_heroes = true;
		setTimeout(function(){
			$scope.animating_heroes = false;
		}, 1000);
	}
}

$scope.closeDescription_heroes = function(){
		$scope.interviewActive=false;
		$scope.interviewStatus="read";

		if($scope.animating_heroes == true){
			return false;
		}else if($scope.animating_heroes == false){
			$rootScope.shiftImage_heroes = !$rootScope.shiftImage_heroes;
			$scope.animating_heroes = true;
			setTimeout(function(){
				$scope.animating_heroes = false;
			}, 1000);
		}
}



//disable scroll when the read more is active
$rootScope.readScrollDisable_heroes=function(){
	if($scope.interviewActive==true){
		$rootScope.disableScroll();
	}else if($scope.interviewActive==false){
				$rootScope.enableScroll();
	}
}





//for video js
$scope.base_heroes = {};
$scope.video_heroes = {};
$scope.handle_heroes ={};
$scope.videoId_heroes = {};
$scope.video_volume = 0;

$scope.$on("myEvent", function (event) {
	setTimeout(function(){
		$scope.handle_heroes = $scope.heroesUnits[1].videoHandle;
		$scope.videoId_heroes = $scope.heroesUnits[1].videoId;
		$scope.base_heroes = 'https://player.vimeo.com/external/' + $scope.handle_heroes + '.hd.mp4?s=' + $scope.videoId_heroes + '&profile_id=113';
		$scope.video_heroes = $sce.trustAsResourceUrl($scope.base_heroes);
	}, 600);
});






var windowWidth =$window.innerWidth;
$scope.horizontalOffset;
var childElement = jQuery(".heroes-container");

setTimeout(function() {
	var containerWidth = (jQuery(".heroes-ul").width() -windowWidth);
	childElement.scroll(function(){
		 var pixelScroll= $(this).scrollLeft();
		 $scope.horizontalOffset = (pixelScroll/containerWidth)*100;
		 if(pixelScroll>=0){
			 $scope.removeSwipe_h();
		 }
		$scope.$apply();
	});
}, 600);






$scope.removeSwipe_h=function(){
	$scope.swipeHide_h = true;
}












}])

.directive('heroesDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/heroes.html',
    replace: true
	}
});
