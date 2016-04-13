'use strict';


angular.module('routerApp')
  .controller('signupCtrl', function($scope,$state,$api,$auth,commonData,$rootScope,localStorageService) {
  	$scope.user={};
    $scope.moveState=function(state){
  		$state.go(state);
  	};

    $scope.getCities=function(){
      var Api=new $api('cities');
      Api.list().then(function(response) {
        $scope.cities=response.data;    
      });
    };

    $scope.getCities();
  	$scope.signup = function(form) {
      $scope.submitted=true;
      if(!form.$valid){
        return;
      }
      $scope.user.role_id=2;
      $auth.signup($scope.user,{url:'http://fashionmonkee.com/register'}).then(function(response) {
          localStorageService.set('loginData', response.data);
          localStorageService.set('city', response.data.city);
          $auth.setToken(response);
          $state.go('home');
          console.log('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
          $scope.errorMsg=response.data;
          var $toastContent = $('<div class="col s12" style="margin-left:17%">'+$scope.errorMsg+'</div>');
          Materialize.toast($toastContent, 5000);
        });
    };
});