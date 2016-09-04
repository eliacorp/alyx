angular.module('myApp')

.controller('logoCtrl', function($scope, $rootScope){


})

.directive('logoDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/logo/logo.html',
    replace: true
  }
})


.directive('logoPopDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/components/logo/logo-pop.html',
    replace: true
  }
});
