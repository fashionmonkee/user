'use strict';


angular.module('routerApp')
  .controller('signupCtrl', function($scope,$state,$api,$auth,commonData,$rootScope,localStorageService) {
  	$scope.moveState=function(state){
  		$state.go(state);
  	};
  	$scope.signup = function(form) {
      $scope.submitted=true;
      if(!form.$valid){
        return;
      }
      $auth.signup($scope.user,{url:'http://localhost/register'}).then(function(response) {
          localStorageService.set('loginData', response.data);
          $auth.setToken(response);
          $state.go('home');
          console.log('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
          console.log(response.data.message);
        });
    };
});