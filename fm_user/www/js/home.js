'use strict';


angular.module('routerApp')
  .controller('homeCtrl', function($scope,$state,$api) {
  	$scope.moveState=function(state){
  		$('.button-collapse').sideNav('hide');
  		$state.go(state);
  	};

  	$scope.getAreas=function(){
      var Api=new $api('areas');
      Api.list().then(function(response) {
        $scope.areas=response.data;
    });
  	};
  	$scope.getCities=function(){
      var Api=new $api('cities');
      Api.list().then(function(response) {
        $scope.cities=response.data;
        $scope.currentCity=response.data[0];
    });
  };
  	$scope.changeCity=function(data){
  		$scope.currentCity=data;
  	};

     $scope.getCategory=function(){
      var Api=new $api('mainCategory');
      Api.list().then(function(response) {
        $scope.mainCategory=response.data;
      });
  	};

      $scope.getAreas();
      $scope.getCategory();
      $scope.getCities();

});