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
      $auth.login($scope.user,{url:'http://localhost/login'})
        .then(function(response) {
          localStorageService.set('loginData', response.data);
          $state.go('home');
          console.log('You have successfully signed in!');
        })
        .catch(function(error) {
          console.log(error.data.message, error.status);
        });
    };
});