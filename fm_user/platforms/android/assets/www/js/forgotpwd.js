'use strict';


angular.module('routerApp')
  .controller('forgotPasswordCtrl', function($scope,$state,$auth,commonData,$rootScope,localStorageService) {
  	$scope.moveState=function(state,id){
  		$state.go(state,{data:id});
  	};

  	$scope.reset = function(form) {
      $scope.submitted=true;
      if(!form.$valid){
        return;
      }
    };
});