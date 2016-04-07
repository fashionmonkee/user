'use strict';


angular.module('routerApp')
  .controller('forgotPasswordCtrl', function($scope,$state,$auth,commonData,$rootScope,localStorageService,$api) {
  	$scope.moveState=function(state,id){
  		$state.go(state,{data:id});
  	};
    $scope.user='';

  	$scope.reset = function(form) {
      $scope.submitted=true;
      if(!form.$valid){
        return;
      }
      var Api=new $api('password/email');
      Api.save($scope.user).then(function(response) {
        console.log(response);
        $state.go('home');
      }); 
    };
});