'use strict';


angular.module('routerApp')
  .controller('loginCtrl', function($scope,$state,$auth,commonData,$rootScope,localStorageService) {
  	$scope.moveState=function(state,id){
  		$state.go(state,{data:id});
  	};

  	$scope.login = function(form) {
      $scope.submitted=true;
      if(!form.$valid){
        return;
      }
      $auth.login($scope.user,{url:'http://192.168.1.4/login'})
        .then(function(response) {
          localStorageService.set('loginData', response.data);
           localStorageService.set('city', response.data.city);
          $state.go('home');
          console.log('You have successfully signed in!');
        })
        .catch(function(error) {
          $scope.errorMsg=error.data;
          var $toastContent = $('<div class="col s12" style="margin-left:17%">'+$scope.errorMsg+'</div>');
          Materialize.toast($toastContent, 5000);
        });
    };
});