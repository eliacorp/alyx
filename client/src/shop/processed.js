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
      $rootScope.changeOrderStatus('paid', response.data);
    }, function(error){
      console.log(error);
      $rootScope.Processed = {value: false, error:true, data:error.data};
      // $rootScope.changeOrderStatus('Unpaid');
    })
  }


setTimeout(function(){
  if($routeParams.method == 'paypal-express'){
    $rootScope.retrieveOrder();
  }else if($routeParams.method == 'stripe'){
    console.log('stripe stripe stripe stripe');
    console.log($rootScope.Transaction);
    $rootScope.changeOrderStatus('paid', $rootScope.Transaction);
  }
},600);





$rootScope.changeOrderStatus =(status, data)=>{
  var orderID = $routeParams.order;
  var obj = {};

  if($routeParams.method == 'paypal-express'){
    // data.status.value = status;
    obj = {status: status, payment_number: $routeParams.token};
  }else if($routeParams.method == 'stripe'){
    obj = {status: status, payment_number:data.id};
  }


  $http.post('/order/'+orderID+'/put', obj)
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
  }, 2500);
}




  $rootScope.loadVideo();



});
