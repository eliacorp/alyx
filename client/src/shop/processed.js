'use strict'

var Processed = angular.module('myApp');

Processed.controller('processedCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll, $routeParams){



  $rootScope.retrieveOrder = ()=>{
    var orderID = $routeParams.order;
    $http({
      url: '/order/'+orderID+'/get',
      method: 'GET'
    }).then( function(response){

      console.log(response);
      $rootScope.Processed = {value: false, error:false, data:response.data};
      $rootScope.changeOrderStatus('paid');
    }, function(error){
      console.log(error);
      $rootScope.Processed = {value: false, error:true, data:error.data};
      // $rootScope.changeOrderStatus('Unpaid');
    })
  }


setTimeout(function(){
  if($routeParams.method == 'paypal'){
    $rootScope.retrieveOrder();
  }
},1000);

$rootScope.changeOrderStatus =(status)=>{
  var orderID = $routeParams.order;
  $rootScope.Processed.data.status.value = status;

  $http.post('/order/'+orderID+'/put', $rootScope.Processed.data)
  .then( function(response){
    console.log(response);
    $rootScope.Processed = {value: true, error:false, data:response.data};
    $rootScope.pageLoading = false;
    $rootScope.loadVideo();
  }, function(error){
    console.log(error);
    $rootScope.pageLoading = false;
    $rootScope.Processed = {value: true, error:true, data:error.data};
  })

}



$rootScope.loadVideo = ()=>{

  setTimeout(function(){
    var vid = document.getElementById("processed-video");
    vid.volume = 0.2;

    $rootScope.playPause =()=> {
      if(vid.paused){
        vid.play();
      }else{
        vid.pause();
      }
    }
    $rootScope.$apply();
  },900);


}






});
